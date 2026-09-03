from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.tasks import router as task_router

app = FastAPI(
    title="Full Stack Training - Task Management CRUD API",
    description="""
    Comprehensive RESTful CRUD API built with **FastAPI**.
    
    ### Available Operations:
    * **GET /tasks**: Retrieve all tasks with filtering, search & pagination.
    * **GET /tasks/{id}**: Retrieve single task details by ID.
    * **POST /tasks**: Create a new task with Pydantic validation.
    * **PUT /tasks/{id}**: Full replacement of an existing task.
    * **PATCH /tasks/{id}**: Partial update of task attributes.
    * **DELETE /tasks/{id}**: Remove a task by ID.
    * **GET /tasks/stats/summary**: Aggregated status & priority statistics.
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Frontend communication (React, Next.js, HTML/JS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Welcome Route
@app.get("/", tags=["System"])
def root():
    return {
        "message": "Welcome to FastAPI Task Management CRUD API",
        "documentation": "/docs",
        "redoc": "/redoc",
        "endpoints": {
            "list_tasks": "GET /tasks",
            "create_task": "POST /tasks",
            "task_stats": "GET /tasks/stats/summary"
        }
    }

# Health Check Route
@app.get("/health", tags=["System"])
def health_check():
    return {"status": "healthy", "service": "task-crud-api"}

# Include Task CRUD Router
app.include_router(task_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
