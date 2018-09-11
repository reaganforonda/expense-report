SELECT * 
FROM EXPENSES
WHERE ($1 IS NULL OR employee = $1)
AND ($2 IS NULL OR report_id = $2)
AND ($3 IS NULL OR expense_id = $3);