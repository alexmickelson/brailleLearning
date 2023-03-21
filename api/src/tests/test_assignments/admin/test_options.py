from fastapi.testclient import TestClient
from src.main import app
from src.models.user import UserProfile
from src.tests.conftest import admin_client


def test_can_create_assignment_with_reference_braille(authenticated_client: TestClient):
    name = "Assignment 3"
    body = {
        "name": name,
        "text": "translate this other thing",
        "show_reference_braille": True,
    }
    url = "/api/assignments/new"
    user = UserProfile(sub="", name="", is_admin=True)
    with admin_client(user):
        response = authenticated_client.post(url, json=body)
    assert response.is_success

    id = response.json()["id"]
    assignment_response = authenticated_client.get(f"/api/assignments/details/{id}")
    assert assignment_response.is_success
    assert assignment_response.json()["show_reference_braille"] == True


def test_can_create_assignment_with_live_print_feed(authenticated_client: TestClient):
    name = "Assignment 3"
    body = {
        "name": name,
        "text": "translate this other thing",
        "show_print_feed": True,
    }
    url = "/api/assignments/new"
    user = UserProfile(sub="", name="", is_admin=True)
    with admin_client(user):
        response = authenticated_client.post(url, json=body)
    assert response.is_success

    id = response.json()["id"]
    assignment_response = authenticated_client.get(f"/api/assignments/details/{id}")
    print(assignment_response.json())
    assert assignment_response.is_success
    assert assignment_response.json()["show_print_feed"] == True
