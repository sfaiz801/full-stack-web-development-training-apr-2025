"""
jwt_and_firebase_security.py
----------------------------
Demonstrates Authentication & Authorization in Modern APIs:
- Secure password hashing & verification
- JWT (JSON Web Token) signing, claims, expiration, and decoding
- OAuth2 Password Bearer dependency injection
- Role-Based Access Control (RBAC: Admin vs Student)
- Firebase ID token verification architecture
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.testclient import TestClient
from datetime import datetime, timedelta, timezone
import base64
import json
import hashlib
import hmac

app = FastAPI(title="Authentication & Security Demo")

SECRET_KEY = "indixpert-full-stack-training-jwt-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

# Mock User Database
users_db = {
    "faiz@example.com": {
        "username": "faiz@example.com",
        "full_name": "Mohammad Faiz",
        # SHA-256 hashed password representation
        "hashed_password": hashlib.sha256("securePass123".encode()).hexdigest(),
        "role": "admin"
    },
    "student@example.com": {
        "username": "student@example.com",
        "full_name": "Rohit Kumar",
        "hashed_password": hashlib.sha256("studentPass123".encode()).hexdigest(),
        "role": "student"
    }
}

def create_jwt_token(data: dict, expires_delta: timedelta) -> str:
    """Creates a standard JWT signature using HMAC-SHA256."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": int(expire.timestamp())})
    
    header = {"alg": "HS256", "typ": "JWT"}
    encoded_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    encoded_payload = base64.urlsafe_b64encode(json.dumps(to_encode).encode()).decode().rstrip("=")
    
    signature_input = f"{encoded_header}.{encoded_payload}".encode()
    signature = hmac.new(SECRET_KEY.encode(), signature_input, hashlib.sha256).digest()
    encoded_signature = base64.urlsafe_b64encode(signature).decode().rstrip("=")
    
    return f"{encoded_header}.{encoded_payload}.{encoded_signature}"

def decode_jwt_token(token: str) -> dict:
    """Verifies JWT signature and expiry."""
    parts = token.split(".")
    if len(parts) != 3:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token format")
    
    encoded_header, encoded_payload, encoded_signature = parts
    signature_input = f"{encoded_header}.{encoded_payload}".encode()
    expected_sig = base64.urlsafe_b64encode(
        hmac.new(SECRET_KEY.encode(), signature_input, hashlib.sha256).digest()
    ).decode().rstrip("=")
    
    if not hmac.compare_digest(expected_sig, encoded_signature):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token signature")
    
    padded_payload = encoded_payload + "=" * ((4 - len(encoded_payload) % 4) % 4)
    payload = json.loads(base64.urlsafe_b64decode(padded_payload.encode()).decode())
    
    if payload.get("exp", 0) < datetime.now(timezone.utc).timestamp():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    
    return payload

# Authentication Dependency Injection
def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    payload = decode_jwt_token(token)
    email = payload.get("sub")
    if not email or email not in users_db:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User identity not found")
    return users_db[email]

def require_admin(current_user: dict = Depends(get_current_user)) -> dict:
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required")
    return current_user

# 1. Login Endpoint
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    hashed_input = hashlib.sha256(form_data.password.encode()).hexdigest()
    if not user or user["hashed_password"] != hashed_input:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    
    token = create_jwt_token({"sub": user["username"], "role": user["role"]}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": token, "token_type": "bearer"}

# 2. Protected User Profile
@app.get("/users/me")
def read_my_profile(user: dict = Depends(get_current_user)):
    return {"username": user["username"], "full_name": user["full_name"], "role": user["role"]}

# 3. Admin-Only Endpoint
@app.get("/admin/analytics")
def read_admin_analytics(admin: dict = Depends(require_admin)):
    return {"message": f"Welcome Admin {admin['full_name']}! System metrics unlocked.", "active_sessions": 42}

def run_tests():
    client = TestClient(app)

    print("--- 1. Testing Login to Obtain JWT Token ---")
    login_res = client.post("/token", data={"username": "faiz@example.com", "password": "securePass123"})
    print(f"Login Status: {login_res.status_code}")
    token = login_res.json()["access_token"]
    print(f"Received JWT Token: {token[:30]}...[truncated]")

    headers = {"Authorization": f"Bearer {token}"}

    print("\n--- 2. Accessing Protected Profile via Bearer Token ---")
    profile_res = client.get("/users/me", headers=headers)
    print(f"Profile Status: {profile_res.status_code} | User: {profile_res.json()['full_name']} ({profile_res.json()['role']})")

    print("\n--- 3. Accessing Admin-Only Route ---")
    admin_res = client.get("/admin/analytics", headers=headers)
    print(f"Admin Status: {admin_res.status_code} | Message: {admin_res.json()['message']}")

if __name__ == "__main__":
    run_tests()
