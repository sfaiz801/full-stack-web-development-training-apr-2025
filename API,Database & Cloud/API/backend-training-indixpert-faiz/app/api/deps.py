from fastapi import Depends, HTTPException, Header, status
from app.core.security import decode_access_token
from app.services.user_service import UserService


def get_current_user(authorization: str = Header(...)) -> dict:
    """Dependency to extract and verify JWT Bearer token from Header."""
    try:
        parts = authorization.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid auth scheme"
            )

        token = parts[1]
        payload = decode_access_token(token)
        if not payload or "sub" not in payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )

        email = payload.get("sub") or payload.get("email")
        user = UserService.find_by_email(email)
        if not user:
            user = {
                "full_name": email.split("@")[0].replace(".", " ").title(),
                "email": email
            }

        return user
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
