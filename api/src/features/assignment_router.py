from fastapi import APIRouter
from pydantic import BaseModel
from src.services import braille_service

router = APIRouter(prefix="/assignments")


assignments = [{"name": "Assignment 1", "text": "translate this"}]


@router.get("/{assignment_id}")
async def get_assignment_by_id(assignment_id: int):
    return assignments[assignment_id]


class AssignmentSubmission(BaseModel):
    brail: str


@router.post("/{assignment_id}")
async def submit_assignment(assignment_id: int, body: AssignmentSubmission):
    translated_brail_submission = braille_service.braille_to_text(body.brail)
    if translated_brail_submission == assignments[assignment_id]["text"]:
        return {"correctly_translated": True}
    else:
        return {
            "correctly_translated": False,
            "actual_translation": translated_brail_submission,
        }
