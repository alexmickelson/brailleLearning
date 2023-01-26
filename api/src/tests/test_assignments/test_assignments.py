from fastapi.testclient import TestClient
from src.main import app


def test_can_get_first_assignment():
    client = TestClient(app)
    url = "/api/assignments/details/0"
    response = client.get(url)
    assert response.is_success

    expected_assignment = {"id": 0, "name": "Assignment 1", "text": "translate this"}
    assert response.json() == expected_assignment


def test_can_translate_submitted_assignment():
    client = TestClient(app)
    response = correctly_submit_assignment(client)

    expected = {"correctly_translated": True}
    assert response.json() == expected


def correctly_submit_assignment(client: TestClient):
    assignment_text = "translate this"
    assignment_submisison = {"brail": "⠞⠗⠁⠝⠎⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = "/api/assignments/submit/0"
    response = client.post(url, json=assignment_submisison)
    assert response.is_success
    return response


def test_incorrect_brail_is_marked_incorrect():
    incorrect_submisison = {"brail": "⠞⠗⠁⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = "/api/assignments/submit/0"
    client = TestClient(app)
    response = client.post(url, json=incorrect_submisison)
    assert response.is_success

    expected = {"correctly_translated": False, "actual_translation": "tralate this"}
    assert response.json() == expected


def test_can_get_assignment_list():
    url = "/api/assignments/all"
    client = TestClient(app)

    response = client.get(url)
    assert response.is_success

    expected = [{"id": 0, "name": "Assignment 1", "text": "translate this"}]
    assert response.json() == expected


def test_can_view_assignment_grade():
    client = TestClient(app)
    client.delete('/api/assignments/grades/all')
    url = "/api/assignments/grades/0"
    response = client.get(url)
    assert response.is_success

    expected = {"grade": None}
    assert response.json() == expected


def test_submitted_assignments_have_grades():
    client = TestClient(app)
    correctly_submit_assignment(client)

    url = "/api/assignments/grades/0"
    response = client.get(url)
    assert response.is_success

    expected = {"grade": 100.0}
    assert response.json() == expected
