import React from 'react';
import * as util from '../../utilities/generalUtilities';
import axios from 'axios';
import {connect} from 'react-redux';
import {loadPendingReports} from '../../ducks/expenseReducer';

export class PendingList extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayDetails: false,
            expenses: []
        }

        this.getExpenses = this.getExpenses.bind(this);
        this.closeDetail = this.closeDetail.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
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

    handleApprove(e, reportID){
        e.preventDefault();
        axios.put(`/api/expense/${reportID}?approve=true`).then((result) => {
            this.props.loadPendingReports(this.props.user.employee_id);
        }).catch(err=> {
            console.log(err);
        })
    }

    handleReject(e) {

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
                <div className='pending-report-item' key={report.report_id}>
                    <div>{report.report_number}</div>
                    <div>{report.first_name} {report.last_name}</div>
                    <div>{util.formatDate(report.report_date)}</div>
                    <div>{report.description}</div>
                    <div>{util.formatCurrency(parseFloat(report.total))}</div>
                    <div><button onClick={()=>this.getExpenses(report.report_id)} type='button'>Details</button></div>
                    <div><button type='button'>Approve</button></div>
                    <div><button type='button'>Reject</button></div>
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

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {loadPendingReports})(PendingList);