CREATE USER products_user_test WITH PASSWORD 'products_password_test';

DROP DATABASE IF EXISTS products_test;

CREATE DATABASE products_test;

ALTER DATABASE products_test OWNER TO products_user_test;

\c products_test products_user_test;

-- Don't add tables here. 

-- Add the attributes you need to implement your feature?
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL CONSTRAINT nametestchk CHECK (char_length(product_name) >= 3),
    category_id INTEGER NOT NULL,
    short_description VARCHAR(1000) NOT NULL CONSTRAINT descriptestchk CHECK (char_length(short_description) >= 20),
    detailed_description VARCHAR(10000),
    product_url VARCHAR(1000)
);


CREATE TABLE productphotos (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES Product(id) ON DELETE CASCADE,
    photo_url VARCHAR(1000) NOT NULL
);

-- This table is negotiable dependening on the priorities

CREATE TABLE ProductChangeLog (
    id SERIAL PRIMARY KEY

);


-- Test data for endpoint GET /products
INSERT INTO product (product_name, category_id, short_description, detailed_description, product_url) VALUES ('product1', 1, 'short description for product 1', 'detailed description for product 1', 'https://www.product1.com');
INSERT INTO product (product_name, category_id, short_description, detailed_description, product_url) VALUES ('product2', 2, 'short description for product 2', 'detailed description for product 2', 'https://www.product2.com');
INSERT INTO product (product_name, category_id, short_description, detailed_description, product_url) VALUES ('product3', 3, 'short description for product 3', 'detailed description for product 3', 'https://www.product3.com');
INSERT INTO product (product_name, category_id, short_description, detailed_description, product_url) VALUES ('product4', 4, 'short description for product 4', 'detailed description for product 4', 'https://www.product4.com');
INSERT INTO product (product_name, category_id, short_description, detailed_description, product_url) VALUES ('product5', 5, 'short description for product 5', 'detailed description for product 5', 'https://www.product5.com');