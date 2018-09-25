UPDATE expense_reports
SET status = '{"Approved": false, "Rejected": true, "Submitted": true}'
WHERE report_id = $1