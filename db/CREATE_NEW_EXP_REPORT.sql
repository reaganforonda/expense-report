INSERT INTO expense_reports
(employee, report_date, description, approved)
VALUES
($1, $2, $3, false);