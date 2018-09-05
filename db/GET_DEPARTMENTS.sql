SELECT departments.dept_id, departments.name, departments.company_id, companies.admin
FROM departments
JOIN companies
ON companies.company_id = departments.company_id
WHERE companies.company_id = $1
AND admin = $2