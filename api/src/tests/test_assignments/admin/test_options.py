from fastapi.testclient import TestClient
from src.main import app


def test_can_create_assignment_with_reference_braille(authenticated_client: TestClient):
    name = "Assignment 3"
    body = {
        "name": name,
        "text": "translate this other thing",
        "show_reference_braille": True,
    }
    url = "/api/assignments/new"
    response = authenticated_client.post(url, json=body)
    assert response.is_success

    id = response.json()["id"]
    assignment_response = authenticated_client.get(f"/api/assignments/details/{id}")
    assert assignment_response.is_success
    assert assignment_response.json()["show_reference_braille"] == True
