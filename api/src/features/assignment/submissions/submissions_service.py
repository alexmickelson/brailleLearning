from pprint import pprint
from typing import Dict
from uuid import UUID
from fastapi import Depends
from pydantic import BaseModel
from src.features.assignment.submissions.submisison_model import Submission

from src.services.db_service import RunSql


class SubmissionsService:
    def __init__(self, run_sql: RunSql = Depends()) -> None:
        self.run_sql = run_sql

    async def get_grade_for_assignment(self, assignment_id: UUID, user_id: str):
        sql = """
            select 
                *
            from Submissions
            where assignment_id = %(assignment_id)s 
                and user_id = %(user_id)s
        """
        params = {"assignment_id": assignment_id, "user_id": user_id}
        results = await self.run_sql(sql, params, output_class=Submission)

        if len(results) == 0:
            return None

        pprint(results)
        return results[0].grade

    async def assign_grade_for_assignment(
        self, user_id: str, assignment_id: UUID, grade: float
    ):
        sql = """
            INSERT INTO Submissions
                (user_id, assignment_id, grade)
            values
                (%(user_id)s, %(assignment_id)s, %(grade)s)
        """
        params = {"assignment_id": assignment_id, "grade": grade, "user_id": user_id}
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
        results = await self.run_sql(sql, params, output_class=Submission)

        return results
