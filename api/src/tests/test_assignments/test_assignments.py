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
    assignment_text = "translate this"
    assignment_submisison = {"brail": "⠞⠗⠁⠝⠎⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = "/api/assignments/submit/0"
    client = TestClient(app)
    response = client.post(url, json=assignment_submisison)
    assert response.is_success

    expected = {"correctly_translated": True}
    assert response.json() == expected


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