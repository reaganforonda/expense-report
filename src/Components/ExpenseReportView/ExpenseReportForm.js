import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export class ExpenseReportForm extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='expense-form'>
            
            
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company
    }
}

export default connect(mapStateToProps, {})(withRouter(ExpenseReportForm));