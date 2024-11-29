
CREATE USER account_user WITH PASSWORD 'account_password';

DROP DATABASE IF EXISTS accounts;

CREATE DATABASE accounts;

ALTER DATABASE accounts OWNER TO account_user;

\c accounts account_user;


-- TODO: Add the attributes you need to implement your feature?

CREATE TABLE BusinessAccount (
    id SERIAL PRIMARY KEY

);


CREATE TABLE SellerAccount (
    id SERIAL PRIMARY KEY

);


