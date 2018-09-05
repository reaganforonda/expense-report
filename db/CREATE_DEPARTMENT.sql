INSERT INTO departments
(name, company_id)
VALUES
($1, $2)
RETURNING *