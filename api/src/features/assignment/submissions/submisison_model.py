
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class Submission(BaseModel):
    id: UUID
    assignment_id: UUID
    user_id: str
    grade: float
    submitted_text: Optional[str]
    # answers: list[str]
