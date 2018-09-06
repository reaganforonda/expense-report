DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS acct_type;


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
    acct_type INTEGER REFERENCES acct_type(acct_type_id)
);

CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    address VARCHAR(45),
    city VARCHAR(45),
    state VARCHAR(45),
    zipcode VARCHAR(45),
    phone VARCHAR(45),
    admin INTEGER REFERENCES users(user_id)
);

CREATE TABLE departments(
    dept_id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    company_id INTEGER REFERENCES companies(company_id)
);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    tile VARCHAR(45),
    description VARCHAR(45),
    rights JSONB
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    company INTEGER REFERENCES companies(company_id);
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    department INTEGER REFERENCES departments(dept_id),
    title VARCHAR(45),
    work_phone VARCHAR(20),
    email VARCHAR(20),
    rights JSONB
);