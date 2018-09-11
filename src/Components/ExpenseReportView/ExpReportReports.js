import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ReportFormModal from './ReportFormModal';
import ReportList from './ReportList';

export class ExpReportReports extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayReportForm: false
        }

        this.handleDisplayReportForm = this.handleDisplayReportForm.bind(this);
    }

    handleDisplayReportForm(){
        if(this.state.displayReportForm === false){
            this.setState({displayReportForm: true})
        } else {
            this.setState({displayReportForm: false})
        }
    }

    render(){
        return (
            <div className='exp-main'>
                <header className='exp-report-header'>
                    {
                        this.state.displayReportForm ? null : <button onClick={()=>this.handleDisplayReportForm()}type='button'>New Expense Report</button>
                    }
                    {
                        this.state.displayReportForm ? <ReportFormModal user={this.props.user} closeForm={this.handleDisplayReportForm}/> : null
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
                    <ReportList reports={this.props.expenseReports} />
                </main>
            </div>
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

export default connect(mapStateToProps, {})(withRouter(ExpReportReports));