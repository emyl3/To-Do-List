-- setting up the tasks database
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name varchar(80) NOT NULL,
    complete BOOLEAN DEFAULT FALSE NOT NULL,
);
