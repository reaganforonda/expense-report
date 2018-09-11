SELECT * 
FROM EXPENSES
FULL OUTER JOIN expense_reports ON expense_reports.employee = expenses.employee
WHERE expenses.report_id IS NULL or expense_reports.status @> '{"Submitted": false}'
AND ($1 IS NULL OR expenses.employee = $1)