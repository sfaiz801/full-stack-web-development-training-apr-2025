-- ==========================================================
-- Full Stack Training - User & Profile Database Schema
-- Compatible with PostgreSQL / MySQL / AWS RDS
-- Designed to work alongside Firebase Authentication
-- ==========================================================

-- 1. Users Table (Core identity linked with Firebase Auth)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(128) NOT NULL UNIQUE,      -- UID received from Firebase Token
    email VARCHAR(255) NOT NULL UNIQUE,             -- User email from Firebase
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url VARCHAR(500),                        -- URL hosted on AWS S3 / CloudFront
    role VARCHAR(50) NOT NULL DEFAULT 'student',    -- 'student', 'instructor', 'admin'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for instant lookup on every authenticated API request
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);


-- 2. User Profiles Table (Extended details - 1-to-1 Relationship)
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    skills TEXT,                                    -- Comma separated or JSON array
    batch_name VARCHAR(100) DEFAULT 'April Batch 2024',
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 3. Student Tasks & Submissions Table (1-to-Many Relationship)
CREATE TABLE IF NOT EXISTS student_tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_name VARCHAR(150) NOT NULL,
    module VARCHAR(50) NOT NULL,                    -- 'Javascript', 'React', 'FastAPI', 'Next.js'
    github_repo_url VARCHAR(500),
    live_demo_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'submitted',         -- 'pending', 'submitted', 'reviewed'
    score INT CHECK (score >= 0 AND score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 4. View for complete profile retrieval (Used by FastAPI /profile endpoint)
CREATE OR REPLACE VIEW v_user_full_profile AS
SELECT 
    u.id,
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
    p.country,
    u.created_at
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id;


-- 5. Stored Procedure / Function to sync or create user on Firebase Login
-- (Example for PostgreSQL)
CREATE OR REPLACE FUNCTION sync_firebase_user(
    p_firebase_uid VARCHAR,
    p_email VARCHAR,
    p_full_name VARCHAR,
    p_avatar_url VARCHAR DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    v_user_id INT;
BEGIN
    -- Check if user already exists
    SELECT id INTO v_user_id FROM users WHERE firebase_uid = p_firebase_uid;
    
    IF v_user_id IS NULL THEN
        -- Insert new user
        INSERT INTO users (firebase_uid, email, full_name, avatar_url)
        VALUES (p_firebase_uid, p_email, p_full_name, p_avatar_url)
        RETURNING id INTO v_user_id;

        -- Create empty initial profile row
        INSERT INTO user_profiles (user_id) VALUES (v_user_id);
    ELSE
        -- Update existing user metadata if changed
        UPDATE users 
        SET email = p_email,
            full_name = COALESCE(p_full_name, full_name),
            avatar_url = COALESCE(p_avatar_url, avatar_url),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = v_user_id;
    END IF;

    RETURN v_user_id;
END;
$$ LANGUAGE plpgsql;
