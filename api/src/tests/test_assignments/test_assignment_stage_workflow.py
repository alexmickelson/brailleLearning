from fastapi.testclient import TestClient
from src.models.user import UserProfile
from src.tests.conftest import admin_client, create_assignment

admin_user = UserProfile(sub="test_admin_user", name="test_admin", is_admin=True)

def test_can_create_stage(authenticated_client: TestClient):
    assignment = create_assignment(authenticated_client)

    url = f"/api/admin/assignments/{assignment['id']}/stage"
    with admin_client(admin_user):
        response = authenticated_client.post(url)

    