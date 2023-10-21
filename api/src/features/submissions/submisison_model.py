
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class Submission(BaseModel):
    id: UUID
    assignment_id: UUID
    user_id: str
    grade: Optional[float]
    seconds_to_complete: float
    submitted_text: Optional[str]
    submitted_date: datetime
    # answers: list[str]
