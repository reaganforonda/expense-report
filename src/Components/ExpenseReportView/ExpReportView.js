import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../Loading/Loading';
import ExpReportMain from './ExpReportMain';


export class ExpReportView extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='exp-report-view'>
                <header className='exp-report-header'>
                    <button>Create New Expense Report</button>
                </header>
                <main>
                    <Switch>
                        <Route exact path='/dashboard/expense' component={ExpReportMain}/>
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