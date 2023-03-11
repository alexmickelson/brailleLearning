from typing import Dict, List, Optional
from uuid import UUID
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.submissions.submissions_service import SubmissionsService
from src.services import braille_service
from src.services.oauth_service import authenticate_user

router = APIRouter(
    prefix="/assignment",
    dependencies=[Depends(authenticate_user)],
    tags=["Assignments"],
)


@router.get("/{assignment_id}/submissions")
async def get_assignment_submissions(
    assignment_id: UUID,
    submissions_service: SubmissionsService = Depends(),
):
    return await submissions_service.get_submissions_for_assignment(assignment_id)
