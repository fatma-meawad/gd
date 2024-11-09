
CREATE DATABASE CHATLOGS;

\c CHATLOGS


CREATE TABLE Message (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES AdminAccount(id),
    recipient_id INTEGER NOT NULL REFERENCES AdminAccount(id),
    content TEXT NOT NULL,
    time VARCHAR(20) NOT NULL,
);


-- AdminActionLog Table
CREATE TABLE Log (
   
);

