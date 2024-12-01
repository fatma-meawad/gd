CREATE USER categories_user WITH PASSWORD 'categories_password';
CREATE USER chatlogs_user_test WITH PASSWORD 'chatlogs_password_test';

DROP DATABASE IF EXISTS categories;

CREATE DATABASE categories;

ALTER DATABASE categories OWNER TO categories_user;

\c categories categories_user;
-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    title  VARCHAR(255),
    photo_url text,
    description text,
    is_deleted BIT
);


CREATE TABLE Subcategory (
    id SERIAL PRIMARY KEY

);
