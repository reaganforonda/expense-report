import React from'react';

export default function ExpenseList (props) {
    let expenseList = props.expenses.map((report) => {
        return (
            <div className='expense-item' key = {expense.expense_id}>
                {expense.expense_id}
                {expense.expense_date}
                {expense.merchant}
                {expense.amount}
                {expense.category}
                {expense.comment}
            </div>
        )
    })
}