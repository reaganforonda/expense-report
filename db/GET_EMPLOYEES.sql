SELECT employees.employee_id, employees.user_id, employees.company, employees.department, employees.first_name, employees.last_name, employees.title, employees.work_phone, employees.email, departments.name, users.rights, users.lastlogin
FROM employees
JOIN departments on departments.dept_id = employees.department
FULL OUTER JOIN users ON users.user_id = employees.user_id
WHERE ($1 IS NULL OR employees.company = $1)
AND ($2 IS NULL OR employees.employee_id = $2)