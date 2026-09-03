-- ==========================================================
-- Sample Seed Data for Full Stack Training Database
-- Compatible with PostgreSQL / MySQL
-- ==========================================================

-- 1. Insert Initial Users (Simulating Firebase Auth Users)
INSERT INTO users (id, firebase_uid, email, full_name, phone_number, avatar_url, role, is_active)
VALUES 
    (1, 'firebase_uid_faiz_001', 'faiz.developer@example.com', 'Faiz Ahmad', '+919876543210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'instructor', TRUE),
    (2, 'firebase_uid_rahul_002', 'rahul.sharma@example.com', 'Rahul Sharma', '+919811223344', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'student', TRUE),
    (3, 'firebase_uid_priya_003', 'priya.verma@example.com', 'Priya Verma', '+919822334455', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'student', TRUE)
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Extended User Profiles
INSERT INTO user_profiles (user_id, bio, skills, batch_name, github_url, linkedin_url, city, country)
VALUES 
    (1, 'Lead Full Stack Trainer & Cloud Architect specializing in FastAPI, React & AWS.', 'FastAPI, Python, Next.js, PostgreSQL, Docker, AWS', 'April Batch 2024', 'https://github.com/sfaiz801', 'https://linkedin.com/in/faiz-ahmad', 'New Delhi', 'India'),
    (2, 'Aspiring Full Stack Web Developer learning React, Node.js and SQL databases.', 'HTML, CSS, JavaScript, React, SQL', 'April Batch 2024', 'https://github.com/rahul-codes', 'https://linkedin.com/in/rahul-sharma', 'Noida', 'India'),
    (3, 'Passionate Frontend Developer transitioning to full stack with Next.js and FastAPI.', 'JavaScript, React, TailwindCSS, Next.js', 'April Batch 2024', 'https://github.com/priya-v', 'https://linkedin.com/in/priya-verma', 'Bengaluru', 'India')
ON CONFLICT (user_id) DO NOTHING;

-- 3. Insert Student Task Submissions
INSERT INTO student_tasks (user_id, task_name, module, github_repo_url, live_demo_url, status, score)
VALUES 
    (2, 'JavaScript DOM Manipulation & Logic', 'Javascript', 'https://github.com/rahul-codes/js-test-01', 'https://rahul-js-test.vercel.app', 'reviewed', 95),
    (2, 'Responsive Bootstrap Dashboard', 'Bootstrap', 'https://github.com/rahul-codes/bootstrap-admin', 'https://rahul-admin.vercel.app', 'reviewed', 90),
    (3, 'Next.js Task Planner Application', 'Next.js', 'https://github.com/priya-v/nextjs-sprint-planner', 'https://priya-sprint.vercel.app', 'reviewed', 98);
