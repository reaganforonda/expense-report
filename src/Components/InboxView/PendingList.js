import React from 'react';
import * as util from '../../utilities/generalUtilities';
import axios from 'axios';

export default class PendingList extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayDetails: false,
            expenses: []
        }

        this.getExpenses = this.getExpenses.bind(this);
    }

    getExpenses(reportID) {
        if(this.state.displayDetails===false) {
        axios.get(`/api/expenses?reportID=${reportID}`).then((result) => {
            this.setState({expenses: result.data, displayDetails: true});
        })} else {
            this.setState({displayDetails: false})
        }
    }

    closeDetail(){
        this.setState({displayDetails: false})
    }

    render(){
        let expenseList = '';

        if(this.state.expenses.length > 0) {
            expenseList = this.state.expenses.map((expense) => {
                return (
                    <div className='expense-list-item-pending' key={expense.expense_id}>
                        <div>{expense.expense_id}</div>
                        <div>{util.formatDate(expense.expense_date)}</div>
                        <div>{expense.merchant}</div>
                        <div>{util.formatCurrency(parseFloat(expense.amount))}</div>
                        <div>{expense.category}</div>
                        <div>{expense.comment}</div>
                        <div>{expense.tag}</div>
                        <div>{expense.img}</div>
                    </div>
                )
            })
        }

        let reports = this.props.pendingReports.map((report) => {
            
            return (
                <div onClick={()=>this.getExpenses(report.report_id)}className='pending-report-item' key={report.report_id}>
                    <div>{report.report_number}</div>
                    <div>{report.first_name} {report.last_name}</div>
                    <div>{util.formatDate(report.report_date)}</div>
                    <div>{report.description}</div>
                    <div>{util.formatCurrency(parseFloat(report.total))}</div>
                </div>
            )
        })

        return (
            <div className='pending-list'>
                {reports}
                
                    {this.state.displayDetails ? <div>{expenseList}<div><button onClick={()=>this.closeDetail()}>Close</button></div></div> : null}
                
            </div>
        )
    }
}