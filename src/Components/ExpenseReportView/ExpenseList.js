import React from'react';
import * as util from '../../utilities/generalUtilities'

export default function ExpenseList (props) {
    
    let expenseList = props.expenses.map((expense) => {
        return (
            <div className='expense-item' key = {expense.expense_id}>
                <div>{expense.expense_id}</div>
                {/* <div>{util.formatDate(expense.expense_date)}</div> */}
                <div>{expense.merchant}</div>
                <div>{util.formatCurrency(parseFloat(expense.amount))}</div>
                <div>{expense.comment}</div>
                <div>{expense.category}</div>
                <div>{expense.report_id}</div>
                <div><button type='button'>Edit</button></div>
                <div><input onChange={()=>props.handleCheckbox(expense.expense_id)}type='checkbox' id='expense-add-to-report'/></div>
            </div>
        )
    })


    return (
        <div className='expense-list'>
            <div className='exp-list-header'>
                <h2>Expense ID</h2>
                <h2>Expense Date</h2>
                <h2>Merchant</h2>
                <h2>Amount</h2>
                <h2>Comment</h2>
                <h2>Category</h2>
                <h2>Report ID</h2>
                <div>Edit</div>
                <div>Select</div>
                
            </div>
            {expenseList}
        </div>
    )
}