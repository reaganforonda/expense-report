SELECT * 
From expense_reports
FULL OUTER JOIN expenses 
ON expenses.report_id = expense_reports.report_id
WHERE expense_reports.employee = $1