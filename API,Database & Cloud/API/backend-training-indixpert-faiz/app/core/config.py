import os
from typing import List
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "Backend Task API")
    API_V1_STR: str = os.getenv("API_V1_STR", "")
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-this")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    
    # CORS Origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    
    # Data File Paths
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    USERS_FILE: str = os.path.join(BASE_DIR, "data", "users.json")
    TASK_STUDENTS_FILE: str = os.path.join(BASE_DIR, "data", "task_students.json")
    STUDENTS_FILE: str = os.path.join(BASE_DIR, "data", "students.json")

settings = Settings()
