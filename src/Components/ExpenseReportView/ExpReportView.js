import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../Loading/Loading';
import ExpReportReports from './ExpReportReports';
import ExpReportExpenses from './ExpReportExpenses';
import ExpReportViewHeader from './ExpReportViewHeader';

export class ExpReportView extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='exp-report-view'>
                <ExpReportViewHeader/>
                <main>
                    <Switch>
                        <Route exact path='/dashboard/expense/reports' component={ExpReportReports}/>
                        <Route exact path='/dashboard/expense/expenses' component={ExpReportExpenses}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {})(withRouter(ExpReportView));