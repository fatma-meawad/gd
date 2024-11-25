CREATE USER categories_user_test WITH PASSWORD 'categories_password_test';

DROP DATABASE IF EXISTS categories_test;

CREATE DATABASE categories_test;

ALTER DATABASE categories_test OWNER TO categories_user_test;

\c categories_test categories_user_test;
-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name  VARCHAR(255),
    photo_url text,
    descrption text,
    is_deleted BIT
);


CREATE TABLE Subcategory (
    id SERIAL PRIMARY KEY

);
