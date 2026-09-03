"""
Automated Test Script for FastAPI Task CRUD API
Tests GET, POST, PUT, PATCH, DELETE operations.
"""
import sys
import os

# Add parent directory to sys.path so app can be imported
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def run_tests():
    print("=" * 60)
    print("[TEST] Starting Automated Tests for Task CRUD API")
    print("=" * 60)

    # 1. Health check
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] 1. GET /health - OK")

    # 2. GET all tasks
    res = client.get("/tasks")
    assert res.status_code == 200, f"List tasks failed: {res.text}"
    tasks = res.json()
    assert isinstance(tasks, list), "Expected list of tasks"
    print(f"[PASS] 2. GET /tasks - Retrieved {len(tasks)} tasks")

    # 3. POST create new task
    new_task_payload = {
        "title": "Practice FastAPI CRUD Operations",
        "description": "Create automated tests for GET, POST, PUT, PATCH, DELETE",
        "status": "in_progress",
        "priority": "urgent",
        "assigned_to": "Faiz Ahmad",
        "due_date": "2024-06-01"
    }
    res = client.post("/tasks", json=new_task_payload)
    assert res.status_code == 201, f"Create task failed: {res.text}"
    created_task = res.json()
    created_id = created_task["id"]
    assert created_task["title"] == new_task_payload["title"]
    assert created_task["priority"] == "urgent"
    print(f"[PASS] 3. POST /tasks - Created task #{created_id} (Status 201)")

    # 4. GET single task by ID
    res = client.get(f"/tasks/{created_id}")
    assert res.status_code == 200, f"Get by ID failed: {res.text}"
    assert res.json()["id"] == created_id
    print(f"[PASS] 4. GET /tasks/{created_id} - Retrieved single task OK")

    # 5. PUT full update
    put_payload = {
        "title": "Practice FastAPI CRUD Operations (Updated)",
        "description": "Updated full description via PUT",
        "status": "completed",
        "priority": "high",
        "assigned_to": "Faiz Ahmad",
        "due_date": "2024-06-05"
    }
    res = client.put(f"/tasks/{created_id}", json=put_payload)
    assert res.status_code == 200, f"PUT failed: {res.text}"
    updated_task = res.json()
    assert updated_task["title"] == put_payload["title"]
    assert updated_task["status"] == "completed"
    print(f"[PASS] 5. PUT /tasks/{created_id} - Full update OK")

    # 6. PATCH partial update
    patch_payload = {
        "priority": "low"
    }
    res = client.patch(f"/tasks/{created_id}", json=patch_payload)
    assert res.status_code == 200, f"PATCH failed: {res.text}"
    patched_task = res.json()
    assert patched_task["priority"] == "low"
    assert patched_task["title"] == put_payload["title"]  # untouched
    print(f"[PASS] 6. PATCH /tasks/{created_id} - Partial update OK (Priority changed to low)")

    # 7. GET stats summary
    res = client.get("/tasks/stats/summary")
    assert res.status_code == 200, f"Stats summary failed: {res.text}"
    stats = res.json()
    assert "total_tasks" in stats
    print(f"[PASS] 7. GET /tasks/stats/summary - Total tasks count: {stats['total_tasks']}")

    # 8. DELETE task
    res = client.delete(f"/tasks/{created_id}")
    assert res.status_code == 200, f"DELETE failed: {res.text}"
    print(f"[PASS] 8. DELETE /tasks/{created_id} - Task removed successfully")

    # 9. Verify 404 on deleted task
    res = client.get(f"/tasks/{created_id}")
    assert res.status_code == 404, "Expected 404 for deleted task"
    print(f"[PASS] 9. Verification - Task #{created_id} correctly returned 404 Not Found")

    print("=" * 60)
    print("[SUCCESS] ALL 9 CRUD & VERIFICATION TESTS PASSED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
