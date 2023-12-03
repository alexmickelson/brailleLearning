from fastapi.testclient import TestClient

from src.tests.conftest import create_assignment


def correctly_submit_assignment(authenticated_client: TestClient):
    assignment_text = "translate this"
    assignment = create_assignment(authenticated_client, translate_text=assignment_text)

    assignment_submisison = {"braille": "⠞⠗⠁⠝⠎⠇⠁⠞⠑⠀⠞⠓⠊⠎"}
    url = f"/api/submissions/{assignment['id']}"
    response = authenticated_client.post(url, json=assignment_submisison)
    assert response.is_success
    return response
