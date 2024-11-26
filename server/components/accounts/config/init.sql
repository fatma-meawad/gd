<<<<<<< HEAD

CREATE USER account_user WITH PASSWORD 'account_password';
=======
CREATE DATABASE Accounts;
>>>>>>> aecadb070dc41c418107f9a1c82ffc8061e4c8d0

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

-- Add seed data if needed for your tests or add them in the test code

insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);

