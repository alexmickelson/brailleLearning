from typing import Dict, List, Optional
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, Field
from src.features.assignment.assignment_models import Assignment, AssignmentType
from src.features.users.user_service import UserService
from src.models.user import User
from src.services.oauth_service import authorize_admin

router = APIRouter(
    prefix="/admin/users",
    dependencies=[Depends(authorize_admin)],
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


@router.get("/admins")
async def get_all_admins(
    user_service: UserService = Depends(),
):
    return await user_service.get_all_admins()

@router.get("/all")
async def get_all_users(
    user_service: UserService = Depends(),):
    return await user_service.get_all_users()