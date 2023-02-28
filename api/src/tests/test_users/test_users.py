import random
import string
from fastapi.testclient import TestClient


def test_can_create_admin(authenticated_client: TestClient):
    salt = random.choice(string.ascii_letters)
    email = salt + "@alexmickelson.guru"
    url = "/api/admin/users/"
    body = {"email": email}

    create_response = authenticated_client.post(url, json=body)
    assert create_response.is_success

    admins_response = authenticated_client.get(url)
    assert admins_response.is_success

    new_admin = [a for a in admins_response.json() if a["email"] == email]

    assert len(new_admin) > 0
