from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, Path, status
from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskPatch,
    TaskResponse,
    TaskStatsResponse,
    TaskStatus,
    TaskPriority
)
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["Task CRUD Operations"])


@router.get(
    "",
    response_model=List[TaskResponse],
    summary="List all tasks",
    description="Retrieve a paginated list of tasks with optional filtering by status, priority, and keyword search."
)
def list_tasks(
    status: Optional[TaskStatus] = Query(None, description="Filter by task status"),
    priority: Optional[TaskPriority] = Query(None, description="Filter by priority level"),
    search: Optional[str] = Query(None, min_length=1, description="Search term matching title or description"),
    skip: int = Query(0, ge=0, description="Number of items to skip for pagination"),
    limit: int = Query(20, ge=1, le=100, description="Maximum number of items to return")
):
    return TaskService.get_all(
        status=status,
        priority=priority,
        search=search,
        skip=skip,
        limit=limit
    )


@router.get(
    "/stats/summary",
    response_model=TaskStatsResponse,
    summary="Get task statistics summary",
    description="Returns aggregate counts of tasks grouped by status and priority."
)
def get_task_statistics():
    return TaskService.get_stats()


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Get task by ID",
    description="Retrieve detailed information for a single task by its numeric ID."
)
def get_task(task_id: int = Path(..., ge=1, description="The ID of the task to retrieve")):
    task = TaskService.get_by_id(task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found."
        )
    return task


@router.post(
    "",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task",
    description="Creates a new task with required title, default status, priority, and optional deadline."
)
def create_task(payload: TaskCreate):
    return TaskService.create(payload)


@router.put(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Update task (Full Replacement)",
    description="Replaces all editable fields of an existing task. All fields in payload are required."
)
def update_task_put(
    payload: TaskUpdate,
    task_id: int = Path(..., ge=1, description="The ID of the task to update")
):
    updated = TaskService.update_put(task_id, payload)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found for update."
        )
    return updated


@router.patch(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Update task (Partial Modification)",
    description="Modifies only the fields explicitly included in the request body, leaving others untouched."
)
def patch_task(
    payload: TaskPatch,
    task_id: int = Path(..., ge=1, description="The ID of the task to patch")
):
    patched = TaskService.patch(task_id, payload)
    if not patched:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found for patch."
        )
    return patched


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete a task",
    description="Permanently removes a task from the database."
)
def delete_task(task_id: int = Path(..., ge=1, description="The ID of the task to delete")):
    deleted = TaskService.delete(task_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found for deletion."
        )
    return {"status": "success", "message": f"Task #{task_id} was deleted successfully."}
