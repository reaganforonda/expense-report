SELECT expense_reports.report_id, expense_reports.employee, expense_reports.report_date, expense_reports.description, expense_reports.status, coalesce(sum(expenses.amount), 0) as amount from expense_reports
full outer join expenses on expenses.report_id = expense_reports.report_id
where status  @> '{"Submitted": false}'
and expense_reports.employee = $1
group by expense_reports.report_id