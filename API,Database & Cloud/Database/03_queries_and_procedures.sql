-- ==========================================================
-- Common SQL Queries & Useful Operations for FastAPI Integration
-- ==========================================================

-- 1. Fetch user profile by Firebase UID (Used by FastAPI GET /profile)
SELECT 
    u.id AS user_id,
    u.firebase_uid,
    u.email,
    u.full_name,
    u.phone_number,
    u.avatar_url,
    u.role,
    p.bio,
    p.skills,
    p.batch_name,
    p.github_url,
    p.linkedin_url,
    p.city,
    p.country
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE u.firebase_uid = 'firebase_uid_faiz_001';


-- 2. Update user profile details (Used by FastAPI PUT /profile)
UPDATE user_profiles
SET 
    bio = 'Updated bio for student profile',
    skills = 'FastAPI, PostgreSQL, Docker, Next.js, AWS S3',
    github_url = 'https://github.com/updated-profile',
    linkedin_url = 'https://linkedin.com/in/updated-profile',
    city = 'Mumbai',
    updated_at = CURRENT_TIMESTAMP
WHERE user_id = (SELECT id FROM users WHERE firebase_uid = 'firebase_uid_faiz_001');


-- 3. Fetch Student Performance Summary (Used by Admin Dashboard)
SELECT 
    u.full_name,
    u.email,
    p.batch_name,
    COUNT(t.id) AS total_tasks_submitted,
    COALESCE(AVG(t.score), 0) AS average_score
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id
LEFT JOIN student_tasks t ON u.id = t.user_id
WHERE u.role = 'student'
GROUP BY u.id, u.full_name, u.email, p.batch_name;
