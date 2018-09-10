SELECT users.user_id, users.account_type, users.email, users.pw, users.first_name, users.last_name, users.temppassword, users.tempexpiration, users.lastlogin, users.rights, employees.employee_id, employees.department, employees.title, employees.work_phone
FROM users
FULL OUTER JOIN employees on users.user_id = employees.user_id
WHERE users.email = $1