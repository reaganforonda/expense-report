import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import DepartmentDropdown from '../../DropdownMenus/DepartmentDropdown';

export class EmployeeDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            employee_id: '',
            firstName:'',
            lastName: '',
            title: '',
            department: '',
            workPhone: '',
            email: '',
            lockMode: true,
            btnText: 'Edit',
            displayOptions: false,
            displayDetail: true,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        if(props.selectedEmployee) {
            if(props.selectedEmployee.employee_id !== state.employee_id) {
                return {
                    employee_id: props.selectedEmployee.employee_id,
                    department: props.selectedEmployee.name,
                    firstName: props.selectedEmployee.first_name,
                    lastName: props.selectedEmployee.last_name,
                    title: props.selectedEmployee.title,
                    email: props.selectedEmployee.email,
                    workPhone: props.selectedEmployee.work_phone
                }
            }
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSaveEdit(e) {
        e.preventDefault();
        if(this.state.lockMode === true){
            this.setState({lockMode: false, btnText: "Save"})
        } else if (this.state.lockMode === false){
            let updatedEmployee ={
                employee_id: this.state.employee_id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                title: this.state.title,
                department: this.state.department,
                workPhone: this.state.workPhone,
                email: this.state.email,
            }

            console.log(updatedEmployee);
            
        }
    }

    handleDisplayOptions () {
        if(this.state.displayOptions===false ) {
            this.setState({displayDetail: false, displayOptions: true})
        } else if (this.state.displayOptions===true) {
            this.setState({displayDetail: true, displayOptions: false})
        }
    }

    render(){ 
        
        return (
            this.props.selectedLoading ? <Loading/> :(
            <div className='employee-detail'>
                <div className='employee-profile'>
                {
                    this.state.displayDetail ? (
                        <form className='profile-form'>
                        <div className='form-row'>
                            <input name='title' type='text' value={this.state.title} disabled={this.state.lockMode} onChange={(e)=> this.handleInputChange(e)} />
                        </div>
                        <div className='form-row'>
                            <DepartmentDropdown disabled={this.state.lockMode} handleSelect={this.handleInputChange} departments={this.props.departments}/>
                        </div>
                        <div className='form-row'>
                            <input name='firstName' type='text' value={this.state.firstName} disabled={this.state.lockMode} onChange={(e)=> this.handleInputChange(e)} />
                        </div>
                        <div className='form-row'>
                            <input name='lastName' type='text' value={this.state.lastName} disabled={this.state.lockMode} onChange={(e)=> this.handleInputChange(e)} />
                        </div>
                        
                        <div className='form-row'>
                            <input name='email' type='email' value={this.state.email} disabled={this.state.lockMode} onChange={(e)=> this.handleInputChange(e)} />
                        </div>
                        <div className='form-row'>
                            <input name='workPhone' type='text' value={this.state.workPhone} disabled={this.state.lockMode} onChange={(e)=> this.handleInputChange(e)} />
                        </div>
                        <div className='form-row'>
                            <div className='row-buttons'>
                                <button onClick={(e)=>this.handleSaveEdit(e)}>{this.state.btnText}</button>
                                <button type='button' onClick={()=>this.handleDisplayOptions()}>Account Options</button>
                            </div>
                        </div>
                    </form>
                    ) : null
                }


                    {
                        this.state.displayOptions ? (<div className='employee-account-info'>
                            <div>
                                Active Account
                            </div>
                            <div>
                                Rights
                            </div>
                            <div>
                                Reset Password
                            </div>
                            <div>
                                Deactive Account
                            </div>
                            <div>
                                <button type='button' onClick={()=>this.handleDisplayOptions()}>Cancel</button>
                                <button type='button'>Save</button>
                            </div>
                        </div>) :null
                    }
                    
                </div>
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        departments: state.companyReducer.departments,
        selectedEmployee: state.companyReducer.selectedEmployee,
        selectedLoading: state.companyReducer.selectedLoading
    }
}

export default connect(mapStateToProps, {})(withRouter(EmployeeDetail))