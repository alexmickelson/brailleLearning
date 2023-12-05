from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel


class SubmissionStage(BaseModel):
    id: UUID
    submission_id: UUID
    stage_id: UUID
    submitted_text: Optional[str]
    grade: Optional[float]


class Submission(BaseModel):
    id: UUID
    assignment_id: UUID
    user_sub: str
    seconds_to_complete: float
    submitted_date: datetime
    graded_by_user_name: Optional[str]
    stages: List[SubmissionStage]
