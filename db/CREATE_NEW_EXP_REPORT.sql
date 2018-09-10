INSERT INTO expense_reports
(employee, report_date, description, report_number, approved)
VALUES
($1, $2, $3, $4, false);