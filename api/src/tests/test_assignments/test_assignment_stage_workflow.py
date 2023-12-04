from pprint import pprint
from typing import Dict
from fastapi.testclient import TestClient
from src.models.user import UserProfile
from src.tests.conftest import admin_client, create_assignment

admin_user = UserProfile(sub="test_admin_user", name="test_admin", is_admin=True)


def test_can_create_stage(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)
    assignment_id = assignment["id"]

    __create_new_stage(authenticated_client, assignment_id)
    assignment_with_empty_stage = __get_assignment_as_admin(
        authenticated_client, assignment_id
    )
    assert len(assignment_with_empty_stage["stages"]) == 1


def test_can_update_stage(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)
    assignment_id = assignment["id"]

    __create_new_stage(authenticated_client, assignment_id)
    assignment_with_empty_stage = __get_assignment_as_admin(
        authenticated_client, assignment_id
    )
    updated_stage = assignment_with_empty_stage["stages"][0]
    changed_assignment_with_stage = {
        **assignment_with_empty_stage,
        "stages": [
            {
                **updated_stage,
                "text": "this is text to translate",
                "type": "print_to_braille",
                "index": 0,
                "points": 8,
            }
        ],
    }
    __update_assignment(authenticated_client, changed_assignment_with_stage)
    assignment_with_populated_stage = __get_assignment_as_admin(
        authenticated_client, assignment_id
    )
    assert len(assignment_with_populated_stage["stages"]) == 1
    assert assignment_with_populated_stage["stages"][0]["text"] != ""
    assert assignment_with_populated_stage["stages"][0]["type"] == "print_to_braille"
    assert assignment_with_populated_stage["stages"][0]["index"] == 0
    assert assignment_with_populated_stage["stages"][0]["points"] == 8

def test_can_remove_stage(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)
    assignment_id = assignment["id"]

    __create_new_stage(authenticated_client, assignment_id)
    assignment_with_empty_stage = __get_assignment_as_admin(
        authenticated_client, assignment_id
    )
    assignment_without_stages = {
        **assignment_with_empty_stage,
        "stages": [],
    }
    __update_assignment(authenticated_client, assignment_without_stages)
    actual_assignment = __get_assignment_as_admin(
        authenticated_client, assignment_id
    )
    assert len(actual_assignment["stages"]) == 0

def test_stages_are_in_order(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)
    assignment_id = assignment["id"]

    __create_new_stage(authenticated_client, assignment_id)
    __create_new_stage(authenticated_client, assignment_id)
    actual_assignment = __get_assignment_as_admin(
        authenticated_client, assignment_id
    )
    stages = actual_assignment["stages"]
    pprint(stages)
    assert len(stages) == 2
    assert stages[0]['index'] == 0
    assert stages[1]['index'] == 1
    

def __update_assignment(authenticated_client: TestClient, assignment: Dict):
    url = f"/api/admin/assignments/{assignment['id']}"
    with admin_client(admin_user):
        response = authenticated_client.put(url, json=assignment)
    assert response.is_success


def __create_new_stage(authenticated_client: TestClient, assignment_id: str):
    url = f"/api/admin/assignments/{assignment_id}/stage"
    with admin_client(admin_user):
        response = authenticated_client.post(url)
    assert response.is_success


def __get_assignment_as_admin(authenticated_client: TestClient, assignment_id: str):
    assignments_url = "/api/admin/assignments/all"
    with admin_client(admin_user):
        assignments_response = authenticated_client.get(assignments_url)
    assert assignments_response.is_success

    assignments = assignments_response.json()

    assert assignment_id in [a["id"] for a in assignments]

    return [a for a in assignments if a["id"] == assignment_id][0]
