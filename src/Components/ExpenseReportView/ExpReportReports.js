import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ReportFormModal from './ReportFormModal';
import ReportList from './ReportList';
import {loadExpenseReports, loadExpenses} from '../../ducks/expenseReducer';
import Loading from '../Loading/Loading';
import ReportDetail from './ReportDetail';
import axios from 'axios';

export class ExpReportReports extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayReportForm: false,
            displayModal: false,
            expenses: [],
            report: ''
        }

        this.handleDisplayReportForm = this.handleDisplayReportForm.bind(this);
        this.selectReport = this.selectReport.bind(this);
        this.hideDetailModal = this.hideDetailModal.bind(this);
    }

    componentDidMount(){
        this.props.loadExpenseReports(this.props.user.employee_id);
    }

    handleDisplayReportForm(){
        if(this.state.displayReportForm === false){
            this.setState({displayReportForm: true})
        } else {
            this.setState({displayReportForm: false})
        }
    }

    selectReport(reportID, report) {
        this.setState({displayModal: true, report: report});
        axios.get(`/api/expenses?employeeID?=${this.props.user.employee}&reportID=${reportID}`).then((expense) => {
            console.log(expense.data);
            this.setState({expenses: expense.data});
        }).catch((err) => {
            console.log(err)
        })
    }

    hideDetailModal(){
        this.setState({displayModal: false});
    }

    render(){
        return (
            this.props.reportLoading ? <Loading /> : (
            <div className='exp-main'>
                <header className='exp-report-header'>
                    {
                        this.state.displayReportForm ? null : <button onClick={()=>this.handleDisplayReportForm()}type='button'>New Expense Report</button>
                    }
                    {
                        this.state.displayReportForm ? <ReportFormModal  user={this.props.user} closeForm={this.handleDisplayReportForm}/> : null
                    }
                    {
                        this.state.displayReportForm ? null : (
                            <div className='header-filter'>
                            <div>Filter</div>
                            <button>All Reports</button>
                            <button>Approved</button>
                            <button>Pending</button>
                            <button>Not Approved</button>
                        </div>
                        )
                    }

                </header>
                <main >
                    <ReportList selectReport={this.selectReport} reports={this.props.expenseReports} />
                    {
                        this.state.displayModal ? <ReportDetail report={this.state.report} expense={ this.state.expenses} cancel={this.hideDetailModal}/> : null
                    }
                </main>
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        expenseReports: state.expenseReducer.expenseReports,
        reportLoading: state.expenseReducer.reportLoading
    }
}

export default connect(mapStateToProps, {loadExpenseReports, loadExpenses})(withRouter(ExpReportReports));