from datetime import datetime
from typing import List, Optional, Type
from uuid import UUID
from fastapi import Depends
from pydantic import BaseModel
from src.features.assignment.assignment_models import (
    Assignment,
    AssignmentStage,
    AssignmentType,
)
from src.services.db_service import RunSql


class AssignmentService:
    def __init__(self, local: RunSql = Depends()) -> None:
        self.run_sql = local

    async def create_assignment(
        self,
        name: str,
        available_date: Optional[datetime],
        closed_date: Optional[datetime],
    ):
        sql = """
            INSERT INTO Assignment
                (
                    name,
                    available_date,
                    closed_date
                )
            values
                (
                    %(name)s, 
                    %(available_date)s,
                    %(closed_date)s
                )
            returning
                id,
                name,
                available_date,
                closed_date
        """
        params = {
            "name": name,
            "available_date": available_date,
            "closed_date": closed_date,
        }

        result = await self.run_sql(sql, params, output_class=Assignment)
        return result[0]

    async def create_stage(self, assignment_id: UUID, stage_index: int):
        sql = """
            insert into AssignmentStage
                (
                    assignment_id,
                    text,
                    points,
                    type,
                    show_live_preview,
                    show_reference_braille,
                    index
                )
            values
                (
                    %(assignment_id)s,
                    %(text)s,
                    %(points)s,
                    %(type)s,
                    %(show_live_preview)s,
                    %(show_reference_braille)s,
                    %(index)s
                )
            returning 
                id,
                text,
                points,
                show_reference_braille,
                reference_braille,
                show_live_preview,
                type,
                index
        """
        params = {
            "assignment_id": assignment_id,
            "text": "",
            "points": 0,
            "type": AssignmentType.BRAILLE_TO_PRINT,
            "show_live_preview": False,
            "show_reference_braille": False,
            "index": stage_index,
        }
        result = await self.run_sql(sql, params, output_class=AssignmentStage)
        return result[0]

    async def update_assignment(
        self,
        assignment_id: UUID,
        name: str,
        available_date: Optional[datetime],
        closed_date: Optional[datetime],
    ):
        sql = """
            update Assignment
            set name = %(name)s,
                available_date = %(available_date)s,
                closed_date = %(closed_date)s
            where id = %(assignment_id)s
        """
        params = {
            "assignment_id": assignment_id,
            "name": name,
            "available_date": available_date,
            "closed_date": closed_date,
        }
        await self.run_sql(sql, params)

    async def remove_stage(self, stage_id: UUID):
        sql = """
            delete from AssignmentStage
            where id = %(id)s
        """
        params = {"id": stage_id}
        await self.run_sql(sql, params)

    async def update_stage(self, stage: AssignmentStage):
        sql = """
            update AssignmentStage
            set text = %(text)s,
                points = %(points)s,
                show_reference_braille = %(show_reference_braille)s,
                reference_braille = %(reference_braille)s,
                show_live_preview = %(show_live_preview)s,
                type = %(type)s,
                index = %(index)s
            where id = %(id)s
        """
        params = {
            "text": stage.text,
            "points": stage.points,
            "show_reference_braille": stage.show_reference_braille,
            "reference_braille": stage.reference_braille,
            "show_live_preview": stage.show_live_preview,
            "type": stage.type,
            "id": stage.id,
            "index": stage.index,
        }
        await self.run_sql(sql, params)

    async def delete_all_assignments(self):
        sql = "TRUNCATE Assignment"
        await self.run_sql(sql, {})

    async def delete(self, assignment_id: UUID):
        sql = "delete from assignment where id = %(assignment_id)s"
        params = {"assignment_id": assignment_id}
        await self.run_sql(sql, params)

    async def get_assignment(self, id: UUID) -> Assignment:
        sql = """
            select 
                a.*, 
                COALESCE(array_agg(ap.prereq_assignment_id) FILTER (WHERE ap.prereq_assignment_id IS NOT NULL), '{}') AS prereq_assignment_ids,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', astg.id,
                            'text', astg.text, 
                            'points', astg.points,
                            'show_reference_braille', astg.show_reference_braille,
                            'show_live_preview', astg.show_live_preview,
                            'reference_braille', astg.reference_braille,
                            'type', astg.type,
                            'index', astg.index
                        ) order by astg.index asc
                    )
                    FILTER (WHERE astg.assignment_id IS NOT NULL), '[]'
                ) as stages
            from Assignment a
                left join AssignmentPrerequisite ap on a.id = ap.assignment_id
                left join AssignmentStage astg on a.id = astg.assignment_id
            where a.id = %(id)s
            group by 
                a.id,
                a.name,
                a.available_date,
                a.closed_date
        """
        params = {"id": id}
        assignments = await self.run_sql(sql, params, output_class=Assignment)
        # print("assignments", assignments)
        return assignments[0]

    async def get_all_assignments(self):
        sql = """
            select 
                a.*, 
                COALESCE(array_agg(ap.prereq_assignment_id) FILTER (WHERE ap.prereq_assignment_id IS NOT NULL), '{}') AS prereq_assignment_ids,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', astg.id,
                            'text', astg.text, 
                            'points', astg.points,
                            'show_reference_braille', astg.show_reference_braille,
                            'show_live_preview', astg.show_live_preview,
                            'reference_braille', astg.reference_braille,
                            'type', astg.type,
                            'index', astg.index
                        ) order by astg.index asc
                    )
                    FILTER (WHERE astg.assignment_id IS NOT NULL), '[]'
                ) as stages
            from Assignment a
                left join AssignmentPrerequisite ap on a.id = ap.assignment_id
                left join AssignmentStage astg on a.id = astg.assignment_id
            group by 
                a.id,
                a.name,
                a.available_date,
                a.closed_date
            order by closed_date asc
        """
        return await self.run_sql(sql, {}, output_class=Assignment)

    async def get_uncompleted_assignments(self, username: str):
        sql = """
            select 
                a.*, 
                COALESCE(array_agg(ap.prereq_assignment_id) FILTER (WHERE ap.prereq_assignment_id IS NOT NULL), '{}') AS prereq_assignment_ids,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', astg.id,
                            'text', astg.text, 
                            'points', astg.points,
                            'show_reference_braille', astg.show_reference_braille,
                            'show_live_preview', astg.show_live_preview,
                            'reference_braille', astg.reference_braille,
                            'type', astg.type,
                            'index', astg.index
                        ) order by astg.index asc
                    )
                    FILTER (WHERE astg.assignment_id IS NOT NULL), '[]'
                ) as stages
            from Assignment a
                left join AssignmentPrerequisite ap on a.id = ap.assignment_id
                left join AssignmentStage astg on a.id = astg.assignment_id
                left outer join submission s on s.assignment_id = a.id and s.user_sub = %(username)s
            where now() < a.closed_date
                and now() > a.available_date
                and s.id is null
            group by 
                a.id,
                a.name,
                a.available_date,
                a.closed_date
            order by a.closed_date asc
        """
        params = {"username": username}
        return await self.run_sql(sql, params, output_class=Assignment)

    async def get_completed_assignments(self, username: str):
        sql = """
            select 
                a.*, 
                COALESCE(array_agg(ap.prereq_assignment_id) FILTER (WHERE ap.prereq_assignment_id IS NOT NULL), '{}') AS prereq_assignment_ids,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', astg.id,
                            'text', astg.text, 
                            'points', astg.points,
                            'show_reference_braille', astg.show_reference_braille,
                            'show_live_preview', astg.show_live_preview,
                            'reference_braille', astg.reference_braille,
                            'type', astg.type,
                            'index', astg.index
                        ) order by astg.index asc
                    )
                    FILTER (WHERE astg.assignment_id IS NOT NULL), '[]'
                ) as stages
            from Assignment a
                left join AssignmentPrerequisite ap on a.id = ap.assignment_id
                left join AssignmentStage astg on a.id = astg.assignment_id
                left outer join submission s on s.assignment_id = a.id
            where now() < a.closed_date
                and now() > a.available_date
                and s.user_sub = %(username)s
                and s.id is not null
            group by 
                a.id,
                a.name,
                a.available_date,
                a.closed_date
            order by a.closed_date asc
        """
        params = {"username": username}
        return await self.run_sql(sql, params, output_class=Assignment)

    async def get_past_assignments(self):
        sql = """
            select 
                a.*, 
                COALESCE(array_agg(ap.prereq_assignment_id) FILTER (WHERE ap.prereq_assignment_id IS NOT NULL), '{}') AS prereq_assignment_ids,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', astg.id,
                            'text', astg.text, 
                            'points', astg.points,
                            'show_reference_braille', astg.show_reference_braille,
                            'show_live_preview', astg.show_live_preview,
                            'reference_braille', astg.reference_braille,
                            'type', astg.type,
                            'index', astg.index
                        ) order by astg.index asc
                    )
                    FILTER (WHERE astg.assignment_id IS NOT NULL), '[]'
                ) as stages
            from Assignment a
                left join AssignmentPrerequisite ap on a.id = ap.assignment_id
                left join AssignmentStage astg on a.id = astg.assignment_id
            where now() > a.closed_date
            group by
                a.id,
                a.name,
                a.available_date,
                a.closed_date
            order by a.closed_date asc
        """
        return await self.run_sql(sql, {}, output_class=Assignment)
