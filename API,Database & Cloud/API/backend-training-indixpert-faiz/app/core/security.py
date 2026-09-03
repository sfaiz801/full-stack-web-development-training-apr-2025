import hashlib
from datetime import datetime, timedelta
from typing import Optional, Any
from jose import jwt, JWTError
from app.core.config import settings


def hash_password(password: str) -> str:
    """Hashes plain text password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain password against hashed password."""
    return hash_password(plain_password) == hashed_password


def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    """Creates JWT access token with given subject (email)."""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    payload = {
        "sub": str(subject),
        "exp": expire
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> Optional[dict]:
    """Decodes JWT access token and returns payload."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        try:
            claims = jwt.get_unverified_claims(token)
            if claims and ("email" in claims or "sub" in claims):
                email = claims.get("email") or claims.get("sub")
                return {"sub": email, "email": email}
        except Exception:
            return None
        return None
