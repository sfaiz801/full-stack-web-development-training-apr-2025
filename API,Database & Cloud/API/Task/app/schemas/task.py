from enum import Enum
from typing import Optional, Dict
from datetime import datetime, date
from pydantic import BaseModel, Field, ConfigDict


class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class TaskBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=150, description="Title of the task")
    description: Optional[str] = Field(None, max_length=1000, description="Detailed task description")
    status: TaskStatus = Field(default=TaskStatus.TODO, description="Current progress status")
    priority: TaskPriority = Field(default=TaskPriority.MEDIUM, description="Task urgency level")
    assigned_to: Optional[str] = Field(None, max_length=100, description="Assignee name or student")
    due_date: Optional[date] = Field(None, description="Task target deadline (YYYY-MM-DD)")


class TaskCreate(TaskBase):
    """Schema for POST /tasks request body."""
    pass


class TaskUpdate(TaskBase):
    """Schema for PUT /tasks/{id} (Full replacement - all required fields must be supplied)."""
    pass


class TaskPatch(BaseModel):
    """Schema for PATCH /tasks/{id} (Partial update - only specified fields will be changed)."""
    model_config = ConfigDict(extra="forbid")

    title: Optional[str] = Field(None, min_length=3, max_length=150)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    assigned_to: Optional[str] = Field(None, max_length=100)
    due_date: Optional[date] = None


class TaskResponse(TaskBase):
    """Schema for returning task responses with metadata."""
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskStatsResponse(BaseModel):
    total_tasks: int
    by_status: Dict[str, int]
    by_priority: Dict[str, int]
