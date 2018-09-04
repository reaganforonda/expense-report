INSERT INTO users
(email, pw, first_name, last_name, acct_type)
VALUES
($1, $2, $3, $4, $5)
RETURNING *