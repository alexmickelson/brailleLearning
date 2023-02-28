from enum import Enum
from pydantic import BaseModel


class AssignmentType(str, Enum):
    BRAILLE_TO_PRINT = "braille_to_print"
    STRING_TO_BRAILLE = "string_to_braille"


class Assignment(BaseModel):
    id: int
    name: str
    text: str
    show_reference_braille: bool
    show_print_feed: bool
    type: AssignmentType
