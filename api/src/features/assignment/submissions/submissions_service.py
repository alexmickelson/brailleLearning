from typing import Dict
from uuid import UUID
from fastapi import Depends
from pydantic import BaseModel

from src.services.db_service import get_run_sql


class Submission(BaseModel):
    id: UUID
    name: str
    text: str
    # answers: list[str]


class SubmissionsService:
    def __init__(self, run_sql=Depends(get_run_sql)) -> None:
        self.run_sql = run_sql

    async def get_grade_for_assignment(self, assignment_id: UUID):
        sql = """
            select 
                *
            from Submissions
            where assignment_id = %(assignment_id)s
        """
        params = {"assignment_id": assignment_id}
        results = await self.run_sql(sql, params)

        if len(results) == 0:
            return None

        return [Submission.parse_obj(r) for r in results][0]

    async def assign_grade_for_assignment(self, assignment_id: UUID, grade: float):
        sql = """
            update Submissions
            set grade = %(grade)s
            where assignment_id = %(assignment_id)s
        """
        params = {"assignment_id": assignment_id, "grade": grade}
        await self.run_sql(sql, params)

    async def delete_all_grades(self):
        sql = """
            truncate Submissions
        """
        await self.run_sql(sql, {})

    async def get_submissions_for_assignment(self, assignment_id: UUID):
        sql = """
            select 
                *
            from Submissions
            where assignment_id = %(assignment_id)s
        """
        params = {"assignment_id": assignment_id}
        results = await self.run_sql(sql, params)

        return [Submission.parse_obj(r) for r in results]
