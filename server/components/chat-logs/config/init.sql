CREATE USER chatlogs_user WITH PASSWORD 'chatlogs_password';

DROP DATABASE IF EXISTS chatlogs;

CREATE DATABASE chatlogs;

ALTER DATABASE chatlogs OWNER TO chatlogs_user;

\c chatlogs chatlogs_user;

CREATE TABLE Message (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    thread VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
<<<<<<< HEAD
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
=======
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
>>>>>>> aecadb070dc41c418107f9a1c82ffc8061e4c8d0
);


-- AdminActionLog Table
CREATE TABLE Log (
    id SERIAL PRIMARY KEY,             -- Primary key for the log entry
    action_type VARCHAR(50) NOT NULL,  -- Type of action performed (e.g., 'create', 'edit')
    admin_id INTEGER NOT NULL,         -- ID of the admin performing the action
    message_id INTEGER,                -- ID of the associated message, if applicable
    action_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp of the action
    details TEXT                       -- Additional information about the action
);

