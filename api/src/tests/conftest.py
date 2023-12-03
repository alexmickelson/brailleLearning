from contextlib import contextmanager
import datetime
from dotenv import load_dotenv

from src.models.user import UserProfile

load_dotenv("test.env", override=True)

from src.features.assignment.assignment_models import AssignmentType
import pytest
from fastapi.testclient import TestClient
from src.main import app
from src.services.oauth_service import authenticate_user, authorize_admin


@pytest.fixture()
def test_user():
    return UserProfile(sub="testUser", name="test user", is_admin=False)


@pytest.fixture()
def authenticated_client(test_user: UserProfile):
    app.dependency_overrides[authenticate_user] = lambda: test_user
    client = TestClient(app)
    yield client
    app.dependency_overrides[authenticate_user] = authenticate_user


def create_assignment(
    authenticated_client: TestClient,
    name: str = "Default Assignment",
    translate_text: str = "translate this other thing",
):
    
    today = datetime.datetime.now()
    yesterday = today - datetime.timedelta(days=1)
    tomorrow = today + datetime.timedelta(days=1)
    body = {
        "name": name,
        "text": translate_text,
        "available_date": yesterday.isoformat(),
        "closed_date": tomorrow.isoformat(),
    }
    url = "/api/admin/assignments/new"

    user = UserProfile(sub="", name="", is_admin=True)
    with admin_client(user):
        response = authenticated_client.post(url, json=body)
    assert response.is_success
    return response.json()


@contextmanager
def admin_client(user: UserProfile):
    app.dependency_overrides[authorize_admin] = lambda: user
    yield
    app.dependency_overrides[authorize_admin] = authorize_admin
