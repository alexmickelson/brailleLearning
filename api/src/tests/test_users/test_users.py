import random
import string
from fastapi.testclient import TestClient
import pytest

from src.features.users.user_service import UserService
from src.services.db_service import RunSql

@pytest.mark.asyncio
async def test_can_create_admin(authenticated_client: TestClient):
    user_service = UserService(RunSql())
    salt = random.choice(string.ascii_letters)
    sub = salt + "alexmickelsonguru"
    name = "generated user" + sub
    await user_service.create_user(sub, name)

    url = "/api/admin/users/"
    body = {"sub": sub}

    create_response = authenticated_client.post(url, json=body)
    assert create_response.is_success

    admins_response = authenticated_client.get(url)
    assert admins_response.is_success

    print(admins_response.json())
    new_admin = [a for a in admins_response.json() if a["sub"] == sub]

    assert len(new_admin) > 0
