SELECT * 
FROM companies
JOIN users
ON comapnies.admin = users.user_id
WHERE admin = $1
