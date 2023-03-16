from fastapi.testclient import TestClient

from src.tests.conftest import create_assignment


def test_can_translate_submitted_assignment(authenticated_client: TestClient):
    response = correctly_submit_assignment(authenticated_client)

    expected = {"correctly_translated": True}
    assert response.json() == expected


def correctly_submit_assignment(authenticated_client: TestClient):
    assignment_text = "translate this"
    assignment = create_assignment(authenticated_client, translate_text=assignment_text)

    assignment_submisison = {"braille": "⠞⠗⠁⠝⠎⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = f"/api/assignments/submit/{assignment['id']}"
    response = authenticated_client.post(url, json=assignment_submisison)
    assert response.is_success
    return response


def test_incorrect_brail_is_marked_incorrect(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)
    incorrect_submisison = {"braille": "⠞⠗⠁⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = f"/api/assignments/submit/{assignment['id']}"

    response = authenticated_client.post(url, json=incorrect_submisison)
    assert response.is_success

    expected = {"correctly_translated": False, "actual_translation": "tralate this"}
    assert response.json() == expected


def test_can_get_assignment_list(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)

    url = "/api/assignments/all"
    response = authenticated_client.get(url)
    assert response.is_success

    all_assignments = response.json()
    created_assignment = [a for a in all_assignments if a["id"] == assignment["id"]][0]

    assert created_assignment["id"] == assignment["id"]
    assert created_assignment["name"] == assignment["name"]
    assert created_assignment["text"] == assignment["text"]


def test_can_view_assignment_grade(authenticated_client: TestClient):
    authenticated_client.delete("/api/assignments/grades/all")
    assignment = create_assignment(authenticated_client)
    url = f"/api/assignments/grades/{assignment['id']}"
    response = authenticated_client.get(url)
    assert response.is_success

    expected = {"grade": None}
    assert response.json() == expected


def test_submitted_assignments_have_grades(authenticated_client: TestClient):
    correctly_submit_assignment(authenticated_client)
    assignment = create_assignment(
        authenticated_client, translate_text="translate this"
    )

    assignment_submisison = {"braille": "⠞⠗⠁⠝⠎⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    submit_url = f"/api/assignments/submit/{assignment['id']}"
    response = authenticated_client.post(submit_url, json=assignment_submisison)
    assert response.is_success
    assert response.json()["correctly_translated"]

    url = f"/api/assignments/grades/{assignment['id']}"
    response = authenticated_client.get(url)
    assert response.is_success

    expected = {"grade": 100.0}
    assert response.json() == expected
