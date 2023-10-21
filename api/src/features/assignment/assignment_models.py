from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class AssignmentType(str, Enum):
    BRAILLE_TO_PRINT = "braille_to_print"
    PRINT_TO_BRAILLE = "print_to_braille"


class Assignment(BaseModel):
    id: UUID
    name: str
    text: str
    points: int
    show_reference_braille: bool
    reference_braille: Optional[str]
    show_live_preview: bool
    available_date: Optional[datetime]
    closed_date: Optional[datetime]
    type: AssignmentType
