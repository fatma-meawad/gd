
CREATE USER account_user_test WITH PASSWORD 'account_password_test';

DROP DATABASE IF EXISTS accounts_test;

CREATE DATABASE accounts_test;

ALTER DATABASE accounts_test OWNER TO account_user_test;

\c accounts_test account_user_test

-- Don't add tables here. 

-- Add the attributes you need to implement your feature?

CREATE TABLE BusinessAccount (
    id SERIAL PRIMARY KEY

);

CREATE TABLE SellerAccount (
    id SERIAL PRIMARY KEY

);

insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);
insert into BusinessAccount values (default);
insert into SellerAccount values (default);


