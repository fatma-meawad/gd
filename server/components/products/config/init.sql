CREATE DATABASE Products;

\c Products
-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE Product (
    id SERIAL PRIMARY KEY

);

CREATE TABLE ProductPhotos (
    id SERIAL PRIMARY KEY

);

-- This table is negotiable dependening on the priorities

CREATE TABLE ProductChangeLog (
    id SERIAL PRIMARY KEY

);
