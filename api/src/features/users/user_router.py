from fastapi import APIRouter, Depends
from src.features.users.user_service import UserService
from src.models.user import UserProfile

from src.services.oauth_service import authenticate_user


router = APIRouter(
    prefix="/user",
    dependencies=[Depends(authenticate_user)],
    tags=["User"],
)


@router.get("/profile")
async def get_profile(
    profile: UserProfile = Depends(authenticate_user),
    user_service: UserService = Depends(),
):
    return profile
