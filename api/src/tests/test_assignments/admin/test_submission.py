from src.tests.conftest import create_assignment
from fastapi.testclient import TestClient


def test_admin_can_get_grade(authenticated_client: TestClient):
    name = "Assignment 4"
    assignment = create_assignment(authenticated_client, name)

    assignment_id = assignment["id"]
    __submit_assignment(authenticated_client, assignment_id)

    submissions_response = __get_assignment_submisisons(
        authenticated_client, assignment_id
    )

    assert len(submissions_response.json()) == 1
    assert submissions_response.json()[0]["assignment_id"] == assignment_id
    assert submissions_response.json()[0]["submitted_date"] is not None


def test_admin_can_update_submissions(authenticated_client: TestClient):
    name = "Assignment 4"
    assignment = create_assignment(authenticated_client, name)
    assignment_id = assignment["id"]
    __submit_assignment(authenticated_client, assignment_id)

    override_url = f"/api/submissions/{assignment_id}/grade"
    override_grade = 50.0
    body = {"grade": override_grade}
    override_response = authenticated_client.put(override_url, json=body)
    assert override_response.is_success
    submissions_response = __get_assignment_submisisons(
        authenticated_client, assignment_id
    )
    assert submissions_response.json()[0]['grade'] == override_grade
    


def __submit_assignment(authenticated_client: TestClient, assignment_id: str):
    submission_url = f"/api/submissions/{assignment_id}"
    submission_body = {"braille": ""}
    submission_response = authenticated_client.post(
        submission_url, json=submission_body
    )
    assert submission_response.is_success


def __get_assignment_submisisons(authenticated_client: TestClient, assignment_id: str):
    get_submissions_url = f"/api/submissions/{assignment_id}/all"
    submissions_response = authenticated_client.get(get_submissions_url)
    assert submissions_response.is_success
    return submissions_response
