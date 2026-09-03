import os
import json
from datetime import datetime, date
from typing import List, Optional, Dict, Any
from app.schemas.task import TaskCreate, TaskUpdate, TaskPatch, TaskStatus, TaskPriority

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(os.path.dirname(BASE_DIR), "data", "tasks.json")


def _json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")


class TaskService:
    @staticmethod
    def _ensure_file():
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        if not os.path.exists(DATA_FILE):
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump([], f)

    @classmethod
    def load_tasks(cls) -> List[Dict[str, Any]]:
        cls._ensure_file()
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    @classmethod
    def save_tasks(cls, tasks: List[Dict[str, Any]]) -> None:
        cls._ensure_file()
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(tasks, f, default=_json_serial, indent=4)

    @classmethod
    def get_all(
        cls,
        status: Optional[TaskStatus] = None,
        priority: Optional[TaskPriority] = None,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Dict[str, Any]]:
        """GET all tasks with query filtering and pagination."""
        tasks = cls.load_tasks()

        # Filter by status
        if status:
            tasks = [t for t in tasks if t.get("status") == status.value]

        # Filter by priority
        if priority:
            tasks = [t for t in tasks if t.get("priority") == priority.value]

        # Search in title or description
        if search:
            query = search.lower()
            tasks = [
                t for t in tasks 
                if query in t.get("title", "").lower() or query in (t.get("description") or "").lower()
            ]

        # Pagination: skip & limit
        return tasks[skip : skip + limit]

    @classmethod
    def get_by_id(cls, task_id: int) -> Optional[Dict[str, Any]]:
        """GET single task by ID."""
        tasks = cls.load_tasks()
        for task in tasks:
            if task.get("id") == task_id:
                return task
        return None

    @classmethod
    def create(cls, data: TaskCreate) -> Dict[str, Any]:
        """POST /tasks: Create a new task."""
        tasks = cls.load_tasks()
        new_id = max([t.get("id", 0) for t in tasks], default=0) + 1
        now = datetime.utcnow().isoformat()

        new_task = {
            "id": new_id,
            "title": data.title,
            "description": data.description,
            "status": data.status.value,
            "priority": data.priority.value,
            "assigned_to": data.assigned_to,
            "due_date": data.due_date.isoformat() if data.due_date else None,
            "created_at": now,
            "updated_at": now
        }

        tasks.append(new_task)
        cls.save_tasks(tasks)
        return new_task

    @classmethod
    def update_put(cls, task_id: int, data: TaskUpdate) -> Optional[Dict[str, Any]]:
        """PUT /tasks/{id}: Complete replacement of task fields."""
        tasks = cls.load_tasks()
        for i, task in enumerate(tasks):
            if task.get("id") == task_id:
                now = datetime.utcnow().isoformat()
                updated_task = {
                    "id": task_id,
                    "title": data.title,
                    "description": data.description,
                    "status": data.status.value,
                    "priority": data.priority.value,
                    "assigned_to": data.assigned_to,
                    "due_date": data.due_date.isoformat() if data.due_date else None,
                    "created_at": task.get("created_at", now),
                    "updated_at": now
                }
                tasks[i] = updated_task
                cls.save_tasks(tasks)
                return updated_task
        return None

    @classmethod
    def patch(cls, task_id: int, data: TaskPatch) -> Optional[Dict[str, Any]]:
        """PATCH /tasks/{id}: Partial update - modifies only specified fields."""
        tasks = cls.load_tasks()
        patch_dict = data.model_dump(exclude_unset=True)

        for i, task in enumerate(tasks):
            if task.get("id") == task_id:
                for key, value in patch_dict.items():
                    if isinstance(value, (TaskStatus, TaskPriority)):
                        task[key] = value.value
                    elif isinstance(value, (datetime, date)):
                        task[key] = value.isoformat()
                    else:
                        task[key] = value

                task["updated_at"] = datetime.utcnow().isoformat()
                tasks[i] = task
                cls.save_tasks(tasks)
                return task
        return None

    @classmethod
    def delete(cls, task_id: int) -> bool:
        """DELETE /tasks/{id}: Remove a task by ID."""
        tasks = cls.load_tasks()
        initial_count = len(tasks)
        tasks = [t for t in tasks if t.get("id") != task_id]
        if len(tasks) < initial_count:
            cls.save_tasks(tasks)
            return True
        return False

    @classmethod
    def get_stats(cls) -> Dict[str, Any]:
        """Summary metrics across all tasks."""
        tasks = cls.load_tasks()
        by_status = {}
        by_priority = {}

        for t in tasks:
            s = t.get("status", "unknown")
            p = t.get("priority", "unknown")
            by_status[s] = by_status.get(s, 0) + 1
            by_priority[p] = by_priority.get(p, 0) + 1

        return {
            "total_tasks": len(tasks),
            "by_status": by_status,
            "by_priority": by_priority
        }
