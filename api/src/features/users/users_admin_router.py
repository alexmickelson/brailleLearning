from typing import Dict, List, Optional
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.models.user import User
from src.services import braille_service
from src.services.oauth_service import authenticate_user

router = APIRouter(prefix="/admin/users", dependencies=[Depends(authenticate_user)])


admins: List[User] = []


class AdminCreateRequest(BaseModel):
    email: str


@router.post("/")
def create_admin(body: AdminCreateRequest):
    global admins

    admins.append(User(email=body.email, token=""))

@router.get("/")
def get_all_admins():
    return admins
