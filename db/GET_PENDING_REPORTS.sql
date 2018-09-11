SELECT * FROM expense_reports
JOIN employees ON employees.employee_id = expense_reports.employee
WHERE expense_reports.status @> '{"Submitted": true}'
AND employees.approver = $1