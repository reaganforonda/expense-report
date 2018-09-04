DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS acct_type;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS company;

CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(45)
);

CREATE TABLE departments(
    dept_id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES company(company_id)
);

CREATE TABLE acct_type(
    acct_type_id SERIAL PRIMARY KEY,
    description VARCHAR(45)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(45),
    pw TEXT,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    title VARCHAR(45),
    department VARCHAR(45),
    company INTEGER REFERENCES company(company_id),
    acct_type INTEGER REFERENCES acct_type(acct_type_id)
);
