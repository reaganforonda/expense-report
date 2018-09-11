UPDATE expense_reports
SET status = '{"Approved": false, "Rejected":false, "Submitted": true}'
WHERE employee = $1
AND report_id =$2