import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadEmployees} from '../../../ducks/companyReducer';
import Loading from '../../Loading/Loading';

export class EmployeeList extends React.Component{
    constructor(props){
        super(props);

        this.state={}
    }

    componentDidMount(){
        this.props.loadEmployees(this.props.companyID)
    }

    render(){
        let employees = [];
        if(this.props.employeesLoading === false) {
            employees = this.props.employees.map((employee, index) => {
                return (
                    <div className='employee-row' key={~~employee.employee_id + index}>
                        <div>{employee.first_name}</div>
                        <div>{employee.last_name}</div>
                        <div>{employee.department}</div>
                        <div>{employee.title}</div>
                        <div>{employee.email}</div>
                        <div>{employee.work_phone}</div>
                    </div>
                )
            })
        }
        return (
            <div className='employee-list'>
                {employees}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company,
        departments: state.companyReducer.departments,
        employees : state.companyReducer.employees,
        employeesLoading : state.companyReducer.employeesLoading
    }
}

export default connect(mapStateToProps, {loadEmployees})(withRouter(EmployeeList))