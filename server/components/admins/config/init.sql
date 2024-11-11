CREATE DATABASE AdminAccounts;

\c AdminAccounts
-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE AdminAccount (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
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
