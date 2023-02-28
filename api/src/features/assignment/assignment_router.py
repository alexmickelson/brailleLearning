from typing import Dict, List, Optional
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.services import braille_service
from src.services.oauth_service import authenticate_user

from pydantic import BaseModel

router = APIRouter(prefix="/assignments", dependencies=[Depends(authenticate_user)])


assignments: List[Assignment] = [
    Assignment(
        id=0,
        name="Assignment 1",
        text="translate this",
        show_reference_braille=False,
        show_print_feed=False,
        type=AssignmentType.STRING_TO_BRAILLE,
    )
]

grades: Dict[int, None | float] = {0: None}


@router.get("/details/{assignment_id}")
async def get_assignment_by_id(assignment_id: int):
    return assignments[assignment_id]


class AssignmentSubmission(BaseModel):
    braille: str


@router.post("/submit/{assignment_id}")
async def submit_assignment(assignment_id: int, body: AssignmentSubmission):
    global grades
    translated_brail_submission = braille_service.braille_to_text(body.braille)
    if translated_brail_submission == assignments[assignment_id].text:
        grades[assignment_id] = 100.0
        return {"correctly_translated": True}
    else:
        grades[assignment_id] = 0.0
        return {
            "correctly_translated": False,
            "actual_translation": translated_brail_submission,
        }


@router.get("/all")
async def get_all_assignments():
    return assignments


@router.get("/grades/{assignment_id}")
async def get_assignment_grade():
    global grades
    return {"grade": grades[0]}


@router.delete("/grades/all")
async def delete_all_assignments():
    global grades
    grades = {0: None}


class AssignmentCreation(BaseModel):
    name: str
    text: str
    show_reference_braille: Optional[bool] = Field(default=False)
    show_print_feed: Optional[bool] = Field(default=False)
    type: Optional[AssignmentType] = Field(default=AssignmentType.STRING_TO_BRAILLE)


@router.post("/new")
async def create_assignment(body: AssignmentCreation):
    global assignments
    new_assignment = Assignment(
        name=body.name,
        text=body.text,
        id=len(assignments),
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
    assignments.append(new_assignment)
    return new_assignment
