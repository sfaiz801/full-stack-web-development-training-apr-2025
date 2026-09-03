# Database Module (SQL, Relations & Procedures)

This directory contains the database design, tables, relations, and stored procedures for the Full Stack Development Training program.

## 📂 Files in this Directory

| File | Description |
| :--- | :--- |
| **`01_schema.sql`** | Complete DDL script creating `users`, `user_profiles`, and `student_tasks` tables, along with indexes, views (`v_user_full_profile`), and Firebase synchronization functions (`sync_firebase_user`). |
| **`02_sample_data.sql`** | Sample seed records for testing queries, roles, and profile relations. |
| **`03_queries_and_procedures.sql`** | Production-ready queries for FastAPI endpoints (fetching full profiles, updating records, aggregating student task scores). |

## 🛠️ How to Run

### Option 1: PostgreSQL (Local / Docker / AWS RDS)
```bash
# Connect with psql
psql -U postgres -d training_db -f 01_schema.sql
psql -U postgres -d training_db -f 02_sample_data.sql
```

### Option 2: MySQL
The SQL scripts use standard ANSI SQL syntax. To adapt for MySQL:
- Change `SERIAL PRIMARY KEY` to `INT AUTO_INCREMENT PRIMARY KEY`.
- Replace `TIMESTAMP WITH TIME ZONE` with `DATETIME`.
