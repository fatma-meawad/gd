CREATE DATABASE Products;

\c Products
-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE Product (
    id SERIAL PRIMARY KEY
    -- added by marika
    name VARCHAR(255) NOT NULL
    short_description TEXT NOT NULL
    -- end of added by marika

);

CREATE TABLE ProductPhotos (
    id SERIAL PRIMARY KEY

);

-- This table is negotiable dependening on the priorities

CREATE TABLE ProductChangeLog (
    id SERIAL PRIMARY KEY

);
