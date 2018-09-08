UPDATE users 
SET lastlogin = $1
WHERE user_id = $2
AND email = $3