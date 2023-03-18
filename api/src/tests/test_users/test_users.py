import random
import string
from fastapi.testclient import TestClient
import pytest
from src.main import app
from src.features.users.user_service import UserService
from src.models.user import User
from src.services.db_service import RunSql
from src.services.oauth_service import authenticate_user


@pytest.mark.asyncio
async def test_can_create_admin(authenticated_client: TestClient):
    user = await generate_user()
    make_user_admin(authenticated_client, user)

    url = "/api/admin/users/"
    admins_response = authenticated_client.get(url)
    assert admins_response.is_success

    print(admins_response.json())
    new_admin = [a for a in admins_response.json() if a["sub"] == user.sub]

    assert len(new_admin) > 0

@pytest.mark.asyncio
async def test_can_get_profile(authenticated_client: TestClient):
    user = await generate_user()
    make_user_admin(authenticated_client, user)
    app.dependency_overrides[authenticate_user] = lambda: user
    url = "/api/user/profile"
    response = authenticated_client.get(url)
    assert response.is_success
    print(response.json())

    assert response.json()["is_admin"] == True


async def generate_user():
    user_service = UserService(RunSql())
    salt = "".join(random.choices(string.ascii_letters, k=5))
    sub = salt + "alexmickelsonguru"
    name = "generated user" + sub
    await user_service.create_user(sub, name)
    return User(sub=sub, name=name)


def make_user_admin(authenticated_client, user):
    url = "/api/admin/users/"
    body = {"sub": user.sub}

    create_response = authenticated_client.post(url, json=body)
    assert create_response.is_success
