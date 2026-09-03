# API, Database & Cloud Module

Welcome to the **API, Database & Cloud** core module of the Full Stack Web Development Training Program (April Batch 2024/2025). This module bridges the frontend client applications with robust backend APIs, relational databases, and modern cloud infrastructure.

---

## 🌟 Structured Student Learning Curriculum: [`Structured_Modules/`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules)

| Module | Directory | Topics Covered | Key Script |
|--------|-----------|----------------|------------|
| **01** | [`01_API_Fundamentals_and_HTTP`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/01_API_Fundamentals_and_HTTP) | HTTP verbs (GET, POST, PUT, PATCH, DELETE), status codes (200, 201, 204, 404, 422), RESTful architecture | [`http_methods_and_status_codes.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/01_API_Fundamentals_and_HTTP/http_methods_and_status_codes.py) |
| **02** | [`02_FastAPI_Request_Validation`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/02_FastAPI_Request_Validation) | Pydantic v2 schemas, `Field` bounds, custom `@field_validator`, HTTP 422 validation error handling | [`request_validation_schemas.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/02_FastAPI_Request_Validation/request_validation_schemas.py) |
| **03** | [`03_Authentication_and_Security`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/03_Authentication_and_Security) | Password hashing, JWT token generation & verification, OAuth2 Bearer dependencies, RBAC, Firebase Auth | [`jwt_and_firebase_security.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/03_Authentication_and_Security/jwt_and_firebase_security.py) |
| **04** | [`04_CRUD_Operations_and_Routers`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/04_CRUD_Operations_and_Routers) | Modular `APIRouter`, full CRUD (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), `response_model`, query filters | [`crud_task_router.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/04_CRUD_Operations_and_Routers/crud_task_router.py) |
| **05** | [`05_Database_SQL_and_Modeling`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/05_Database_SQL_and_Modeling) | Relational database modeling, SQLAlchemy ORM (1:1 and 1:N), foreign keys, session transactions, joins | [`relational_data_models.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/05_Database_SQL_and_Modeling/relational_data_models.py) |
| **06** | [`06_Cloud_Config_Security_and_Monitoring`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/06_Cloud_Config_Security_and_Monitoring) | 12-factor `.env` config, CORS middleware, Cloud `/health` probe for ALB/K8s, latency timing header (`X-Process-Time`) | [`production_app_management.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/06_Cloud_Config_Security_and_Monitoring/production_app_management.py) |

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
