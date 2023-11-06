from pprint import pprint
from typing import Optional
from uuid import UUID
from fastapi import Depends

from src.services.db_service import RunSql
from src.features.submissions.submisison_model import Submission


class SubmissionsService:
    def __init__(self, run_sql: RunSql = Depends()) -> None:
        self.run_sql = run_sql

    async def get_grade_for_assignment(self, assignment_id: UUID, user_sub: str):
        sql = """
            select 
                s.id,
                s.assignment_id,
                s.user_sub,
                s.grade,
                s.seconds_to_complete,
                s.submitted_text,
                s.submitted_date,
                a.name as "graded_by_user_name"
            from Submission s
                left join UserAccount a on s.graded_by_user_sub = a.sub
            where s.assignment_id = %(assignment_id)s 
                and s.user_sub = %(user_sub)s
            order by s.submitted_date
        """
        params = {"assignment_id": assignment_id, "user_sub": user_sub}
        results = await self.run_sql(sql, params, output_class=Submission)

        if len(results) == 0:
            return None

        pprint(results)
        return results[0].grade

    async def submit_assignment(
        self,
        user_sub: str,
        assignment_id: UUID,
        submission_string: str,
        grade: Optional[float],
        seconds_to_complete: float,
    ):
        sql = """
            INSERT INTO Submission
                (
                    user_sub, 
                    assignment_id, 
                    grade, 
                    submitted_text, 
                    seconds_to_complete
                )
            values
                (
                    %(user_sub)s, 
                    %(assignment_id)s, 
                    %(grade)s, 
                    %(submission_string)s,
                    %(seconds_to_complete)s
                )
        """
        params = {
            "assignment_id": assignment_id,
            "grade": grade,
            "user_sub": user_sub,
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
                s.id,
                s.assignment_id,
                s.user_sub,
                s.grade,
                s.seconds_to_complete,
                s.submitted_text,
                s.submitted_date,
                a.name as "graded_by_user_name"
            from Submission s
                left join UserAccount a on s.graded_by_user_sub = a.sub
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
                s.id,
                s.assignment_id,
                s.user_sub,
                s.grade,
                s.seconds_to_complete,
                s.submitted_text,
                s.submitted_date,
                a.name as "graded_by_user_name"
            from Submission s
                left join UserAccount a on s.graded_by_user_sub = a.sub
            where s.assignment_id = %(assignment_id)s
                and s.user_sub = %(student_sub)s
            order by s.submitted_date
        """
        params = {"assignment_id": assignment_id, "student_sub": student_sub}
        results = await self.run_sql(sql, params, output_class=Submission)

        return results

    async def override_grade(self, submission_id: UUID, grade: float, grader_sub: str):
        sql = """
            update Submission
            set grade = %(grade)s,
                graded_by_user_sub = %(grader_sub)s
            where id = %(submission_id)s
        """
        params = {"grade": grade, "submission_id": submission_id, "grader_sub": grader_sub}
        await self.run_sql(sql, params)
