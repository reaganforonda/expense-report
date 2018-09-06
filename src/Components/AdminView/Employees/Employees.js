import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export class Employees extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return(
            <div className='employees'>
                Employees
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company,
        employees: state.companyReducer.employees
    }
}

export default connect(mapStateToProps, {})(withRouter(Employees));