CREATE DATABASE AdminAccounts;

\c AdminAccounts
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
    code VARCHAR(8) NOT NULL UNIQUE,
    is_used BOOLEAN DEFAULT FALSE,
    used_by INTEGER REFERENCES AdminAccount(id),
    expiry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

