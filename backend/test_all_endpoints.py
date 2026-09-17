import requests
import time
import json

BASE = "http://localhost:8000/api/v1"
PASS = True

ts = int(time.time())
email = f"test{ts}@example.com"
headers = {}

def ok(label, resp, expected=200):
    global PASS
    status = "PASS" if resp.status_code == expected else "FAIL"
    if resp.status_code != expected:
        PASS = False
    print(f"{status} [{resp.status_code}] {label}")
    if resp.status_code not in [200, 201, 204]:
        try:
            print(f"    {resp.json()}")
        except:
            print(f"    {resp.text[:200]}")
    return resp

# --- AUTH ---
print("\n=== AUTH ===")
r = ok("POST /auth/register", requests.post(f"{BASE}/auth/register", json={
    "full_name": "Test User", "email": email, "password": "Password123!", "role": "JOB_SEEKER"
}))
token = r.json().get("access_token", "")
headers = {"Authorization": f"Bearer {token}"}

r = ok("POST /auth/login", requests.post(f"{BASE}/auth/login", data={"username": email, "password": "Password123!"}))
token = r.json().get("access_token", token)
headers = {"Authorization": f"Bearer {token}"}

ok("GET /auth/me", requests.get(f"{BASE}/auth/me", headers=headers))

# --- USERS ---
print("\n=== USERS ===")
ok("GET /users/me", requests.get(f"{BASE}/users/me", headers=headers))
ok("PUT /users/me", requests.put(f"{BASE}/users/me", headers=headers, json={"bio": "Hello!"}))
ok("PUT /users/me/appearance", requests.put(f"{BASE}/users/me/appearance", headers=headers, json={"theme": "dark"}))

# --- RECRUITER ACCOUNT ---
print("\n=== RECRUITER ===")
rec_email = f"recruiter{ts}@example.com"
r = ok("POST /auth/register (recruiter)", requests.post(f"{BASE}/auth/register", json={
    "full_name": "Recruiter User", "email": rec_email, "password": "Password123!", "role": "RECRUITER"
}))
rec_token = r.json().get("access_token", "")
rec_headers = {"Authorization": f"Bearer {rec_token}"}

# --- JOBS ---
print("\n=== JOBS ===")
ok("GET /jobs (public)", requests.get(f"{BASE}/jobs"))
r = ok("POST /jobs", requests.post(f"{BASE}/jobs", headers=rec_headers, json={
    "title": "Senior Dev", "company": "Acme", "location": "Remote",
    "description": "Build great things", "requirements": ["Python", "FastAPI"],
    "salary_range": "$80k-$120k", "job_type": "full-time"
}))
if r.status_code == 200:
    job_id = r.json().get("id")
    ok(f"GET /jobs/{job_id}", requests.get(f"{BASE}/jobs/{job_id}"))
    ok(f"PATCH /jobs/{job_id}", requests.patch(f"{BASE}/jobs/{job_id}", headers=rec_headers, json={"status": "closed"}))
    ok(f"GET /jobs/{job_id}/match", requests.get(f"{BASE}/jobs/{job_id}/match?resume_id=fakeid", headers=headers))

# --- RESUMES ---
print("\n=== RESUMES ===")
ok("GET /resumes", requests.get(f"{BASE}/resumes", headers=headers))

# Upload a fake text resume
import io
fake_file = io.BytesIO(b"John Doe - Software Engineer\nSkills: Python, React")
fake_file.name = "resume.txt"
r = ok("POST /resumes/upload", requests.post(
    f"{BASE}/resumes/upload", headers=headers,
    files={"file": ("resume.txt", fake_file, "text/plain")}
))
if r.status_code == 200:
    resume_id = r.json().get("id")
    ok(f"GET /resumes/{resume_id}", requests.get(f"{BASE}/resumes/{resume_id}", headers=headers))
    ok(f"GET /resumes/{resume_id}/analysis", requests.get(f"{BASE}/resumes/{resume_id}/analysis", headers=headers))
    ok(f"GET /resumes/{resume_id}/skill-gaps", requests.get(f"{BASE}/resumes/{resume_id}/skill-gaps", headers=headers))
    ok(f"GET /resumes/{resume_id}/recommendations", requests.get(f"{BASE}/resumes/{resume_id}/recommendations", headers=headers))

# --- APPLICATIONS ---
print("\n=== APPLICATIONS ===")
ok("GET /applications (seeker)", requests.get(f"{BASE}/applications", headers=headers))
ok("GET /applications/recruiter", requests.get(f"{BASE}/applications/recruiter", headers=rec_headers))

# Create a job via recruiter to apply to
r2 = requests.post(f"{BASE}/jobs", headers=rec_headers, json={
    "title": "Apply Test", "company": "TestCo", "location": "NYC",
    "description": "Test job", "requirements": ["Go"], "job_type": "part-time"
})
if r2.status_code == 200 and 'resume_id' in locals():
    apply_job_id = r2.json().get("id")
    r = ok("POST /applications", requests.post(f"{BASE}/applications", headers=headers, json={
        "job_id": apply_job_id, "resume_id": resume_id, "cover_letter": "I am interested."
    }))
    if r.status_code == 200:
        app_id = r.json().get("id")
        ok(f"GET /applications/{app_id}", requests.get(f"{BASE}/applications/{app_id}", headers=headers))
        ok(f"PUT /applications/{app_id}/status", requests.put(f"{BASE}/applications/{app_id}/status", headers=rec_headers, json={"status": "reviewing"}))
        ok(f"POST /applications/{app_id}/withdraw", requests.post(f"{BASE}/applications/{app_id}/withdraw", headers=headers))

print(f"\n{'ALL TESTS PASSED!' if PASS else 'SOME TESTS FAILED -- see above.'}")
