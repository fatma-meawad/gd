
CREATE DATABASE CHATLOGS;

\c CHATLOGS


CREATE TABLE Message (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES AdminAccount(id),
    recipient_id INTEGER NOT NULL REFERENCES AdminAccount(id),
    thread VARCHAR(16) NOT NULL,
    content TEXT NOT NULL,
    time TIMESTAMP NOT NULL,
);


-- AdminActionLog Table
CREATE TABLE Log (
   
);

