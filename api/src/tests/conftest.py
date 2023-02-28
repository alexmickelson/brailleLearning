import pytest
from fastapi.testclient import TestClient
from src.main import app
from src.services.oauth_service import authenticate_user


@pytest.fixture()
def authenticated_client():
    app.dependency_overrides[authenticate_user] = lambda: {}
    client = TestClient(app)
    yield client
    app.dependency_overrides[authenticate_user] = authenticate_user
