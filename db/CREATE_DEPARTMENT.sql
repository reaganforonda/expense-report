INSERT INTO departments
(name, company)
VALUES
($1, $2)
RETURNING *