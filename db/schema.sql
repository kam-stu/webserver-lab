-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    role TEXT DEFAULT 'user'
);

-- POSTS TABLE
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    message TEXT
);

