

from fastapi.testclient import TestClient

from src.tests.conftest import create_assignment


def test_can_get_assignment_list(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)

    url = "/api/assignments/uncompleted"
    response = authenticated_client.get(url)
    assert response.is_success

    incomplete_assignments = response.json()
    created_assignment = [a for a in incomplete_assignments if a["id"] == assignment["id"]][0]

    print(created_assignment)
    assert created_assignment["id"] == assignment["id"]
    assert created_assignment["name"] == assignment["name"]
    assert created_assignment["stages"] == []

def test_can_view_submissions(authenticated_client: TestClient):
    authenticated_client.delete("/api/assignments/grades/all")
    assignment = create_assignment(authenticated_client)
    url = f"/api/submissions/{assignment['id']}"
    
    response = authenticated_client.get(url)
    assert response.is_success

    print(response.json() )
    assert response.json() == []