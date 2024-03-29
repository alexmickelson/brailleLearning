from typing import Dict, List, Optional
from uuid import UUID
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.assignment_service import AssignmentService
from src.features.submissions.submissions_service import SubmissionsService
from src.models.user import UserProfile
from src.services import braille_service
from src.services.oauth_service import authenticate_user, authorize_admin

router = APIRouter(
    prefix="/submissions",
    dependencies=[Depends(authenticate_user)],
    tags=["Submission"],
)


@router.get("/admin/{assignment_id}/all")
async def get_assignment_submissions(
    assignment_id: UUID,
    submissions_service: SubmissionsService = Depends(),
):
    submissions_list = (
        await submissions_service.get_all_students_submissions_for_assignment(
            assignment_id
        )
    )
    submissions_by_student = [
        {"sub": student, "submissions":  [sub for sub in submissions_list if sub.user_sub == student]}
        for student in set(sub.user_sub for sub in submissions_list)
    ]
    return submissions_by_student


class AssignmentSubmissionRequest(BaseModel):
    student_string_by_stage: Dict[UUID, str]
    seconds_to_complete: float


@router.post("/{assignment_id}")
async def submit_assignment(
    assignment_id: UUID,
    body: AssignmentSubmissionRequest,
    profile: UserProfile = Depends(authenticate_user),
    submissions_service: SubmissionsService = Depends(),
    assignment_service: AssignmentService = Depends(),
):
    # translated_brail_submission = braille_service.braille_to_text(body.braille)
    # grade = 100.0 if translated_brail_submission == assignment.text else 0.0
    assignment = await assignment_service.get_assignment(assignment_id)  # validation

    await submissions_service.submit_assignment(
        user_sub=profile.sub,
        assignment_id=assignment_id,
        student_string_by_stage=body.student_string_by_stage,
        seconds_to_complete=body.seconds_to_complete
    )


class GradeOverrideBody(BaseModel):
    grade: float


@router.put("/{submission_id}/grade")
async def admin_override_grade(
    submission_id: UUID,
    body: GradeOverrideBody,
    user: UserProfile = Depends(authorize_admin),
    submissions_service: SubmissionsService = Depends(),
):
    await submissions_service.override_grade(
        submission_id=submission_id, grade=body.grade, grader_sub=user.sub
    )

@router.get("/{assignment_id}")
async def get_student_assignment_submissions(
    assignment_id: UUID,
    profile: UserProfile = Depends(authenticate_user),
    submissions_service: SubmissionsService = Depends(),
):
    submissions = await submissions_service.get_assignment_submissions_for_student(
        assignment_id=assignment_id, student_sub=profile.sub
    )
    return submissions
