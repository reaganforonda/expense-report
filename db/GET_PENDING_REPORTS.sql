SELECT expense_reports.report_id, expense_reports.report_number, expense_reports.report_date, expense_reports.description, expense_reports.status, expense_reports.employee, employees.first_name, employees.last_name, employees.email, employees.user_id, sum(expenses.amount) as total from expense_reports
JOIN employees ON employees.employee_id = expense_reports.employee
JOIN expenses ON expenses.report_id = expense_reports.report_id
WHERE expense_reports.status @> '{"Submitted": true}'
AND expense_reports.status @> '{"Approved": false}'
AND expense_reports.status @> '{"Rejected": false}'
AND employees.approver = $1
GROUP BY expense_reports.report_id, employees.first_name, employees.last_name, employees.email, employees.user_id