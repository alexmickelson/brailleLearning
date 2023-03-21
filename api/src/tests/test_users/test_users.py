import random
import string
from fastapi.testclient import TestClient
import pytest
from src.main import app
from src.features.users.user_service import UserService
from src.models.user import User, UserProfile
from src.services.db_service import RunSql
from src.services.oauth_service import authenticate_user, authorize_admin


@pytest.mark.asyncio
async def test_can_create_admin(authenticated_client: TestClient):
    user = await generate_user()
    make_user_admin(authenticated_client, user)

    url = "/api/admin/users/admins"
    admins_response = authenticated_client.get(url)
    assert admins_response.is_success

    print(admins_response.json())
    new_admin = [a for a in admins_response.json() if a["sub"] == user.sub]
    assert len(new_admin) > 0


@pytest.mark.asyncio
async def test_can_remove_admin(authenticated_client: TestClient):
    user = await generate_user()
    make_user_admin(authenticated_client, user)

    remove_url = "/api/admin/users/removeAdmin"
    body = {"sub": user.sub}
    assert authenticated_client.put(remove_url, json=body).is_success

    url = "/api/admin/users/admins"
    admins_response = authenticated_client.get(url)
    assert admins_response.is_success

    print(admins_response.json())
    new_admin = [a for a in admins_response.json() if a["sub"] == user.sub]
    assert len(new_admin) == 0


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


@pytest.mark.asyncio
async def test_admin_can_get_all_users(authenticated_client: TestClient):
    user = await generate_user()
    make_user_admin(authenticated_client, user)
    app.dependency_overrides[authenticate_user] = lambda: user
    url = "/api/admin/users/all"
    response = authenticated_client.get(url)
    assert response.is_success

    assert len(response.json()) > 0


@pytest.mark.asyncio
async def test_non_admin_cannot_get_all_users(authenticated_client: TestClient):
    user = await generate_user(False)

    app.dependency_overrides[authorize_admin] = authorize_admin
    url = "/api/admin/users/all"
    response = authenticated_client.get(url)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_non_admin_cannot_make_or_remove_admin(authenticated_client: TestClient):
    user = await generate_user(False)
    body = {"sub": user.sub}
    make_url = "/api/admin/users/makeAdmin"
    make_response = authenticated_client.put(make_url, json=body)
    assert make_response.status_code == 403
    remove_url = "/api/admin/users/removeAdmin"
    remove_response = authenticated_client.put(remove_url, json=body)
    assert remove_response.status_code == 403


async def generate_user(is_admin: bool = True):
    user_service = UserService(RunSql())
    salt = "".join(random.choices(string.ascii_letters, k=5))
    sub = salt + "alexmickelsonguru"
    name = "generated user" + sub
    await user_service.create_user(sub, name)
    return UserProfile(sub=sub, name=name, is_admin=is_admin)


def make_user_admin(authenticated_client, user):
    url = "/api/admin/users/makeAdmin"
    body = {"sub": user.sub}

    app.dependency_overrides[authorize_admin] = lambda: UserProfile(
        sub="some", name="admin", is_admin=True
    )
    create_response = authenticated_client.put(url, json=body)
    assert create_response.is_success
