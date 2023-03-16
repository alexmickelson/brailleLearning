from fastapi.testclient import TestClient
from src.main import app
from src.tests.conftest import create_assignment


def test_admin_can_create_assignment(authenticated_client: TestClient):
    name = "Assignment 3"
    create_assignment(authenticated_client, name)

    assignments_url = "/api/assignments/all"
    assignments_response = authenticated_client.get(assignments_url)
    assert assignments_response.is_success

    assignment_names = [i["name"] for i in assignments_response.json()]
    assert name in assignment_names


def test_non_authenticated_users_cannot_create_assignment():
    client = TestClient(app)
    name = "Assignment 3"
    body = {"name": name, "text": "translate this other thing"}
    url = "/api/assignments/new"
    response = client.post(url, json=body)
    assert response.status_code == 403

def test_admin_can_view_submitted_assignments(authenticated_client: TestClient):
    name = "Assignment 5"
    assignment = create_assignment(authenticated_client, name)
    assignment_id = assignment["id"]

    submissions_url = f"/api/assignment/{assignment_id}/submissions"
    submissions_response = authenticated_client.get(submissions_url)
    assert submissions_response.is_success

    submissions = submissions_response.json()
    assert len(submissions) > 0



# def test_admin_can_override_assignment(authenticated_client: TestClient):
#     name = "Assignment 4"
#     assignment = create_assignment(authenticated_client, name)

#     assignment_id = assignment["id"]
#     submission_url = f"/api/submit/{assignment_id}"
#     submission_body = {"braille": ""}
#     submission_response = authenticated_client.post(
#         submission_url, json=submission_body
#     )
#     assert submission_response.is_success

#     get_grade_url = '/api/submission/'

#     override_grade_url = f"/api/submit/"
