from enum import Enum
from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class AssignmentType(str, Enum):
    BRAILLE_TO_PRINT = "braille_to_print"
    STRING_TO_BRAILLE = "string_to_braille"


class Assignment(BaseModel):
    id: UUID
    name: str
    text: str
    show_reference_braille: bool
    reference_braille: Optional[str]
    show_live_preview: bool
    type: AssignmentType
