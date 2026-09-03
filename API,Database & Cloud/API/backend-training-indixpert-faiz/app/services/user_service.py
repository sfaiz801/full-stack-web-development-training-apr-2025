import json
import os
from typing import List, Optional, Dict, Any
from app.core.config import settings


class UserService:
    @staticmethod
    def _ensure_file_exists() -> None:
        os.makedirs(os.path.dirname(settings.USERS_FILE), exist_ok=True)
        if not os.path.exists(settings.USERS_FILE):
            with open(settings.USERS_FILE, "w", encoding="utf-8") as f:
                json.dump([], f)

    @classmethod
    def load_users(cls) -> List[Dict[str, Any]]:
        cls._ensure_file_exists()
        try:
            with open(settings.USERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    @classmethod
    def save_users(cls, users_list: List[Dict[str, Any]]) -> None:
        cls._ensure_file_exists()
        with open(settings.USERS_FILE, "w", encoding="utf-8") as f:
            json.dump(users_list, f, indent=4)

    @classmethod
    def find_by_email(cls, email: str) -> Optional[Dict[str, Any]]:
        users = cls.load_users()
        for user in users:
            if user.get("email") == email:
                return user
        return None

    @classmethod
    def find_by_mobile(cls, mobile: str) -> Optional[Dict[str, Any]]:
        users = cls.load_users()
        for user in users:
            if user.get("mobile") == mobile:
                return user
        return None

    @classmethod
    def create_user(cls, user_dict: Dict[str, Any]) -> Dict[str, Any]:
        users = cls.load_users()
        users.append(user_dict)
        cls.save_users(users)
        return user_dict

    @classmethod
    def format_user_profile(cls, current_user: Dict[str, Any]) -> Dict[str, str]:
        return {
            "full_name": current_user.get("full_name", "Client User"),
            "email": current_user.get("email", "")
        }
