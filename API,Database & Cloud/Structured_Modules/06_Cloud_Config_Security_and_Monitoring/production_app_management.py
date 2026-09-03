"""
production_app_management.py
----------------------------
Demonstrates Cloud Deployment, Security, Environment Config & Monitoring:
- Pydantic Settings for 12-factor environment variables (.env)
- CORS Middleware for frontend client communication (Next.js / React)
- Performance Monitoring Middleware (X-Process-Time header)
- Cloud Health Check Endpoint (/health) for Kubernetes / AWS ALB probes
- Structured application logging
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient
from pydantic import BaseModel
import time
import logging

# Configure Structured Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("production_app")

# 1. Environment Settings Simulation (12-Factor App)
class AppConfig(BaseModel):
    app_name: str = "FullStack-Cloud-API"
    environment: str = "production"
    allowed_origins: list = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://indixpert-portal.com"
    ]
    enable_metrics: bool = True

config = AppConfig()

# 2. FastAPI App Setup
app = FastAPI(title=config.app_name, version="2.0.0")

# 3. Cloud Networking: CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Monitoring Middleware: Latency & Performance Header
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000  # in ms
    response.headers["X-Process-Time-Ms"] = f"{process_time:.2f}"
    logger.info(f"{request.method} {request.url.path} - Completed in {process_time:.2f}ms with Status {response.status_code}")
    return response

# 5. Cloud Health Check Probe
@app.get("/health", status_code=status.HTTP_200_OK, tags=["Monitoring"])
def health_check():
    """
    Used by AWS Application Load Balancers, Kubernetes liveness/readiness probes,
    and Docker healthchecks to verify container status.
    """
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "app": config.app_name,
        "environment": config.environment,
        "services": {
            "database": "connected",
            "firebase_auth": "operational"
        }
    }

# 6. Sample API route
@app.get("/api/v1/status")
def get_system_status():
    return {"message": "All cloud microservices operational"}

def run_tests():
    client = TestClient(app)

    print("--- 1. Testing Cloud Health Check (/health) ---")
    res = client.get("/health")
    print(f"Status Code: {res.status_code}")
    print(f"Payload: {res.json()}")
    print(f"Response Headers (Latency Tracking): X-Process-Time-Ms = {res.headers.get('X-Process-Time-Ms')}ms")

    print("\n--- 2. Testing API Call with Timing Middleware ---")
    res2 = client.get("/api/v1/status")
    print(f"Status: {res2.status_code} | Process Time: {res2.headers.get('X-Process-Time-Ms')}ms")

if __name__ == "__main__":
    run_tests()
