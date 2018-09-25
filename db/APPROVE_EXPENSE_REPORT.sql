UPDATE expense_reports
SET status = '{"Approved": true, "Rejected": false, "Submitted": true}'
WHERE report_id = $1