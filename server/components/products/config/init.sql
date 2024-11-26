CREATE USER products_user WITH PASSWORD 'products_password';

DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

ALTER DATABASE products OWNER TO products_user;

\c products products_user;

-- Don't add tables here. 

-- Add the attributes you need to implement your feature?
<<<<<<< HEAD
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL CONSTRAINT namechk CHECK (char_length(product_name) >= 3),
    category_id INTEGER NOT NULL,
    short_description VARCHAR(1000) NOT NULL CONSTRAINT descripchk CHECK (char_length(short_description) >= 20),
    detailed_description VARCHAR(10000),
    product_url VARCHAR(1000)
);


=======

CREATE TABLE Product (
    id SERIAL PRIMARY KEY
    product_name VARCHAR(100) NOT NULL CHECK (char_length(product_name) >=3),
    category_id INTEGER NOT NULL,
    short_description VARCHAR(1000) NOT NULL CHECK (char_length(short_description) >=20),
    detailed_description VARCHAR (10000),
    product_url VARCHAR(1000)
);

>>>>>>> aecadb070dc41c418107f9a1c82ffc8061e4c8d0
CREATE TABLE ProductPhotos (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES Product(id) ON DELETE CASCADE,
    photo_url VARCHAR(1000) NOT NULL
);

-- This table is negotiable dependening on the priorities

CREATE TABLE ProductChangeLog (
    id SERIAL PRIMARY KEY

);
