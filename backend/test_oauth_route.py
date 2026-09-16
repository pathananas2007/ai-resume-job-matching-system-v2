#!/usr/bin/env python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
# Test if Google OAuth authorize endpoint is accessible
response = client.get("/api/v1/auth/oauth/google/authorize")
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
