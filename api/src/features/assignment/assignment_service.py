from typing import Optional, Type
from uuid import UUID
from fastapi import Depends
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.services.db_service import RunSql


class AssignmentService:
    def __init__(self, local: RunSql = Depends()) -> None:
        self.run_sql = local

    async def create_assignment(
        self,
        name: str,
        text: str,
        show_reference_braille: Optional[bool],
        show_live_preview: Optional[bool],
        type: Optional[AssignmentType],
    ):
        sql = """
            INSERT INTO Assignment
                (name, text, show_reference_braille, show_live_preview, type)
            values
                (%(name)s, %(text)s, %(show_reference_braille)s, %(show_live_preview)s, %(type)s)
            returning
                id,
                name,
                text,
                show_reference_braille,
                show_live_preview,
                type
        """
        params = {
            "name": name,
            "text": text,
            "show_reference_braille": show_reference_braille,
            "show_live_preview": show_live_preview,
            "type": type,
        }

        result = await self.run_sql(sql, params, output_class=Assignment)
        return result[0]

    async def update(
        self,
        assignment_id: UUID,
        name: str,
        text: str,
        show_reference_braille: bool,
        show_live_preview: bool,
        reference_braille: Optional[str]
    ):
        sql = """
            update Assignment
            set name = %(name)s,
                text = %(text)s,
                show_reference_braille = %(show_reference_braille)s,
                show_live_preview = %(show_live_preview)s,
                reference_braille = %(reference_braille)s
            where id = %(assignment_id)s
        """
        params = {
            "name": name,
            "text": text,
            "assignment_id": assignment_id,
            "show_reference_braille": show_reference_braille,
            "show_live_preview": show_live_preview,
            "reference_braille": reference_braille,
        }
        await self.run_sql(sql, params)

    async def delete_all_assignments(self):
        sql = "TRUNCATE Assignment"
        await self.run_sql(sql, {})

    async def get_assignment(self, id: UUID):
        sql = """
            select *
            from Assignment
            where id = %(id)s
        """
        params = {"id": id}
        assignments = await self.run_sql(sql, params, output_class=Assignment)
        # print("assignments", assignments)
        return assignments[0]

    async def get_all_assignments(self):
        sql = """
            select *
            from Assignment
        """
        return await self.run_sql(sql, {}, output_class=Assignment)
