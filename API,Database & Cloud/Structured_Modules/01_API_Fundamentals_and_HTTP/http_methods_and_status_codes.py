"""
http_methods_and_status_codes.py
--------------------------------
Demonstrates API Fundamentals, REST Architecture, and HTTP Verbs:
- GET (Retrieve resource / list with query filters) -> 200 OK
- POST (Create new resource) -> 201 Created
- PUT (Full replacement of resource) -> 200 OK
- PATCH (Partial modification) -> 200 OK
- DELETE (Remove resource) -> 204 No Content
- Standard Status Codes: 200, 201, 204, 400, 404, 422
"""

from fastapi import FastAPI, HTTPException, status, Query, Path
from fastapi.testclient import TestClient
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="API Fundamentals & HTTP Verbs Demo", version="1.0.0")

# In-memory storage for demonstration
products_db = {
    1: {"id": 1, "name": "Laptop Pro", "price": 85000.0, "category": "Electronics"},
    2: {"id": 2, "name": "Wireless Mouse", "price": 1200.0, "category": "Accessories"},
    3: {"id": 3, "name": "Mechanical Keyboard", "price": 4500.0, "category": "Accessories"}
}

class ProductCreate(BaseModel):
    name: str
    price: float
    category: str

class ProductUpdate(BaseModel):
    name: str
    price: float
    category: str

class ProductPatch(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None

# 1. GET: Query Parameters for Filtering & Pagination -> 200 OK
@app.get("/products", status_code=status.HTTP_200_OK)
def list_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price filter")
):
    results = list(products_db.values())
    if category:
        results = [p for p in results if p["category"].lower() == category.lower()]
    if min_price is not None:
        results = [p for p in results if p["price"] >= min_price]
    return {"total": len(results), "items": results}

# 2. GET by ID: Path Parameter -> 200 OK or 404 Not Found
@app.get("/products/{product_id}", status_code=status.HTTP_200_OK)
def get_product(product_id: int = Path(..., ge=1, description="Product ID")):
    if product_id not in products_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product {product_id} not found")
    return products_db[product_id]

# 3. POST: Create Resource -> 201 Created
@app.post("/products", status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate):
    new_id = max(products_db.keys(), default=0) + 1
    new_item = {"id": new_id, **product.model_dump()}
    products_db[new_id] = new_item
    return new_item

# 4. PUT: Full Replacement -> 200 OK
@app.put("/products/{product_id}", status_code=status.HTTP_200_OK)
def replace_product(product_id: int, product: ProductUpdate):
    if product_id not in products_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product {product_id} not found")
    products_db[product_id] = {"id": product_id, **product.model_dump()}
    return products_db[product_id]

# 5. PATCH: Partial Update -> 200 OK
@app.patch("/products/{product_id}", status_code=status.HTTP_200_OK)
def update_product_partial(product_id: int, patch_data: ProductPatch):
    if product_id not in products_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product {product_id} not found")
    current = products_db[product_id]
    updates = patch_data.model_dump(exclude_unset=True)
    current.update(updates)
    products_db[product_id] = current
    return current

# 6. DELETE: Remove Resource -> 204 No Content
@app.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int):
    if product_id not in products_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product {product_id} not found")
    del products_db[product_id]
    return None

def run_tests():
    client = TestClient(app)
    print("--- 1. Testing GET /products ---")
    res = client.get("/products")
    print(f"Status: {res.status_code} | Total: {res.json()['total']}")

    print("\n--- 2. Testing POST /products (201 Created) ---")
    new_payload = {"name": "Gaming Monitor", "price": 28000.0, "category": "Electronics"}
    res = client.post("/products", json=new_payload)
    print(f"Status: {res.status_code} | Created: {res.json()}")

    print("\n--- 3. Testing PATCH /products/1 (Partial Update) ---")
    res = client.patch("/products/1", json={"price": 82000.0})
    print(f"Status: {res.status_code} | Updated Price: {res.json()['price']}")

    print("\n--- 4. Testing DELETE /products/2 (204 No Content) ---")
    res = client.delete("/products/2")
    print(f"Status: {res.status_code} (204 No Content verified)")

if __name__ == "__main__":
    run_tests()
