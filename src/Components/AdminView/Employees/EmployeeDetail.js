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
            workPhone: '',
            email: '',
            lockMode: true,
            btnText: 'Edit'
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

        } else {

        }
    }

    render(){ 
        console.log(this.props.selectedEmployee)
        return (
            this.props.selectedLoading ? <Loading/> :(
            <div className='employee-detail'>
                <div className='employee-profile'>
                    <form className='profile-form'>
                        <div className='form-row'>
                            <input name='title' type='text' value={this.state.title} disabled={this.state.lockMode} onChange={(e)=> this.handleInputChange(e)} />
                        </div>
                        <div className='form-row'>
                            Department
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
                                <button>Account Options</button>
                            </div>
                        </div>
                    </form>
                    <div className='employee-account-info'>

                    </div>
                </div>
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        selectedEmployee: state.companyReducer.selectedEmployee,
        selectedLoading: state.companyReducer.selectedLoading
    }
}

export default connect(mapStateToProps, {})(withRouter(EmployeeDetail))