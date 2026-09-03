# 🚀 Next.js Practice Tasks & Micro-Projects

Full Stack April Batch 2025 ke liye Next.js App Router (v14+) ke practical assignments aur interactive tasks yahan implement kiye gaye hain.

---

## 📂 Tasks Overview & Routes

| Task | Route | Component Type | Features & Concepts |
| :--- | :--- | :--- | :--- |
| **Home Hub** | `/` | Server Component | Central dashboard with direct quick-links to all tasks & API endpoints. |
| **Task 1: Products & Cart** | `/task-1-products` | Client (`'use client'`) | Interactive product catalog, category filters, query search, sorting, modal preview & live cart drawer with tax calculation. |
| **Task 2: Contact Form** | `/task-2-contact-form` | Client (`'use client'`) | Form with validation, async dispatch via `fetch()`, connected to Next.js Route Handler, live API monitor. |
| **Task 3: Team Directory** | `/task-3-users` | Client (`'use client'`) | Full-stack engineering profiles, department filter, skills badges, live availability status, profile modal. |
| **Task 4: Sprint Task Planner** | `/task-4-todo` | Client (`'use client'`) | Task board with priority tagging (High/Med/Low), category classification, progress bar, and persistent `localStorage`. |

---

## ⚡ Built-in Next.js Route Handlers (Backend APIs)

1. **`GET /api/products`**
   - Returns complete product list with search parameter support (`?category=Electronics&q=phone`).
2. **`POST /api/contact`**
   - Receives JSON payload, performs field validation, generates a unique reference tracking code (`REQ-XXXX`), and returns standard HTTP response status.
3. **`GET /api/contact`**
   - Returns API health status and request payload schema.

---

## 🛠️ How to Run

1. Navigate to the tasks directory:
   ```powershell
   cd "d:\full-stack-web-development-training-apr-2024\Next.js\tasks"
   ```

2. Start the development server (runs on port 3001 to prevent conflicts):
   ```powershell
   npm run dev
   ```

3. Open in your browser:
   👉 **http://localhost:3001/**
