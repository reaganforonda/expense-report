import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as util from '../../../utilities/generalUtilities';
import DepartmentDropdown from '../../DropdownMenus/DepartmentDropdown';
import {loadEmployees, loadDepartments} from '../../../ducks/companyReducer';
import axios from 'axios';
import Loading from '../../Loading/Loading';

export class AddEmployeeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            userID: this.props.user.user_id,
            companyID: this.props.company.company_id,
            firstName: '',
            lastName: '',
            department: '',
            title: '',
            workPhone: '',
            email: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount(){
        this.props.loadDepartments(this.props.company.company_id, this.props.user.user_id)
    }

    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSelect(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();

        let employee = {
            company: this.state.companyID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            department: this.state.department,
            title: this.state.title,
            workPhone: this.state.workPhone,
            email: this.state.email
        }

        console.log(employee);
    }

    resetForm() {
        this.setState({
            firstName: '',
            lastName: '',
            department: '',
            title: '',
            workPhone: '',
            email: ''
        })
    }

    render(){
        let disabled = ((this.state.firstName.length < 1) || (this.state.lastName.length < 1) || (this.state.department === '') || (this.state.title.length < 1) || (this.state.workPhone.length < 1) || (!util.validEmail(this.state.email)))
        return (
            this.props.departmentLoading ? <Loading/> : (
            <div className='employee-form'>
                <form className='form'>
                    <div className='form-row'>
                        <input type='text' name='firstName' value={this.state.firstName} onChange={(e)=>this.handleInputChange(e)} 
                            placeholder='First Name'/>
                    </div>
                    <div className='form-row'>
                        <input type='text' name='lastName' value={this.state.lastName} onChange={(e)=>this.handleInputChange(e)} 
                            placeholder='Last Name'/>
                    </div>
                    <div className='form-row'>
                        <DepartmentDropdown departments={this.props.departments} handleSelect={this.handleSelect}/>
                    </div>
                    <div className='form-row'>
                        <input type='text' name='title' value={this.state.title} onChange={(e)=>this.handleInputChange(e)} 
                            placeholder='Title'/>
                    </div>
                    <div className='form-row'>
                        <input type='text' name='workPhone' value={this.state.workPhone} onChange={(e)=>this.handleInputChange(e)} 
                            placeholder='Work Phone'/>
                    </div>
                    <div className='form-row'>
                        <input type='email' name='email' value={this.state.email} onChange={(e)=>this.handleInputChange(e)} 
                            placeholder='Email'/>
                    </div>
                    <div className='form-row'>
                        <button disabled={disabled} onClick={(e)=>this.handleSubmit(e)}>Add Employee</button>
                    </div>
                </form>
            </div>)
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company,
        departments : state.companyReducer.departments,
        departmentLoading: state.companyReducer.departmentLoading
    }
}

export default connect(mapStateToProps, {loadEmployees, loadDepartments})(withRouter(AddEmployeeForm))