from datetime import datetime
from typing import Dict, List, Optional
from uuid import UUID
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.assignment_models import (
    Assignment,
    AssignmentStage,
    AssignmentType,
)
from src.features.assignment.assignment_service import AssignmentService
from src.features.submissions.submissions_service import SubmissionsService
from src.models.user import UserProfile
from src.services import braille_service
from src.services.oauth_service import authenticate_user, authorize_admin

from pydantic import BaseModel

router = APIRouter(
    prefix="/admin/assignments",
    dependencies=[Depends(authenticate_user), Depends(authorize_admin)],
    tags=["Assignments"],
)


@router.get("/details/{assignment_id}")
async def get_assignment_by_id(
    assignment_id: UUID,
    assignment_service: AssignmentService = Depends(),
):
    assignment = await assignment_service.get_assignment(assignment_id)
    return assignment


@router.delete("/grades/all")
async def delete_all_grades(
    submissions_service: SubmissionsService = Depends(),
):
    await submissions_service.delete_all_grades()


class AssignmentCreation(BaseModel):
    name: str
    available_date: Optional[datetime] = Field(default=None)
    closed_date: Optional[datetime] = Field(default=None)


@router.post("/new")
async def create_assignment(
    body: AssignmentCreation,
    assignment_service: AssignmentService = Depends(),
    user: UserProfile = Depends(authorize_admin),
):
    # show_live_preview = (
    #     body.show_live_preview if body.show_live_preview is not None else False
    # )
    # type = body.type if body.type is not None else AssignmentType.PRINT_TO_BRAILLE
    # show_reference_braille = (
    #     body.show_reference_braille
    #     if body.show_reference_braille is not None
    #     else False
    # )
    new_assignment = await assignment_service.create_assignment(
        name=body.name,
        available_date=body.available_date,
        closed_date=body.closed_date,
    )
    return new_assignment


@router.post("/{assignment_id}/stage")
async def create_assignment_stage(
    assignment_id: UUID,
    assignment_service: AssignmentService = Depends(),
    user: UserProfile = Depends(authorize_admin),
):
    await assignment_service.create_stage(assignment_id)


@router.delete("/{assignment_id}")
async def delete_assignment(
    assignment_id: UUID,
    assignment_service: AssignmentService = Depends(),
):
    await assignment_service.delete(assignment_id)


class AssignmentUpdate(BaseModel):
    name: str
    available_date: Optional[datetime] = Field(default=None)
    closed_date: Optional[datetime] = Field(default=None)
    stages: List[AssignmentStage]


@router.put("/{assignment_id}")
async def update_assignment(
    assignment_id: UUID,
    body: AssignmentUpdate,
    assignment_service: AssignmentService = Depends(),
    user=Depends(authorize_admin),
):
    await assignment_service.update_assignment(
        assignment_id=assignment_id,
        name=body.name,
        available_date=body.available_date,
        closed_date=body.closed_date,
    )
    previous_assignment = await assignment_service.get_assignment(assignment_id)

    stage_ids = [s.id for s in body.stages]
    # remove old stages
    for previous_stage  in previous_assignment.stages:
        if previous_stage.id not in stage_ids:
            await assignment_service.remove_stage(previous_stage.id)
    # update incoming stages
    for stage in body.stages:
        await assignment_service.update_stage(stage)


@router.get("/all")
async def get_all_assignments(
    assignment_service: AssignmentService = Depends(),
):
    return await assignment_service.get_all_assignments()


@router.get("/details/{assignment_id}")
async def get_assignment_details(
    assignment_id: UUID,
    assignment_service: AssignmentService = Depends(),
):
    assignment = await assignment_service.get_assignment(assignment_id)
    return assignment
