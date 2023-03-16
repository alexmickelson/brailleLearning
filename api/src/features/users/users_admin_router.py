from typing import Dict, List, Optional
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.features.users.user_service import UserService
from src.models.user import User
from src.services import braille_service
from src.services.oauth_service import authenticate_user

router = APIRouter(
    prefix="/admin/users",
    dependencies=[Depends(authenticate_user)],
    tags=["Admin Actions"],
)


admins: List[User] = []


class AdminCreateRequest(BaseModel):
    sub: str


@router.post("/")
async def create_admin(
    body: AdminCreateRequest,
    user_service: UserService = Depends(),
):
    await user_service.make_user_admin(body.sub)


@router.get("/")
async def get_all_admins(
    user_service: UserService = Depends(),
):
    return await user_service.get_all_admins()
