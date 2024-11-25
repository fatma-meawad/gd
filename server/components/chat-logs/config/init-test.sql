

DROP DATABASE IF EXISTS chatlogs_test;

CREATE DATABASE chatlogs_test;

ALTER DATABASE chatlogs_test OWNER TO chatlogs_user_test;

\c chatlogs_test chatlogs_user_test;

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
