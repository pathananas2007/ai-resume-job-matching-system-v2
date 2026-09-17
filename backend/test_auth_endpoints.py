import requests
import json
import time

BASE_URL = "http://localhost:8000/api/v1/auth"
test_user = {
    "full_name": f"Test User {int(time.time())}",
    "email": f"test{int(time.time())}@example.com",
    "password": "Password123!",
    "role": "JOB_SEEKER"
}

def test_register():
    print(f"Testing /register for {test_user['email']}...")
    resp = requests.post(f"{BASE_URL}/register", json=test_user)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}\n")
    return resp.status_code == 200

def test_login():
    print(f"Testing /login for {test_user['email']}...")
    data = {
        "username": test_user['email'],
        "password": test_user['password']
    }
    resp = requests.post(f"{BASE_URL}/login", data=data)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}\n")
    
    if resp.status_code == 200:
        token = resp.json().get("access_token")
        print(f"Testing /me with token...")
        headers = {"Authorization": f"Bearer {token}"}
        me_resp = requests.get(f"{BASE_URL}/me", headers=headers)
        print(f"Status: {me_resp.status_code}")
        print(f"Response: {me_resp.text}\n")
        
    return resp.status_code == 200

if __name__ == "__main__":
    if test_register():
        test_login()
    else:
        print("Registration failed, skipping login.")
