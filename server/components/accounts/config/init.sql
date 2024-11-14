CREATE DATABASE Accounts;

\c Accounts

-- Definizione della tabella per BusinessAccount
CREATE TABLE BusinessAccount (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(200),
    web_address VARCHAR(100),
    description TEXT,
    main_owner_name VARCHAR(100),
    main_owner_email VARCHAR(100),
    main_owner_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Definizione della tabella per SellerAccount
CREATE TABLE SellerAccount (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES BusinessAccount(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    profile_photo VARCHAR(200),
    address VARCHAR(200),
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
