import React from 'react';
import {connect} from 'react-redux';
import {loadExpenses} from '../../ducks/expenseReducer';
import * as util from '../../utilities/generalUtilities';

export class ReportDetail extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            expenses : [],
        }

        this.handleReportSubmit = this.handleReportSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        if(state.expenses.length === 0) {
            return {
                expenses: props.expenses
            }
        }
    }

    handleReportSubmit(e) {
        e.preventDefault;
    }

    render(){
        let expenseList = []

        if(this.state.expenses) {
            expenseList = this.state.expenses.map((expense, index) => {
                return (
                <div className='expense-item-list' key={expense.expense_id}>
                    <div>{expense.expense_id}</div>
                    <div>{util.formatDate(expense.expense_date)}</div>
                    <div>{expense.merchant}</div>
                    <div>{util.formatCurrency(parseFloat(expense.amount))}</div>
                    <div>{expense.comment}</div>
                    <div>{expense.category}</div>
                </div>)
            })
        }

        return (
            <div className='report-detail-overlay'>
                <div className='report-detail-modal'>
                    <header className='report-detail-modal-header'>
                        <div>Report Number: {this.props.report.report_number}</div>
                        <div>Report Date: {this.props.report.report_date}</div>
                        <div>Description: {this.props.report.description}</div>
                    </header>
                    <main className='report-detail-main'>
                        <div className='report-detail-expense-list-header'>
                            <h2>Expense ID</h2>
                            <h2>Expense Date</h2>
                            <h2>Merchant</h2>
                            <h2>Amount</h2>
                            <h2>Comment</h2>
                            <h2>Category</h2>
                        </div>
                            {expenseList}
                        <div className='report-detail-btns'>
                            <button onClick={()=>this.props.cancel()} type='button'>Cancel</button>
                            <button onClick={(e)=>this.handleReportSubmit(e)} type='button'>Submit </button>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        expenseReports: state.expenseReducer.expenseReports,
        reportLoading: state.expenseReducer.reportLoading,
        expenses: state.expenseReducer.expenses
    }
}

export default connect(mapStateToProps, {loadExpenses})(ReportDetail);