from fastapi.testclient import TestClient
from src.main import app

def test_admin_can_create_assignment(authenticated_client: TestClient):

    name = "Assignment 3"
    body = {"name": name, "text": "translate this other thing"}
    url = "/api/assignments/new"

    response = authenticated_client.post(url, json=body)
    assert response.is_success

    assignments_url = "/api/assignments/all"
    assignments_response = authenticated_client.get(assignments_url)
    assert assignments_response.is_success

    assignment_names = [i["name"] for i in assignments_response.json()]
    assert name in assignment_names


def test_non_admin_cannot_create_assignment():
    client = TestClient(app)
    name = "Assignment 3"
    body = {"name": name, "text": "translate this other thing"}
    url = "/api/assignments/new"
    response = client.post(url, json=body)
    assert response.status_code == 403
