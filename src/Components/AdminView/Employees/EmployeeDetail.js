import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import DepartmentDropdown from '../../DropdownMenus/DepartmentDropdown';
import {loadEmployees,selectEmployee} from '../../../ducks/companyReducer';
import EmployeeAcct from './EmployeeAcct';
import EmployeeDropdown from '../../DropdownMenus/EmployeeDropdown';

export class EmployeeDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            companyID: '',
            employee_id: '',
            firstName:'',
            lastName: '',
            title: '',
            department: '',
            workPhone: '',
            email: '',
            userID: '',
            lockMode: true,
            btnText: 'Edit',
            displayOptions: false,
            displayDetail: true,
            approvers: [],
            approver: ''
            
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDisplayOptions = this.handleDisplayOptions.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleCancelOptions = this.handleCancelOptions.bind(this);
        this.selectApprover = this.selectApprover.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/employees?companyID=${this.props.user.company}&filter=${'approver'}`).then((result)=> {
            this.setState({approvers : result.data})
        }).catch((err) => {
            console.log(err);
        })
    }

    static getDerivedStateFromProps(props, state){
        if(props.selectedEmployee) {
            if(props.selectedEmployee.employee_id !== state.employee_id) {
                return {
                    companyID : props.selectedEmployee.company,
                    employee_id: props.selectedEmployee.employee_id,
                    department: props.selectedEmployee.department,
                    firstName: props.selectedEmployee.first_name,
                    lastName: props.selectedEmployee.last_name,
                    title: props.selectedEmployee.title,
                    email: props.selectedEmployee.email,
                    userID: props.selectedEmployee.user_id,
                    workPhone: props.selectedEmployee.work_phone,
                    approver: props.selectedEmployee.approver
                }
            }
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    selectApprover(e) {
        this.setState({approver: e.target.value})
    }

    handleSaveEdit(e) {
        e.preventDefault();
        if(this.state.lockMode === true){
            this.setState({lockMode: false, btnText: "Save"})
        } else if (this.state.lockMode === false){
            let updatedEmployee ={
                company: this.state.companyID,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                title: this.state.title,
                department: this.state.department,
                workPhone: this.state.workPhone,
                email: this.state.email,
                user_id: this.state.userID,
                user: this.props.user,
                approver: this.state.approver
            }

            axios.put(`/api/employees?employeeID=${this.state.employee_id}`, updatedEmployee).then((result) => {
                this.props.loadEmployees(this.props.company.company_id, this.props.user.user_id);
                
                this.setState({lockMode: true, btnText: "Edit"});
            }).catch((err) => {
                console.log(err.response);
                
            })
        }
    }

    handleDisplayOptions () {
        if(this.state.displayOptions===false ) {
            this.setState({displayDetail: false, displayOptions: true})
        } else if (this.state.displayOptions===true) {
            this.setState({displayDetail: true, displayOptions: false})
        }
    }

    handleCancel(){
        if(this.state.lockMode === false) {
            this.setState({lockMode: true})
        }
    }

    handleCancelOptions(){
        if(this.state.displayOptions === true) {
            this.setState({displayOptions: false, displayDetail: true});
        } 
    }

    render(){ 
        return (
            this.props.selectedLoading || this.props.departmentLoading ? <Loading/> :(
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
                            <EmployeeDropdown disabled={this.state.lockMode} selectApprover={this.selectApprover} employees={this.state.approvers}/>
                        </div>
                        <div className='form-row'>
                            <div className='row-buttons'>
                            {
                                this.state.lockMode ? null : (<button type='button' onClick={()=>this.handleCancel()}>Cancel</button>)
                            }
                                <button onClick={(e)=>this.handleSaveEdit(e)}>{this.state.btnText}</button>
                                {
                                    this.state.lockMode ?(
                                        <button type='button' onClick={()=>this.handleDisplayOptions()}>Account Options</button>
                                    ) : null
                                }
                            </div>
                        </div>
                    </form>
                    ) : null
                }
                    {
                        this.state.displayOptions ? <EmployeeAcct cancel={this.handleCancelOptions}employee={this.props.selectedEmployee}/> : null
                    }
                </div>
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company,
        departments: state.companyReducer.departments,
        departmentLoading : state.companyReducer.departmentLoading,
        selectedEmployee: state.companyReducer.selectedEmployee,
        selectedLoading: state.companyReducer.selectedLoading
    }
}

export default connect(mapStateToProps, {loadEmployees})(withRouter(EmployeeDetail))