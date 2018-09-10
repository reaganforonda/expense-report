SELECT expense_reports.report_id, expense_reports.report_number, expense_reports.employee, expense_reports.report_date,expense_reports.description, expense_reports.status, sum(expenses.amount) as amount from expense_reports
FULL OUTER JOIN expenses ON expenses.report_id = expense_reports.report_id
WHERE ($1 IS NULL OR expenses.employee=$1)
AND ($2 IS NULL OR expense_reports.report_id = $2)
GROUP BY expense_reports.report_id
