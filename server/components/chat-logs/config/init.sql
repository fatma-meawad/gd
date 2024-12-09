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
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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


-- Some sample data:
INSERT INTO Log (action_type, admin_id, message_id, action_time, details) VALUES
('edit', 101, 201, '2023-11-10T10:30:00Z', 'Edited message content.'),
('create', 102, 202, '2023-11-10T11:00:00Z', 'Created new message.'),
('delete', 101, 203, '2023-11-11T09:15:00Z', 'Deleted a message.');