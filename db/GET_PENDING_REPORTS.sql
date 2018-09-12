select expense_reports.report_id, expense_reports.report_number, expense_reports.report_date, expense_reports.description, expense_reports.status, expense_reports.employee, employees.first_name, employees.last_name, employees.email, employees.user_id, sum(expenses.amount) as total from expense_reports
join employees on employees.employee_id = expense_reports.employee
join expenses on expenses.report_id = expense_reports.report_id
where expense_reports.status @> '{"Submitted": true}'
and employees.approver = $1
group by expense_reports.report_id, employees.first_name, employees.last_name, employees.email, employees.user_id