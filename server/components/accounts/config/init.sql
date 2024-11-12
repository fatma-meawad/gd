-- Drop the database if it already exists, then recreate it
DROP DATABASE IF EXISTS "accounts";

-- Create the database if it does not exist
CREATE DATABASE accounts;

-- Connect to the database
\c accounts

-- Create the BusinessAccount table with the required attributes for the business endpoint
CREATE TABLE IF NOT EXISTS BusinessAccount (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT,
    phone VARCHAR(20),
    address VARCHAR(255) NOT NULL,
    web_address TEXT,
    description TEXT,
    main_owner_name VARCHAR(100) NOT NULL,
    main_owner_email VARCHAR(100) NOT NULL,
    main_owner_phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE SellerAccount (
    id SERIAL PRIMARY KEY

);
