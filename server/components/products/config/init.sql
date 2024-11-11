CREATE DATABASE Products;

\c Products
-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE Product (
    id SERIAL PRIMARY KEY
    name VARCHAR(100) NOT NULL CHECK (char_length(product_name) >=3),
    category_id INTEGER NOT NULL,
    short_description VARCHAR(1000) NOT NULL CHECK (char_length(short_description) >=20),
    detailed_description VARCHAR (10000),
    product_url VARCHAR(1000)
);

CREATE TABLE ProductPhotos (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES Product(id) ON DELETE CASCADE,
    photo_url VARCHAR(1000) NOT NULL
);

-- This table is negotiable dependening on the priorities

CREATE TABLE ProductChangeLog (
    id SERIAL PRIMARY KEY

);
