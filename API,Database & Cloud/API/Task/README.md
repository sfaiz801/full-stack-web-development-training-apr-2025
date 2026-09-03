# FastAPI Task Management CRUD API

A production-ready, fully typed RESTful CRUD API built with **FastAPI**, **Pydantic v2**, and **Uvicorn** for the Full Stack Development Training program.

---

## 🌟 Supported CRUD Operations

| HTTP Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/tasks` | List all tasks (supports query filtering: `status`, `priority`, `search`, and pagination `skip`, `limit`) | `200 OK` |
| **GET** | `/tasks/{id}` | Get single task details by ID | `200 OK` / `404 Not Found` |
| **GET** | `/tasks/stats/summary` | Get aggregated count of tasks by status & priority | `200 OK` |
| **POST** | `/tasks` | Create a new task with Pydantic validation | `201 Created` |
| **PUT** | `/tasks/{id}` | Full update (replaces entire task entity) | `200 OK` / `404 Not Found` |
| **PATCH** | `/tasks/{id}` | Partial update (modifies only supplied fields) | `200 OK` / `404 Not Found` |
| **DELETE** | `/tasks/{id}` | Delete task permanently | `200 OK` / `404 Not Found` |

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Start the FastAPI Development Server
```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Open Interactive Swagger UI
* 📖 **Interactive Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* 📑 **ReDoc Alternative UI:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🧪 Running Automated Tests

An automated test suite (`test_api.py`) is provided that validates all 9 endpoints (GET, POST, PUT, PATCH, DELETE, and error handling):
```bash
python test_api.py
```

---

## 💻 cURL Testing Examples

### 1. GET (List all tasks with filter)
```bash
curl -X GET "http://127.0.0.1:8000/tasks?status=in_progress&priority=high"
```

### 2. POST (Create a task)
```bash
curl -X POST "http://127.0.0.1:8000/tasks" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Build React Frontend",
       "description": "Connect React components to FastAPI CRUD endpoints",
       "status": "todo",
       "priority": "high",
       "assigned_to": "Faiz Ahmad",
       "due_date": "2024-06-15"
     }'
```

### 3. PUT (Full Update)
```bash
curl -X PUT "http://127.0.0.1:8000/tasks/1" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Build Bootstrap Admin Dashboard (Revised)",
       "description": "Added dark mode and new chart widgets",
       "status": "completed",
       "priority": "urgent",
       "assigned_to": "Faiz Ahmad",
       "due_date": "2024-05-12"
     }'
```

### 4. PATCH (Partial Update)
```bash
curl -X PATCH "http://127.0.0.1:8000/tasks/1" \
     -H "Content-Type: application/json" \
     -d '{
       "status": "completed"
     }'
```

### 5. DELETE (Delete Task)
```bash
curl -X DELETE "http://127.0.0.1:8000/tasks/1"
```
