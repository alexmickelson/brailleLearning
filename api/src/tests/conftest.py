from dotenv import load_dotenv
load_dotenv()

from src.features.assignment.assignment_models import AssignmentType
import pytest
from fastapi.testclient import TestClient
from src.main import app
from src.services.oauth_service import authenticate_user


@pytest.fixture()
def authenticated_client():
    app.dependency_overrides[authenticate_user] = lambda: {}
    client = TestClient(app)
    yield client
    app.dependency_overrides[authenticate_user] = authenticate_user


def create_assignment(
    authenticated_client: TestClient,
    name: str = "Default Assignment",
    translate_text: str = "translate this other thing",
):
    body = {
        "name": name,
        "text": translate_text,
        "show_reference_braille": False,
        "show_print_feed": False,
        "type": AssignmentType.STRING_TO_BRAILLE,
    }
    url = "/api/assignments/new"

    response = authenticated_client.post(url, json=body)
    assert response.is_success
    return response.json()
