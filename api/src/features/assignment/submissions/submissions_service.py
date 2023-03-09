from typing import Dict
from pydantic import BaseModel

grades: Dict[int, None | float] = {0: None}

class Submission(BaseModel):
    pass


class SubmissionsService:
    def get_grade_for_assignment(self, assignment_id: int):
        global grades
        return grades[assignment_id]

    def assign_grade_for_assignment(self, assignment_id: int, grade: float):
        global grades
        grades[assignment_id] = grade

    def delete_all_grades(self):
        global grades
        grades = {0: None}

    def get_submissions_for_assignment(self, assignment_id: int):
        return grades.values()
