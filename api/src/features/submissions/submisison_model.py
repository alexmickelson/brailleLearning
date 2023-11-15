from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel


class Submission(BaseModel):
    id: UUID
    assignment_id: UUID
    user_sub: str
    grade: Optional[float]
    seconds_to_complete: float
    submitted_text: Optional[str]
    submitted_date: datetime
    graded_by_user_name: Optional[str]
    # answers: list[str]
