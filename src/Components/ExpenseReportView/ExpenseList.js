import React from'react';

export default function ExpenseList (props) {
    
    let expenseList = props.expenses.map((expense) => {
        return (
            <div className='expense-item' key = {expense.expense_id}>
                {expense.expense_id}
                {expense.expense_date}
                {expense.merchant}
                {expense.amount}
                {expense.category}
                {expense.comment}
                {expense.report_id}
            </div>
        )
    })


    return (
        <div className='expense-list'>
            <div>
                <h2>Expense ID</h2>
                <h2>Expense Date</h2>
                <h2>Comment</h2>
                <h2>Merchant</h2>
                <h2>Amount</h2>
                <h2>Report ID</h2>
            </div>
            {expenseList}
        </div>
    )
}