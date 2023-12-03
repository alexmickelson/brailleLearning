from src.models.user import UserProfile
from src.tests.conftest import admin_client, create_assignment
from fastapi.testclient import TestClient


admin_user = UserProfile(sub="test_admin_user", name="test_admin", is_admin=True)


def test_admin_can_get_grade(authenticated_client: TestClient):
    name = "Assignment 4"
    assignment = create_assignment(authenticated_client, name)

    assignment_id = assignment["id"]
    __submit_assignment(authenticated_client, assignment_id)

    submissions_response = __get_assignment_submisisons(
        authenticated_client, assignment_id
    )

    student_submissions = submissions_response.json()[0]["submissions"]
    assert len(student_submissions) == 1
    assert student_submissions[0]["assignment_id"] == assignment_id
    assert student_submissions[0]["submitted_date"] is not None


def test_admin_can_update_submissions(authenticated_client: TestClient):
    name = "Assignment 4"
    assignment = create_assignment(authenticated_client, name)
    assignment_id = assignment["id"]
    __submit_assignment(authenticated_client, assignment_id)
    student_submission = __get_first_submission(authenticated_client, assignment_id)

    override_url = f"/api/submissions/{student_submission["id"]}/grade"
    override_grade = 50.0
    body = {"grade": override_grade}

    with admin_client(admin_user):
        override_response = authenticated_client.put(override_url, json=body)
    assert override_response.is_success

    student_submission = __get_first_submission(authenticated_client, assignment_id)
    assert student_submission["grade"] == override_grade


def __submit_assignment(authenticated_client: TestClient, assignment_id: str):
    submission_url = f"/api/submissions/{assignment_id}"
    submission_body = {"submission_string": "", "seconds_to_complete": 23.5}
    submission_response = authenticated_client.post(
        submission_url, json=submission_body
    )
    assert submission_response.is_success


def __get_assignment_submisisons(authenticated_client: TestClient, assignment_id: str):
    get_submissions_url = f"/api/submissions/admin/{assignment_id}/all"

    with admin_client(admin_user):
        submissions_response = authenticated_client.get(get_submissions_url)
    assert submissions_response.is_success
    return submissions_response


def __get_first_submission(authenticated_client, assignment_id):
    submissions_response = __get_assignment_submisisons(
        authenticated_client, assignment_id
    )
    student_submissions = submissions_response.json()[0]["submissions"]
    return student_submissions[0]
