DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS expense_reports;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS account_types;

CREATE TABLE account_types (
    acct_id SERIAL PRIMARY KEY,
    description VARCHAR(45)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    account_type INTEGER REFERENCES account_types(acct_id),
    email VARCHAR(45),
    pw TEXT,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    tempPassword TEXT,
    tempExpiration TIMESTAMPTZ,
    lastLogin TIMESTAMPTZ,
    rights JSONB NOT NULL DEFAULT '{"Admin":false, "Approve":false, "Expense":false}'::JSONB
);

CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    address VARCHAR(50),
    city VARCHAR(45),
    state VARCHAR(45),
    zipcode INTEGER,
    phone VARCHAR(45),
    admin INTEGER REFERENCES users(user_id)
);

CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    company INTEGER REFERENCES companies(company_id),
    name VARCHAR(45)
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    company INTEGER REFERENCES companies(company_id),
    department INTEGER REFERENCES departments(dept_id),
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    title VARCHAR(45),
    work_phone VARCHAR(45),
    email VARCHAR(45)
);

CREATE TABLE expense_reports (
    report_id SERIAL PRIMARY KEY,
    report_number VARCHAR(10),
    employee INTEGER REFERENCES employees(employee_id),
    report_date DATE,
    description VARCHAR(50),
    status JSONB NOT NULL DEFAULT '{"Approved":false, "Submitted":false, "Rejected":false}'::JSONB
);

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES expense_reports(report_id),
    employee INTEGER REFERENCES employees(employee_id),
    expense_date Date,
    merchant VARCHAR(45),
    amount NUMERIC,
    category VARCHAR(45),
    comment VARCHAR(100),
    tag TEXT[],
    img TEXT
);