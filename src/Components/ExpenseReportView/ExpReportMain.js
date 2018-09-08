import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export class ExpReportMain extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='exp-main'>
                <header className='exp-report-header'>
                    <button>Create New Expense Report</button>
                </header>
                <main >
                    
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        
    }
}

export default connect(mapStateToProps, {})(withRouter(ExpReportMain));