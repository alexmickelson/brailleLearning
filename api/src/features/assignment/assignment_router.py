from typing import Dict, List, Optional
from uuid import UUID
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.features.assignment.assignment_service import AssignmentService
from src.features.assignment.submissions.submissions_service import SubmissionsService
from src.services import braille_service
from src.services.oauth_service import authenticate_user

from pydantic import BaseModel

router = APIRouter(
    prefix="/assignments",
    dependencies=[Depends(authenticate_user)],
    tags=["Assignments"],
)

user_id = "testuser"

# assignments: List[Assignment] = [
#     Assignment(
#         id=0,
#         name="Assignment 1",
#         text="translate this",
#         show_reference_braille=False,
#         show_print_feed=False,
#         type=AssignmentType.STRING_TO_BRAILLE,
#     )
# ]


@router.get("/details/{assignment_id}")
async def get_assignment_by_id(
    assignment_id: UUID,
    assignment_service: AssignmentService = Depends(),
):
    assignment = await assignment_service.get_assignment(assignment_id)
    return assignment


class AssignmentSubmission(BaseModel):
    braille: str


@router.post("/submit/{assignment_id}")
async def submit_assignment(
    assignment_id: UUID,
    body: AssignmentSubmission,
    submissions_service: SubmissionsService = Depends(),
    assignment_service: AssignmentService = Depends(),
):
    translated_brail_submission = braille_service.braille_to_text(body.braille)
    assignment = await assignment_service.get_assignment(assignment_id)

    print(assignment.text)
    print(translated_brail_submission)
    if translated_brail_submission == assignment.text:
        await submissions_service.assign_grade_for_assignment(
            user_id, assignment_id, 100.0
        )
        return {"correctly_translated": True}
    else:
        await submissions_service.assign_grade_for_assignment(
            user_id, assignment_id, 0.0
        )
        return {
            "correctly_translated": False,
            "actual_translation": translated_brail_submission,
        }


@router.get("/all")
async def get_all_assignments(assignment_service: AssignmentService = Depends()):
    return await assignment_service.get_all_assignments()


@router.get("/grades/{assignment_id}")
async def get_assignment_grade(
    assignment_id: UUID,
    submissions_service: SubmissionsService = Depends(),
):
    grade = await submissions_service.get_grade_for_assignment(assignment_id, user_id)
    return {"grade": grade}


@router.delete("/grades/all")
async def delete_all_grades(
    submissions_service: SubmissionsService = Depends(),
):
    await submissions_service.delete_all_grades()


class AssignmentCreation(BaseModel):
    name: str
    text: str
    show_reference_braille: Optional[bool] = Field(default=False)
    show_print_feed: Optional[bool] = Field(default=False)
    type: Optional[AssignmentType] = Field(default=AssignmentType.STRING_TO_BRAILLE)


@router.post("/new")
async def create_assignment(
    body: AssignmentCreation, assignment_service: AssignmentService = Depends()
):
    new_assignment = await assignment_service.create_assignment(
        name=body.name,
        text=body.text,
        show_reference_braille=(
            body.show_reference_braille
            if body.show_reference_braille is not None
            else False
        ),
        show_print_feed=(
            body.show_print_feed if body.show_print_feed is not None else False
        ),
        type=(body.type if body.type is not None else AssignmentType.STRING_TO_BRAILLE),
    )
    return new_assignment


class AssignmentUpdate(BaseModel):
    name: str
    text: str


@router.put("/{assignment_id}")
async def update_assignment(
    assignment_id: UUID,
    body: AssignmentUpdate,
    assignment_service: AssignmentService = Depends(),
):
    await assignment_service.update(
        assignment_id=assignment_id, name=body.name, text=body.text
    )
