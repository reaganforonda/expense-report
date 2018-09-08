UPDATE employees
SET department = $1,
    first_name = $2,
    last_name = $3,
    title = $4,
    work_phone = $5,
    email = $6,
    user_id = $9
WHERE employees.employee_id  = $7
AND employees.company = $8
returning *