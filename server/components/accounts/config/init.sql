
CREATE DATABASE Accounts;

\c Accounts

-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE BusinessAccount (
    id SERIAL PRIMARY KEY

);


CREATE TABLE SellerAccount (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    business_id VARCHAR(50) NOT NULL,
    qr_code_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
