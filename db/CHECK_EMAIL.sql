SELECT *
FROM users
FULL OUTER JOIN employees on users.user_id = employees.user_id
WHERE users.email = $1