SELECT expenses.expense_id, expenses.report_id, expenses.employee, expenses.expense_date, expenses.merchant, expenses.amount, expenses.category, expenses.comment, expenses.tag, expenses.img, expense_reports.status
FROM EXPENSES
FULL OUTER JOIN expense_reports ON expense_reports.report_id = expenses.report_id
WHERE expenses.report_id IS NULL or expense_reports.status @> '{"Submitted": false}'
AND ($1 IS NULL OR expenses.employee = $1)