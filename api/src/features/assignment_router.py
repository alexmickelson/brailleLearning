from typing import Dict
from fastapi import APIRouter
from pydantic import BaseModel
from src.services import braille_service

router = APIRouter(prefix="/assignments")


assignments = [{"id": 0, "name": "Assignment 1", "text": "translate this"}]

grades: Dict[int, None | float] = {0: None}


@router.get("/details/{assignment_id}")
async def get_assignment_by_id(assignment_id: int):
    return assignments[assignment_id]


class AssignmentSubmission(BaseModel):
    brail: str


@router.post("/submit/{assignment_id}")
async def submit_assignment(assignment_id: int, body: AssignmentSubmission):
    global grades
    translated_brail_submission = braille_service.braille_to_text(body.brail)
    if translated_brail_submission == assignments[assignment_id]["text"]:
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
