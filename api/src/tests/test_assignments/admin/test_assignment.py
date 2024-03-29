from fastapi.testclient import TestClient
from src.main import app
from src.models.user import UserProfile
from src.tests.conftest import admin_client, create_assignment

admin_user = UserProfile(sub="", name="", is_admin=True)

def test_admin_can_create_assignment(authenticated_client: TestClient):
    name = "Assignment 3"
    create_assignment(authenticated_client, name)

    assignments_response = get_all_assignments_as_admin(authenticated_client)

    assignment_names = [i["name"] for i in assignments_response.json()]
    assert name in assignment_names

def get_all_assignments_as_admin(authenticated_client):
    assignments_url = "/api/admin/assignments/all"
    with admin_client(admin_user):
        assignments_response = authenticated_client.get(assignments_url)
    assert assignments_response.is_success
    return assignments_response


def test_non_authenticated_users_cannot_create_assignment():
    client = TestClient(app)
    name = "Assignment 3"
    body = {"name": name, "text": "translate this other thing"}
    url = "/api/admin/assignments/new"
    response = client.post(url, json=body)
    assert response.status_code == 403


def test_admin_can_view_submitted_assignments(authenticated_client: TestClient):
    name = "Assignment 5"
    assignment = create_assignment(authenticated_client, name)
    assignment_id = assignment["id"]

    submissions_url = f"/api/submissions/admin/{assignment_id}/all"

    with admin_client(admin_user):
        submissions_response = authenticated_client.get(submissions_url)
    assert submissions_response.is_success

    submissions = submissions_response.json()
    assert len(submissions) == 0


def test_admin_can_update_assinment(authenticated_client: TestClient):
    name = "Assignment 5"
    assignment = create_assignment(authenticated_client, name)
    assignment_id = assignment["id"]

    url = f"/api/admin/assignments/{assignment_id}"
    updated_name = "Assignment 5 - updated"
    body = {"name": updated_name, "text": "totally different this time", "stages": []}

    with admin_client(admin_user):
        response = authenticated_client.put(url, json=body)
    assert response.is_success

    
    assignments_response = get_all_assignments_as_admin(authenticated_client)

    assignment_names = [
        i["name"] for i in assignments_response.json() if i["id"] == assignment_id
    ]
    assert updated_name in assignment_names

