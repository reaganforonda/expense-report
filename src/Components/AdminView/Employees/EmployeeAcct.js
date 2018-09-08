import React from 'react';
import * as util from '../../../utilities/generalUtilities';
import axios from 'axios';
import {connect} from 'react-redux';

export class EmployeeAcct extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            tempPassword: '',
            displayTempPW: false,
            adminRight: false,
            approveRight: false,
            expenseRight: false,
            email: this.props.employee.email
        }

        this.handleGenerateTempPW = this.handleGenerateTempPW.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e) {
        this.setState({[e.target.name] : e.target.checked})
    }


    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleGenerateTempPW(){
        this.setState({tempPassword: util.generateRandomString(5), displayTempPW: true})
    }

    handleCreateNewUser(e){
        e.preventDefault();

        let newUser = {
            account_type: 1,
            email: this.state.email,
            firstName: this.props.employee.first_name,
            lastName: this.props.employee.last_name,
            temppassword: this.state.tempPassword,
            rights: {
                "Admin": this.state.adminRight,
                "Approve" : this.state.approveRight,
                "Expense" : this.state.expenseRight
            },
            adminUser: this.props.user
        }

        console.log(newUser);

        axios.post(`/api/user/register`, newUser).then((result) => {
            let updateEmployee = {
                company: this.props.employee.company,
                firstName: this.props.employee.first_name,
                lastName: this.props.employee.last_name,
                title: this.props.employee.title,
                department: this.props.employee.department,
                workPhone: this.props.employee.work_phone,
                email: this.props.employee.email,
                user: this.props.user,
                user_id : ~~result.data
            }

            axios.put(`api/employees?employeeID=${this.props.employee.employee_id}`, updateEmployee).then((result) => {
                this.props.cancel();
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            this.props.employee.user_id ? (
            <div className='employee-account-info'>
                <div>
                    <h2>Expenster Account Options</h2>
                </div>
                <div>
                    Rights
                </div>
                <div>
                    Reset Password
                </div>
                <div>
                    
                </div>
            </div>): (
                <div className='create-account-employee'>
                   <div>
                        <h2>Create Expenster Account</h2>
                    </div>
                    <form className='create-account-form'>
                        <div className='form-create-employee'>
                            <div>User Name (Email)</div>
                            <input type='email' value={this.state.email} onChange={(e)=>this.handleInputChange(e)}/>
                        </div>
                        <div className='form-create-employee'>
                            <div>Account Rights</div>
                            <div>
                                <div>
                                    <input id='admin-right' name='adminRight' type='checkbox' checked={this.state.adminRight} onChange={(e)=>this.handleCheckboxChange(e)}/>
                                    <label  htmlFor='admin-right'>Administration Rights</label>
                                </div>
                                <div>
                                    <input id='approve-right' name='approveRight' type='checkbox' checked={this.state.approveRight} onChange={(e)=>this.handleCheckboxChange(e)}/>
                                    <label  htmlFor='approve-right'>Expense Report Approval Rights</label>
                                </div>
                                <div>
                                    <input id='expense-right' name='expenseRight' type='checkbox' checked={this.state.expenseRight} onChange={(e)=>this.handleCheckboxChange(e)}/>
                                    <label  htmlFor='expense-right'>Expense Report Creation Rights</label>
                                </div>
                            </div>
                        </div>
                        <div className='form-create-employee'>
                            <button type='button' onClick={()=>this.handleGenerateTempPW()}>Generate Temp Password</button>
                            {
                                this.state.displayTempPW ? <div>{this.state.tempPassword}</div> : null
                            }
                        </div>
                        <div className='form-create-employee'>
                            <button type='button' onClick={()=>this.props.cancel()}>Cancel</button>
                            <button onClick={(e)=>this.handleCreateNewUser(e)}>Create Account</button>
                        </div>
                    </form>
                </div>
            )
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {})(EmployeeAcct);