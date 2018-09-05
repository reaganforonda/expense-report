SELECT * 
FROM companies
JOIN users
ON companies.admin = users.user_id
WHERE admin = $1
