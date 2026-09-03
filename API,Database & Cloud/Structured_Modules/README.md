# ⚡ API, Database & Cloud: Student Learning Journey

A comprehensive curriculum mapping each student's journey from API fundamentals, HTTP verbs, and REST architecture to FastAPI request validation, authentication (JWT & Firebase), CRUD operations, relational SQL data modeling, and production cloud management (environment config, CORS, health checks, latency monitoring, and security).

---

## 🗺️ Curriculum Architecture

```
API,Database & Cloud/Structured_Modules/
├── 01_API_Fundamentals_and_HTTP/                # HTTP methods (GET, POST, PUT, PATCH, DELETE), Status Codes, REST
├── 02_FastAPI_Request_Validation/               # Pydantic v2, Field constraints, custom @field_validator, HTTP 422
├── 03_Authentication_and_Security/              # Password hashing, JWT signing/decoding, OAuth2, RBAC, Firebase Auth
├── 04_CRUD_Operations_and_Routers/              # Modular APIRouter, response models, query filters, pagination
├── 05_Database_SQL_and_Modeling/                # SQLAlchemy ORM, 1:1 and 1:N relations, foreign keys, transactions
└── 06_Cloud_Config_Security_and_Monitoring/      # Pydantic-settings (.env), CORS, /health probes, timing middleware
```

---

## 📂 Detailed Module Index

| # | Module Folder | Key Concepts Covered | Executable Script |
|---|---------------|----------------------|-------------------|
| **01** | [`01_API_Fundamentals_and_HTTP`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/01_API_Fundamentals_and_HTTP) | HTTP methods (GET, POST, PUT, PATCH, DELETE), status codes (200, 201, 204, 404, 422), RESTful architecture | [`http_methods_and_status_codes.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/01_API_Fundamentals_and_HTTP/http_methods_and_status_codes.py) |
| **02** | [`02_FastAPI_Request_Validation`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/02_FastAPI_Request_Validation) | Pydantic v2 schemas, `Field` bounds (`min_length`, `ge`, `regex`), custom `@field_validator`, 422 handler | [`request_validation_schemas.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/02_FastAPI_Request_Validation/request_validation_schemas.py) |
| **03** | [`03_Authentication_and_Security`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/03_Authentication_and_Security) | Password hashing, JWT creation & verification, `Depends(oauth2_scheme)`, Role-Based Access (Admin/Student) | [`jwt_and_firebase_security.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/03_Authentication_and_Security/jwt_and_firebase_security.py) |
| **04** | [`04_CRUD_Operations_and_Routers`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/04_CRUD_Operations_and_Routers) | Modular `APIRouter`, full CRUD (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), `response_model`, filter queries | [`crud_task_router.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/04_CRUD_Operations_and_Routers/crud_task_router.py) |
| **05** | [`05_Database_SQL_and_Modeling`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/05_Database_SQL_and_Modeling) | Relational database modeling, SQLAlchemy ORM (1:1 and 1:N), foreign keys, session transactions, joins | [`relational_data_models.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/05_Database_SQL_and_Modeling/relational_data_models.py) |
| **06** | [`06_Cloud_Config_Security_and_Monitoring`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/06_Cloud_Config_Security_and_Monitoring) | 12-factor `.env` config, CORS middleware, Cloud `/health` probe for ALB/K8s, latency timing header (`X-Process-Time`) | [`production_app_management.py`](file:///d:/full-stack-web-development-training-apr-2024/API%2CDatabase%20&%20Cloud/Structured_Modules/06_Cloud_Config_Security_and_Monitoring/production_app_management.py) |

---

## ⚡ How to Run Any Module

All scripts include a built-in test runner using Starlette's `TestClient` and in-memory SQLite:
```powershell
python 01_API_Fundamentals_and_HTTP/http_methods_and_status_codes.py
python 02_FastAPI_Request_Validation/request_validation_schemas.py
python 03_Authentication_and_Security/jwt_and_firebase_security.py
python 04_CRUD_Operations_and_Routers/crud_task_router.py
python 05_Database_SQL_and_Modeling/relational_data_models.py
python 06_Cloud_Config_Security_and_Monitoring/production_app_management.py
```
