"""
relational_data_models.py
-------------------------
Demonstrates Database Integration, SQL, Data Modeling & ORM:
- Relational Schema Design (1-to-1 and 1-to-Many foreign keys)
- SQLAlchemy ORM Declarative Models
- Database Session Lifecycle (commit, rollback, close)
- Joining tables and relational queries
"""

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime

# In-Memory SQLite engine for demonstration (portable & zero setup required)
DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 1. User Model (Parent)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(128), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(String(30), default="student")
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    profile = relationship("UserProfile", back_populates="user", uselist=False)
    tasks = relationship("StudentTask", back_populates="user", cascade="all, delete-orphan")

# 2. UserProfile Model (1-to-1 with User)
class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    phone_number = Column(String(20), nullable=True)
    bio = Column(String(500), nullable=True)

    user = relationship("User", back_populates="profile")

# 3. StudentTask Model (1-to-Many with User)
class StudentTask(Base):
    __tablename__ = "student_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    task_name = Column(String(150), nullable=False)
    score = Column(Float, default=0.0)
    is_submitted = Column(Integer, default=1)

    user = relationship("User", back_populates="tasks")

# Initialize Tables in SQLite Engine
Base.metadata.create_all(bind=engine)

def seed_and_query_database():
    session = SessionLocal()
    try:
        print("--- 1. Creating Relational User & Profile (1-to-1) ---")
        faiz = User(
            firebase_uid="firebase_auth_uid_101",
            email="faiz@indixpert.com",
            role="admin"
        )
        session.add(faiz)
        session.commit()
        session.refresh(faiz)

        faiz_profile = UserProfile(
            user_id=faiz.id,
            full_name="Mohammad Faiz",
            phone_number="+919876543210",
            bio="Full Stack Developer & Systems Engineer"
        )
        session.add(faiz_profile)

        print("\n--- 2. Creating Associated Student Tasks (1-to-Many) ---")
        task1 = StudentTask(user_id=faiz.id, task_name="FastAPI CRUD Task API", score=95.0)
        task2 = StudentTask(user_id=faiz.id, task_name="SQL Schema & Views", score=92.0)
        session.add_all([task1, task2])
        session.commit()

        print("\n--- 3. Querying Relational Data with Joins ---")
        queried_user = session.query(User).filter(User.email == "faiz@indixpert.com").first()
        print(f"User: {queried_user.email} (Role: {queried_user.role})")
        print(f"Profile Full Name: {queried_user.profile.full_name} | Bio: {queried_user.profile.bio}")
        print(f"Associated Tasks ({len(queried_user.tasks)} items):")
        for t in queried_user.tasks:
            print(f"  * Task #{t.id}: {t.task_name} -> Score: {t.score}%")

    except Exception as e:
        session.rollback()
        print(f"Database transaction error: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    seed_and_query_database()
