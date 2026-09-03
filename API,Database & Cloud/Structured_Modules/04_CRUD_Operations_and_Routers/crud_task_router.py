"""
crud_task_router.py
-------------------
Demonstrates Complete CRUD Operations using FastAPI APIRouter:
- Modular route separation
- Response models (response_model=...)
- Status codes: 200, 201, 204
- Error handling with HTTPException
"""

from fastapi import FastAPI, APIRouter, HTTPException, status, Query
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# Schema Definitions
class TaskBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    description: Optional[str] = None
    priority: str = Field(default="medium", pattern="^(low|medium|high)$")
    status: str = Field(default="pending", pattern="^(pending|in_progress|completed)$")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None

class TaskResponse(TaskBase):
    id: int
    created_at: str

# Modular Router
router = APIRouter(prefix="/api/v1/tasks", tags=["Task CRUD"])

# In-Memory Database
tasks_store = {}

@router.get("", response_model=List[TaskResponse])
def get_all_tasks(
    status_filter: Optional[str] = Query(None, alias="status"),
    priority_filter: Optional[str] = Query(None, alias="priority")
):
    results = list(tasks_store.values())
    if status_filter:
        results = [t for t in results if t["status"] == status_filter]
    if priority_filter:
        results = [t for t in results if t["priority"] == priority_filter]
    return results

@router.get("/{task_id}", response_model=TaskResponse)
def get_task_by_id(task_id: int):
    if task_id not in tasks_store:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Task {task_id} not found")
    return tasks_store[task_id]

@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_new_task(task_in: TaskCreate):
    new_id = max(tasks_store.keys(), default=0) + 1
    new_task = {
        "id": new_id,
        "created_at": datetime.now().isoformat(),
        **task_in.model_dump()
    }
    tasks_store[new_id] = new_task
    return new_task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task_full(task_id: int, task_in: TaskCreate):
    if task_id not in tasks_store:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Task {task_id} not found")
    updated = {
        "id": task_id,
        "created_at": tasks_store[task_id]["created_at"],
        **task_in.model_dump()
    }
    tasks_store[task_id] = updated
    return updated

@router.patch("/{task_id}", response_model=TaskResponse)
def update_task_partial(task_id: int, patch_data: TaskUpdate):
    if task_id not in tasks_store:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Task {task_id} not found")
    task = tasks_store[task_id]
    updates = patch_data.model_dump(exclude_unset=True)
    task.update(updates)
    tasks_store[task_id] = task
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task_by_id(task_id: int):
    if task_id not in tasks_store:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Task {task_id} not found")
    del tasks_store[task_id]
    return None

# App Initialization
app = FastAPI(title="CRUD Tasks App")
app.include_router(router)

def run_tests():
    client = TestClient(app)
    print("--- 1. POST /api/v1/tasks (Create Task) ---")
    payload = {"title": "Setup PostgreSQL Database", "description": "Configure RDS database", "priority": "high"}
    res = client.post("/api/v1/tasks", json=payload)
    print(f"Created Task #{res.json()['id']}: {res.json()['title']} | Status: {res.status_code}")

    print("\n--- 2. GET /api/v1/tasks (List all) ---")
    res = client.get("/api/v1/tasks")
    print(f"Total Tasks: {len(res.json())} | Item: {res.json()[0]['title']}")

    print("\n--- 3. PATCH /api/v1/tasks/1 (Mark as Completed) ---")
    res = client.patch("/api/v1/tasks/1", json={"status": "completed"})
    print(f"Updated Task Status: {res.json()['status']}")

    print("\n--- 4. DELETE /api/v1/tasks/1 ---")
    res = client.delete("/api/v1/tasks/1")
    print(f"Deleted Task, Status: {res.status_code} (204 No Content)")

if __name__ == "__main__":
    run_tests()
