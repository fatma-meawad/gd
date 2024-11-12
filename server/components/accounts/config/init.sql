
-- Create the database if it does not exist
CREATE DATABASE Accounts;

-- Connect to the database
\c Accounts

-- Drop tables if they already exist to ensure the script can be rerun without conflicts
DROP TABLE IF EXISTS BusinessAccount;

-- Create the BusinessAccount table with the required attributes for the business endpoint
CREATE TABLE BusinessAccount (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    web_address VARCHAR(255),
    description TEXT,
    main_owner_name VARCHAR(255) NOT NULL,
    main_owner_email VARCHAR(255) UNIQUE NOT NULL,
    main_owner_phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE SellerAccount (
    id SERIAL PRIMARY KEY

);
