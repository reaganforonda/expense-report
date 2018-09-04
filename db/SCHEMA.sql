DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS acct_type;

CREATE TABLE acct_type(
    acct_type_id SERIAL PRIMARY KEY,
    description VARCHAR(45)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(45),
    user_first_name VARCHAR(45),
    user_last_name VARCHAR(45),
    user_title VARCHAR(45),
    user_department VARCHAR(45),
    acct_type INTEGER REFERENCES acct_type(acct_type_id)
);
