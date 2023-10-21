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


@router.get("/{assignment_id}/all")
async def get_assignment_submissions(
    assignment_id: UUID,
    submissions_service: SubmissionsService = Depends(),
):
    return await submissions_service.get_all_students_submissions_for_assignment(
        assignment_id
    )


class AssignmentSubmission(BaseModel):
    braille: str
    seconds_to_complete: float


@router.post("/{assignment_id}")
async def submit_assignment(
    assignment_id: UUID,
    body: AssignmentSubmission,
    profile: UserProfile = Depends(authenticate_user),
    submissions_service: SubmissionsService = Depends(),
    assignment_service: AssignmentService = Depends(),
):
    # translated_brail_submission = braille_service.braille_to_text(body.braille)
    # grade = 100.0 if translated_brail_submission == assignment.text else 0.0
    assignment = await assignment_service.get_assignment(assignment_id)

    await submissions_service.submit_assignment(
        user_id=profile.sub,
        assignment_id=assignment_id,
        braille_text=body.braille,
        seconds_to_complete=body.seconds_to_complete,
        grade=None,
    )

    # if translated_brail_submission == assignment.text:
    #     return {"correctly_translated": True}
    # else:
    #     return {
    #         "correctly_translated": False,
    #         "actual_translation": translated_brail_submission,
    #     }


class GradeOverrideBody(BaseModel):
    grade: float


@router.put("/{submission_id}/grade")
async def admin_override_grade(
    submission_id: UUID,
    body: GradeOverrideBody,
    user: UserProfile = Depends(authorize_admin),
    submissions_service: SubmissionsService = Depends(),
):
    await submissions_service.override_grade(submission_id, body.grade)
