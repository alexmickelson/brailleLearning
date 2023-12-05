from pprint import pprint
from typing import Dict, Optional
from uuid import UUID
from fastapi import Depends

from src.services.db_service import RunSql
from src.features.submissions.submisison_model import Submission


class SubmissionsService:
    def __init__(self, run_sql: RunSql = Depends()) -> None:
        self.run_sql = run_sql

    async def get_submissions_for_assignment(self, assignment_id: UUID, user_sub: str):
        sql = """
            select 
                s.id,
                s.assignment_id,
                s.user_sub,
                s.seconds_to_complete,
                s.submitted_date,
                a.name as "graded_by_user_name",
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', substage.id,
                            'submission_id', substage.submission_id,
                            'stage_id', substage.stage_id,
                            'submitted_text', substage.submitted_text,
                            'grade', substage.grade
                        ) order by substage.index asc
                    )
                    FILTER (WHERE substage.submission_id IS NOT NULL), '[]'
                ) as stages

            from Submission s
                left join UserAccount a on s.graded_by_user_sub = a.sub
                left join SubmissionStage substage on s.id = substage.submission_id
            where s.assignment_id = %(assignment_id)s 
                and s.user_sub = %(user_sub)s
            order by s.submitted_date
        """
        params = {"assignment_id": assignment_id, "user_sub": user_sub}
        results = await self.run_sql(sql, params, output_class=Submission)

        if len(results) == 0:
            print(f"found no submissions for {assignment_id} and {user_sub}")
            return None

        return results

    async def submit_assignment(
        self,
        user_sub: str,
        assignment_id: UUID,
        student_string_by_stage: Dict[UUID, str],
        seconds_to_complete: float,
    ):
        sql = """
            INSERT INTO Submission
                (
                    user_sub, 
                    assignment_id,
                    seconds_to_complete
                )
            values
                (
                    %(user_sub)s, 
                    %(assignment_id)s,
                    %(seconds_to_complete)s
                )
            returning id
        """
        params = {
            "assignment_id": assignment_id,
            "user_sub": user_sub,
            "seconds_to_complete": seconds_to_complete,
        }
        result = await self.run_sql(sql, params)
        submission_id = result[0]["id"]
        for stage_id, student_text in student_string_by_stage.items():
            await self.save_stage_submission(submission_id, stage_id, student_text)

    async def save_stage_submission(
        self, submission_id: UUID, stage_id: UUID, student_text: str
    ):
        sql = """
            INSERT INTO SubmissionStage
                (
                    submission_id, 
                    stage_id,
                    submitted_text
                )
            values
                (
                    %(submission_id)s, 
                    %(stage_id)s,
                    %(submitted_text)s
                )
            returning id
        """
        params = {
            "submission_id": submission_id,
            "stage_id": stage_id,
            "submitted_text": student_text,
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
                a.name as "graded_by_user_name",
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', substage.id,
                            'submission_id', substage.submission_id,
                            'stage_id', substage.stage_id,
                            'submitted_text', substage.submitted_text,
                            'grade', substage.grade
                        ) order by substage.index asc
                    )
                    FILTER (WHERE substage.submission_id IS NOT NULL), '[]'
                ) as stages
            from Submission s
                left join UserAccount a on s.graded_by_user_sub = a.sub
                left join SubmissionStage substage on s.id = substage.submission_id
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
                a.name as "graded_by_user_name",
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', substage.id,
                            'submission_id', substage.submission_id,
                            'stage_id', substage.stage_id,
                            'submitted_text', substage.submitted_text,
                            'grade', substage.grade
                        ) order by substage.index asc
                    )
                    FILTER (WHERE substage.submission_id IS NOT NULL), '[]'
                ) as stages
            from Submission s
                left join UserAccount a on s.graded_by_user_sub = a.sub
                left join SubmissionStage substage on s.id = substage.submission_id
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
        params = {
            "grade": grade,
            "submission_id": submission_id,
            "grader_sub": grader_sub,
        }
        result = await self.run_sql(sql, params)
        pprint(result)
