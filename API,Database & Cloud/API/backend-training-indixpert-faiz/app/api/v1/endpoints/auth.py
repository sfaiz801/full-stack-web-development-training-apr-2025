from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.auth import UserProfile
from app.api.deps import get_current_user
from app.services.user_service import UserService

router = APIRouter()

# Note: Signup & Login endpoints are managed on the frontend via Firebase Auth SDK.
# We keep the /profile endpoint below active for fetching backend profile data.

@router.get("/profile", response_model=UserProfile)
def get_profile(current_user: dict = Depends(get_current_user)):
    """Retrieves profile data for authenticated user (supports Firebase tokens)."""
    return UserService.format_user_profile(current_user)
