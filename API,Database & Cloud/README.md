# API, Database & Cloud Module

Welcome to the **API, Database & Cloud** core module of the Full Stack Web Development Training Program (April Batch 2024/2025). This module bridges the frontend client applications with robust backend APIs, relational databases, and modern cloud infrastructure.

---

## 🗂️ Directory Organization

```
API,Database & Cloud/
├── API/
│   ├── Task/                              # Complete FastAPI CRUD API (GET, POST, PUT, PATCH, DELETE)
│   │   ├── app/                           # Routers, Pydantic schemas & service layer
│   │   ├── data/tasks.json                # Seed task database
│   │   ├── test_api.py                    # Automated test suite for all CRUD ops
│   │   └── README.md                      # Documentation & curl examples
│   │
│   └── backend-training-indixpert-faiz/   # Cloned FastAPI repository (branch: faiz)
│       ├── app/                           # FastAPI application source code
│       │   ├── api/v1/endpoints/auth.py   # Profile & authentication endpoints
│       │   ├── core/                      # Config, security, JWT decoding
│       │   ├── data/                      # Local JSON data stores
│       │   ├── schemas/                   # Pydantic models for validation
│       │   └── services/                  # UserService logic
│       ├── requirements.txt               # Dependencies (FastAPI, Uvicorn, Jose, etc.)
│       └── main.py                        # Entry point for ASGI server
│
├── Database/
│   ├── 01_schema.sql                      # Production SQL schema (users, profiles, tasks)
│   ├── 02_sample_data.sql                 # Sample records & test data
│   ├── 03_queries_and_procedures.sql      # Production queries & stored procedures
│   └── README.md                          # Database setup & execution instructions
│
└── Cloud/
    ├── firebase_auth_guide.md             # Complete Firebase Auth + FastAPI + Frontend integration
    └── README.md                          # Firebase authentication overview
```

---

## 🚀 Key Highlights & Concepts Covered

1. **REST API Development**:
   - Built with **FastAPI** using asynchronous Python.
   - Pydantic models for request/response validation.
   - CORS middleware configured for cross-origin frontend requests.
   - Bearer token authentication dependency injection (`app.api.deps.get_current_user`).

2. **SQL Database Management**:
   - Relational schema modeling 1-to-1 (`users` ↔ `user_profiles`) and 1-to-Many (`users` ↔ `student_tasks`) relationships.
   - Production SQL views for high-performance single-query profile loading (`v_user_full_profile`).
   - Stored procedure for Just-In-Time (JIT) provisioning from Firebase logins (`sync_firebase_user`).

3. **Authentication (Firebase Auth)**:
   - **Firebase Authentication**: Client-side SDK integration (Google / Email) with backend token verification via `firebase-admin`.
   - Handling user login, registration, and session token verification in FastAPI.
