from pprint import pprint
from typing import Dict, Optional
from uuid import UUID
from fastapi import Depends
from pydantic import BaseModel

from src.services.db_service import RunSql
from src.features.submissions.submisison_model import Submission


class SubmissionsService:
    def __init__(self, run_sql: RunSql = Depends()) -> None:
        self.run_sql = run_sql

    async def get_grade_for_assignment(self, assignment_id: UUID, user_id: str):
        sql = """
            select 
                *
            from Submission
            where assignment_id = %(assignment_id)s 
                and user_id = %(user_id)s
            order by submitted_date
        """
        params = {"assignment_id": assignment_id, "user_id": user_id}
        results = await self.run_sql(sql, params, output_class=Submission)

        if len(results) == 0:
            return None

        pprint(results)
        return results[0].grade

    async def submit_assignment(
        self,
        user_id: str,
        assignment_id: UUID,
        submission_string: str,
        grade: Optional[float],
        seconds_to_complete: float,
    ):
        sql = """
            INSERT INTO Submission
                (
                    user_id, 
                    assignment_id, 
                    grade, 
                    submitted_text, 
                    seconds_to_complete
                )
            values
                (
                    %(user_id)s, 
                    %(assignment_id)s, 
                    %(grade)s, 
                    %(submission_string)s,
                    %(seconds_to_complete)s
                )
        """
        params = {
            "assignment_id": assignment_id,
            "grade": grade,
            "user_id": user_id,
            "submission_string": submission_string,
            "seconds_to_complete": seconds_to_complete,
        }
        await self.run_sql(sql, params)

    async def delete_all_grades(self):
        sql = """
            truncate Submission
        """
        await self.run_sql(sql, {})

    async def get_all_students_submissions_for_assignment(self, assignment_id: UUID):
        sql = """
            select 
                *
            from Submission
            where assignment_id = %(assignment_id)s
            order by submitted_date
        """
        params = {"assignment_id": assignment_id}
        results = await self.run_sql(sql, params, output_class=Submission)

        return results

    async def get_assignment_submissions_for_student(
        self, assignment_id: UUID, student_sub: str
    ):
        sql = """
            select 
                *
            from Submission
            where assignment_id = %(assignment_id)s
                and user_id = %(student_sub)s
            order by submitted_date
        """
        params = {"assignment_id": assignment_id, "student_sub": student_sub}
        results = await self.run_sql(sql, params, output_class=Submission)

        return results

    async def override_grade(self, submission_id: UUID, grade: float):
        sql = """
            update Submission
            set grade = %(grade)s
            where id = %(submission_id)s
        """
        params = {"grade": grade, "submission_id": submission_id}
        await self.run_sql(sql, params)
