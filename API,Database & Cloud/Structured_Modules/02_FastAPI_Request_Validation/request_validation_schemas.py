"""
request_validation_schemas.py
-----------------------------
Demonstrates FastAPI request validation with Pydantic v2:
- Field constraints: min_length, max_length, ge, le, pattern regex
- Custom business validators using @field_validator
- Automatic HTTP 422 Unprocessable Entity handling
"""

from fastapi import FastAPI, status
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
import re

app = FastAPI(title="Pydantic Validation Demo")

class StudentRegistration(BaseModel):
    name: str = Field(..., min_length=3, max_length=50, description="Full student name")
    email: EmailStr = Field(..., description="Valid institutional or personal email")
    age: int = Field(..., ge=18, le=60, description="Student must be between 18 and 60")
    phone_number: str = Field(..., pattern=r"^\+?[0-9]{10,13}$", description="E.164 phone format")
    preferred_course: str = Field(..., description="Full Stack, Backend, or Frontend")

    @field_validator("preferred_course")
    @classmethod
    def validate_course(cls, value: str) -> str:
        allowed = ["Full Stack Web Development", "Backend Engineering", "Frontend Engineering"]
        if value not in allowed:
            raise ValueError(f"Course must be one of {allowed}")
        return value

@app.post("/register", status_code=status.HTTP_201_CREATED)
def register_student(student: StudentRegistration):
    return {
        "success": True,
        "message": f"Student '{student.name}' successfully validated and enrolled!",
        "data": student.model_dump()
    }

def run_tests():
    client = TestClient(app)

    print("--- 1. Testing Valid Registration Payload ---")
    valid_data = {
        "name": "Mohammad Faiz",
        "email": "faiz@example.com",
        "age": 22,
        "phone_number": "+919876543210",
        "preferred_course": "Full Stack Web Development"
    }
    res = client.post("/register", json=valid_data)
    print(f"Status: {res.status_code} (201 Created)")
    print(f"Response: {res.json()['message']}")

    print("\n--- 2. Testing Invalid Payload (Age < 18, Bad Course) ---")
    invalid_data = {
        "name": "Al",                       # Too short (min 3)
        "email": "not-an-email",            # Invalid email format
        "age": 15,                          # Underage (ge 18)
        "phone_number": "123",              # Too short for phone
        "preferred_course": "Astronautics"  # Not in allowed list
    }
    res = client.post("/register", json=invalid_data)
    print(f"Status: {res.status_code} (Expected 422 Unprocessable Entity)")
    errors = res.json().get("detail", [])
    print(f"Validation caught {len(errors)} field violations cleanly!")
    for err in errors:
        print(f"  * Field: {'.'.join(str(loc) for loc in err['loc'])} -> {err['msg']}")

if __name__ == "__main__":
    run_tests()
