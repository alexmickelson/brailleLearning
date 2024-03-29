from datetime import datetime
from typing import Dict, List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.features.assignment.assignment_service import AssignmentService
from src.features.submissions.submissions_service import SubmissionsService
from src.models.user import UserProfile
from src.services.oauth_service import authenticate_user

router = APIRouter(
    prefix="/assignments",
    dependencies=[Depends(authenticate_user)],
    tags=["Assignments"],
)


@router.get("/details/{assignment_id}")
async def get_assignment_by_id(
    assignment_id: UUID,
    assignment_service: AssignmentService = Depends(),
):
    # todo: make sure authorized
    assignment = await assignment_service.get_assignment(assignment_id)
    return assignment


@router.get("/uncompleted")
async def get_uncompleted_assignments(
    assignment_service: AssignmentService = Depends(),
    profile: UserProfile = Depends(authenticate_user),
):
    return await assignment_service.get_uncompleted_assignments(profile.sub)


@router.get("/completed")
async def get_completed_assignments(
    assignment_service: AssignmentService = Depends(),
    profile: UserProfile = Depends(authenticate_user),
):
    return await assignment_service.get_completed_assignments(profile.sub)

@router.get("/past")
async def get_past_assignments(
    assignment_service: AssignmentService = Depends(),
    profile: UserProfile = Depends(authenticate_user),
):
    return await assignment_service.get_past_assignments()

