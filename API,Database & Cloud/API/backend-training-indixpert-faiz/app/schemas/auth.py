import phonenumbers
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional


class SignupSchema(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    mobile: str  # e.g., "+919876543210" or 10-digit number
    password: str = Field(..., min_length=6)

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, value: str) -> str:
        try:
            parsed = phonenumbers.parse(value, None)
            if not phonenumbers.is_valid_number(parsed):
                raise ValueError("Invalid mobile number")
        except phonenumbers.NumberParseException:
            raise ValueError(
                "Mobile number must include valid country code, e.g. +919876543210"
            )
        return value


class LoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserProfile(BaseModel):
    full_name: str
    email: EmailStr


class TokenResponse(BaseModel):
    message: str = "Login successful"
    access_token: str
    token_type: str = "bearer"
    user: UserProfile
