import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../../Loading/Loading';
import axios from 'axios';

export class EmployeeDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            employee_id: '',
            firstName:'',
            lastName: '',
            title: '',
            department: '',
            work_phone: '',
            email: '',
        }
    }

    componentDidMount = async () => {
        await axios.get(`/api/employees?employeeID=${this.props.employee.employee}`)
    }


    render(){ 
        return (
            <div className='employee-detail'>
            
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps, {})(withRouter(EmployeeDetail))