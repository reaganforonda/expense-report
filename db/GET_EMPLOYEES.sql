SELECT *
FROM employees
JOIN departments on departments.dept_id = employees.department
WHERE ($1 IS NULL OR employees.company = $1)
AND ($2 IS NULL OR employees.employee_id = $2)