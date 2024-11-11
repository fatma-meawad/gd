CREATE DATABASE Categories;

\c Categories

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
