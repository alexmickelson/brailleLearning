from datetime import datetime
from typing import List, Optional, Type
from uuid import UUID
from fastapi import Depends
from pydantic import BaseModel
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.services.db_service import RunSql


class AssignmentService:
    def __init__(self, local: RunSql = Depends()) -> None:
        self.run_sql = local

    async def create_assignment(
        self,
        name: str,
        text: str,
        points: int,
        show_reference_braille: Optional[bool],
        show_live_preview: Optional[bool],
        available_date: Optional[datetime],
        closed_date: Optional[datetime],
        type: Optional[AssignmentType],
    ):
        sql = """
            INSERT INTO Assignment
                (
                    name, 
                    text, 
                    points,
                    show_reference_braille, 
                    show_live_preview,
                    available_date,
                    closed_date,
                    type
                )
            values
                (
                    %(name)s, 
                    %(text)s, 
                    %(points)s,
                    %(show_reference_braille)s, 
                    %(show_live_preview)s, 
                    %(available_date)s,
                    %(closed_date)s,
                    %(type)s
                )
            returning
                id,
                name,
                text,
                points,
                show_reference_braille,
                show_live_preview,
                reference_braille,
                available_date,
                closed_date,
                type
        """
        params = {
            "name": name,
            "text": text,
            "points": points,
            "show_reference_braille": show_reference_braille,
            "show_live_preview": show_live_preview,
            "available_date": available_date,
            "closed_date": closed_date,
            "type": type,
        }

        result = await self.run_sql(sql, params, output_class=Assignment)
        return result[0]

    async def update(
        self,
        assignment_id: UUID,
        name: str,
        text: str,
        points: int,
        show_reference_braille: bool,
        show_live_preview: bool,
        type: AssignmentType,
        reference_braille: Optional[str],
        available_date: Optional[datetime],
        closed_date: Optional[datetime],
    ):
        sql = """
            update Assignment
            set name = %(name)s,
                text = %(text)s,
                show_reference_braille = %(show_reference_braille)s,
                show_live_preview = %(show_live_preview)s,
                reference_braille = %(reference_braille)s,
                available_date = %(available_date)s,
                closed_date = %(closed_date)s,
                points = %(points)s,
                type = %(type)s
            where id = %(assignment_id)s
        """
        params = {
            "name": name,
            "text": text,
            "assignment_id": assignment_id,
            "show_reference_braille": show_reference_braille,
            "show_live_preview": show_live_preview,
            "reference_braille": reference_braille,
            "available_date": available_date,
            "closed_date": closed_date,
            "points": points,
            "type": type,
        }
        await self.run_sql(sql, params)

    async def delete_all_assignments(self):
        sql = "TRUNCATE Assignment"
        await self.run_sql(sql, {})

    async def delete(self, assignment_id: UUID):
        sql = "delete from assignment where id = %(assignment_id)s"
        params = {"assignment_id": assignment_id}
        await self.run_sql(sql, params)

    async def get_assignment(self, id: UUID):
        sql = """
            select 
                a.*, prereq_assignment_id
            from Assignment a
                inner join AssignmentPrerequisite as on a.id = as.assignment_id
            where id = %(id)s
        """
        params = {"id": id}
        assignments = await self.run_sql(sql, params, output_class=AssignmentDBO)
        # print("assignments", assignments)
        return assignments[0]

    async def get_all_assignments(self):
        sql = """
            select
                a.*, prereq_assignment_id
            from Assignment a
                inner join AssignmentPrerequisite as on a.id = as.assignment_id
            order by closed_date asc
        """
        return await self.run_sql(sql, {}, output_class=AssignmentDBO)

    async def get_uncompleted_assignments(self, username: str):
        sql = """
            select
                a.*, prereq_assignment_id
            from Assignment a
                inner join AssignmentPrerequisite as on a.id = as.assignment_id
                left outer join submission s on s.assignment_id = a.id and s.user_sub = %(username)s
            where now() < a.closed_date
                and now() > a.available_date
                and s.id is null
            order by a.closed_date asc
        """
        params = {'username': username}
        return await self.run_sql(sql, params, output_class=AssignmentDBO)

    async def get_completed_assignments(self, username: str):
        sql = """
            select distinct
                a.*, prereq_assignment_id
            from Assignment a
                inner join AssignmentPrerequisite as on a.id = as.assignment_id
                left outer join submission s on s.assignment_id = a.id
            where now() < a.closed_date
                and now() > a.available_date
                and s.user_sub = %(username)s
                and s.id is not null
            order by a.closed_date asc
        """
        params = {'username': username}
        return await self.run_sql(sql, params, output_class=AssignmentDBO)

    async def get_past_assignments(self):
        sql = """
            select distinct
                a.*, prereq_assignment_id
            from Assignment a
                inner join AssignmentPrerequisite as on a.id = as.assignment_id
            where now() > a.closed_date
            order by a.closed_date asc
        """
        return await self.run_sql(sql, {}, output_class=AssignmentDBO)
    
    def parse_assignments_from_dbo(self, assignment_dbos: List[AssignmentDBO]):
        assignment_list = []
        for dbo in assignment_dbos:
            assignment = Assignment(
                id=dbo.id,
                name=dbo.name,
                text=dbo.text,
                points=dbo.points,
                show_reference_braille=dbo.show_reference_braille,
                reference_braille=dbo.reference_braille,
                show_live_preview=dbo.show_live_preview,
                available_date=dbo.available_date,
                closed_date=dbo.closed_date,
                type=dbo.type,
                prereq_assignment_ids=[dbo.prereq_assignment_id] if dbo.prereq_assignment_id else []
            )
            assignment_list.append(assignment)
        return assignment_list


class AssignmentDBO(BaseModel):
    id: UUID
    name: str
    text: str
    points: int
    show_reference_braille: bool
    reference_braille: Optional[str]
    show_live_preview: bool
    available_date: Optional[datetime]
    closed_date: Optional[datetime]
    type: AssignmentType

    prereq_assignment_id: Optional[UUID]