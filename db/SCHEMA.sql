-- DROP TABLE IF EXISTS employees;
-- DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS departments;
-- DROP TABLE IF EXISTS companies;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS acct_type;


-- CREATE TABLE acct_type(
--     acct_type_id SERIAL PRIMARY KEY,
--     description VARCHAR(45)
-- );

-- CREATE TABLE users(
--     user_id SERIAL PRIMARY KEY,
--     email VARCHAR(45),
--     pw TEXT,
--     first_name VARCHAR(45),
--     last_name VARCHAR(45),
--     title VARCHAR(45),
--     department VARCHAR(45),
--     acct_type INTEGER REFERENCES acct_type(acct_type_id)
-- );

-- CREATE TABLE companies (
--     company_id SERIAL PRIMARY KEY,
--     name VARCHAR(45),
--     address VARCHAR(45),
--     city VARCHAR(45),
--     state VARCHAR(45),
--     zipcode VARCHAR(45),
--     phone VARCHAR(45),
--     admin INTEGER REFERENCES users(user_id)
-- );

-- CREATE TABLE departments(
--     dept_id SERIAL PRIMARY KEY,
--     name VARCHAR(45),
--     company_id INTEGER REFERENCES companies(company_id)
-- );

-- CREATE TABLE roles (
--     role_id SERIAL PRIMARY KEY,
--     tile VARCHAR(45),
--     description VARCHAR(45),
--     rights JSONB
-- );

-- CREATE TABLE employees (
--     employee_id SERIAL PRIMARY KEY,
--     company INTEGER REFERENCES companies(company_id);
--     first_name VARCHAR(45),
--     last_name VARCHAR(45),
--     department INTEGER REFERENCES departments(dept_id),
--     title VARCHAR(45),
--     work_phone VARCHAR(20),
--     email VARCHAR(20),
--     rights JSONB
-- );

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS enterprise_users;
DROP TABLE IF EXISTS individual_users;
DROP TABLE IF EXISTS account_types;

CREATE TABLE account_types (
    acct_id SERIAL PRIMARY KEY,
    description VARCHAR(45)
);

CREATE TABLE enterprise_users(
    user_id SERIAL PRIMARY KEY,
    account_type INTEGER REFERENCES account_types(acct_id),
    email VARCHAR(45),
    pw TEXT,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    tempPassword VARCHAR(15),
    tempExpiration TIMESTAMPTZ,
    lastLogin TIMESTAMPTZ
);

CREATE TABLE individual_users(
    user_id SERIAL PRIMARY KEY,
    account_type INTEGER REFERENCES account_types(acct_id),
    email VARCHAR(45),
    pw TEXT,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    tempPassword VARCHAR(15),
    tempExpiration TIMESTAMPTZ,
    lastLogin TIMESTAMPTZ
);

CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    address VARCHAR(50),
    city VARCHAR(45),
    state VARCHAR(45),
    zipcode INTEGER,
    phone VARCHAR(45)
);

CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    company INTEGER REFERENCES companies(company_id),
    description VARCHAR(45)
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES enterprise_users(user_id),
    company INTEGER REFERENCES companies(company_id),
    department INTEGER REFERENCES departments(dept_id),
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    title VARCHAR(45),
    work_phone VARCHAR(45),
    email VARCHAR(45),
    rights JSONB NOT NULL DEFAULT '{"Admin":false, "Approve":false, "Expense":false}'::JSONB
);