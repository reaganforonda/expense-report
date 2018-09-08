INSERT INTO users
(account_type, email, temppassword, tempexpiration, first_name, last_name, rights)
VALUES
($1, $2, $3, $4, $5, $6, $7)