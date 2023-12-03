from datetime import datetime
from enum import Enum
from pprint import pprint
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, Field, ValidationError


class AssignmentType(str, Enum):
    BRAILLE_TO_PRINT = "braille_to_print"
    PRINT_TO_BRAILLE = "print_to_braille"


class AssignmentStage(BaseModel):
    id: UUID
    text: str
    points: int
    show_reference_braille: bool
    reference_braille: Optional[str]
    show_live_preview: bool
    type: AssignmentType
    index: int

class Assignment(BaseModel):
    def __init__(self, **data):
        try:
            super().__init__(**data)
        except ValidationError as e:
            print(f"Error parsing AssignmentStage: {e}")
            pprint(data)
            raise e
    id: UUID
    name: str
    available_date: Optional[datetime]
    closed_date: Optional[datetime]
    stages: List[AssignmentStage] = Field(default=[])
    prereq_assignment_ids: List[UUID] = Field(default=[])
