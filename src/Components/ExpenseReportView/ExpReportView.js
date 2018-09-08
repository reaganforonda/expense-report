import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../Loading/Loading';
import ExpReportHeader from './ExpReportHeader';
import ExpReportMain from './ExpReportMain';
import ExpenseReportForm from './ExpenseReportForm';

export class ExpReportView extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='exp-report-view'>
                <ExpReportHeader/>
                <main>
                    <Switch>
                        <Route exact path='/dashboard/expense' component={ExpReportMain}/>
                        <Route path='/dashboard/expense/form' component={ExpenseReportForm}/>
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