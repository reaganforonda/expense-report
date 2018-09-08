import React from 'react';
import * as util from '../../../utilities/generalUtilities';

export default class EmployeeAcct extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            tempPassword: '',
            displayTempPW: false,
            adminRight: false,
            approveRight: false,
            expenseRight: false
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

    handleCreateNewUser(){
        
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
                            <input type='email' value={this.props.employee.email} onChange={(e)=>this.handleInputChange(e)}/>
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
                            <button>Create Account</button>
                        </div>
                    </form>
                </div>
            )
        )
    }
}