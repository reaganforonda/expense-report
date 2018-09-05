SELECT *
FROM departments
JOIN companies
ON companies.company_id = departments.company_id
WHERE companies.company_id = $1
AND admin = $2