import React from 'react';
import {connect} from 'react-redux';
import {loadExpenses} from '../../ducks/expenseReducer';
import * as util from '../../utilities/generalUtilities';

export class ReportDetail extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            expenses : []
        }
    }

    static getDerivedStateFromProps(props, state){
        if(state.expenses.length === 0) {
            return {
                expenses: props.expenses
            }
        }
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
                    <div>{expense.report_id}</div>
                    <div><button type='button'>Delete</button></div>
                </div>)
            })
        }

        return (
            <div className='report-detail-overlay'>
                <div className='report-detail-modal'>
                    <header>
                        <div>Report ID: {this.props.report.report_id}</div>
                        <div>Report_Number</div>
                        <div>Report Date</div>
                        <div>Description</div>
                    </header>
                    <main>
                        {expenseList}
                        <div className='report-detail-btns'>
                            <button onClick={()=>this.props.cancel()} type='button'>Cancel</button>
                            <button type='button'>Save</button>
                            <button type='button'>Submit </button>
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