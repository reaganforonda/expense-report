import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../Loading/Loading';
import ExpReportReports from './ExpReportReports';
import ExpReportExpenses from './ExpReportExpenses';
import ExpReportViewHeader from './ExpReportViewHeader';
import {loadExpenseReports, loadExpenses} from '../../ducks/expenseReducer';

export class ExpReportView extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    componentDidMount(){
        this.props.loadExpenseReports(this.props.user.employee_id);
        this.props.loadExpenses(this.props.user.employee_id)
    }

    render(){
        return (
            <div className='exp-report-view'>
                <ExpReportViewHeader/>
                
                <main>
                    {
                        this.props.reportLoading && this.props.expensesLoading ? <Loading/> : (
                        <Switch>
                            <Route exact path='/dashboard/expense/reports' component={ExpReportReports}/>
                            <Route exact path='/dashboard/expense/expenses' component={ExpReportExpenses}/>
                        </Switch>
                        )
                    }
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        reportLoading: state.expenseReducer.reportLoading,
        expensesLoading: state.expenseReducer.expensesLoading,
    }
}

export default connect(mapStateToProps, {loadExpenseReports, loadExpenses})(withRouter(ExpReportView));