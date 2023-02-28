from fastapi.testclient import TestClient


def test_can_get_first_assignment(authenticated_client: TestClient):
    url = "/api/assignments/details/0"
    response = authenticated_client.get(url)
    assert response.is_success


    assert response.json()["id"] == 0
    assert response.json()["name"] == "Assignment 1"
    assert response.json()["text"] == "translate this"

def test_can_translate_submitted_assignment(authenticated_client: TestClient):
    response = correctly_submit_assignment(authenticated_client)

    expected = {"correctly_translated": True}
    assert response.json() == expected


def correctly_submit_assignment(authenticated_client: TestClient):
    assignment_text = "translate this"
    assignment_submisison = {"braille": "⠞⠗⠁⠝⠎⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = "/api/assignments/submit/0"
    response = authenticated_client.post(url, json=assignment_submisison)
    assert response.is_success
    return response


def test_incorrect_brail_is_marked_incorrect(authenticated_client: TestClient):
    incorrect_submisison = {"braille": "⠞⠗⠁⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = "/api/assignments/submit/0"

    response = authenticated_client.post(url, json=incorrect_submisison)
    assert response.is_success

    expected = {"correctly_translated": False, "actual_translation": "tralate this"}
    assert response.json() == expected


def test_can_get_assignment_list(authenticated_client: TestClient):
    url = "/api/assignments/all"

    response = authenticated_client.get(url)
    assert response.is_success

    assert response.json()[0]["id"] == 0
    assert response.json()[0]["name"] == "Assignment 1"
    assert response.json()[0]["text"] == "translate this"


def test_can_view_assignment_grade(authenticated_client: TestClient):
    authenticated_client.delete("/api/assignments/grades/all")
    url = "/api/assignments/grades/0"
    response = authenticated_client.get(url)
    assert response.is_success

    expected = {"grade": None}
    assert response.json() == expected


def test_submitted_assignments_have_grades(authenticated_client: TestClient):
    correctly_submit_assignment(authenticated_client)

    url = "/api/assignments/grades/0"
    response = authenticated_client.get(url)
    assert response.is_success

    expected = {"grade": 100.0}
    assert response.json() == expected
