from fastapi.testclient import TestClient

from src.tests.conftest import create_assignment


# def test_can_translate_submitted_assignment(authenticated_client: TestClient):
#     response = correctly_submit_assignment(authenticated_client)

#     expected = {"correctly_translated": True}
#     assert response.json() == expected


# def test_incorrect_brail_is_marked_incorrect(authenticated_client: TestClient):
#     assignment = create_assignment(authenticated_client)
#     incorrect_submisison = {"braille": "⠞⠗⠁⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
#     url = f"/api/submissions/{assignment['id']}"

#     response = authenticated_client.post(url, json=incorrect_submisison)
#     assert response.is_success

#     expected = {"correctly_translated": False, "actual_translation": "tralate this"}
#     assert response.json() == expected





# def test_submitted_assignments_have_grades(authenticated_client: TestClient):
#     correctly_submit_assignment(authenticated_client)
#     assignment = create_assignment(
#         authenticated_client, translate_text="translate this"
#     )

#     assignment_submisison = {"braille": "⠞⠗⠁⠝⠎⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
#     submit_url = f"/api/submissions/{assignment['id']}"
#     response = authenticated_client.post(submit_url, json=assignment_submisison)
#     assert response.is_success
#     assert response.json()["correctly_translated"]

#     url = f"/api/assignments/grades/{assignment['id']}"
#     response = authenticated_client.get(url)
#     assert response.is_success

#     expected = {"grade": 100.0}
#     assert response.json() == expected
