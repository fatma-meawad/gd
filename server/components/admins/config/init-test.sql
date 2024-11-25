CREATE USER admin_user_test WITH PASSWORD 'admin_password_test';

DROP DATABASE IF EXISTS admins_test;

CREATE DATABASE admins_test;

ALTER DATABASE admins_test OWNER TO admin_user_test;

\c admins_test admin_user_test;


-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE AdminAccount (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address VARCHAR(200),
    profile_photo VARCHAR(255),
    bio TEXT,
    status VARCHAR(20) DEFAULT 'active',
    login_attempts INTEGER DEFAULT 0,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ActivationCode (
    id SERIAL PRIMARY KEY,
    code VARCHAR(8) NOT NULL UNIQUE,           -- Unique code for activation or reset
    type VARCHAR(20) NOT NULL,                 -- Type of code: 'activation' or 'reset'
    is_used BOOLEAN DEFAULT FALSE,             -- Track if the code has been used
    used_by INTEGER REFERENCES AdminAccount(id), -- Link to the AdminAccount (if used)
    expiry_date TIMESTAMP NOT NULL,            -- Expiry date for the code
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the code is created
);

