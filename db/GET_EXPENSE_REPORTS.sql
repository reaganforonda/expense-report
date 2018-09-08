select expense_reports.report_id, expense_reports.report_number, expense_reports.employee, expense_reports.report_date, expense_reports.description, expense_reports.approved, expenses.expense_id, expenses.expense_date, expenses.merchant, expenses.amount, expenses.category, expenses.comment, expenses.tag, expenses.img
from expense_reports
full outer join expenses on expenses.report_id = expense_reports.report_id
WHERE expense_reports.employee = $1