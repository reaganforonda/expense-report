import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadDepartments} from '../../../ducks/companyReducer';
import axios from 'axios';
import DepartmentList from './DepartmentList';

export class Departments extends React.Component{
    constructor(props){
        super(props);

        this.state={
            departments: '',
            displayForm: false,
            name: ''
        }

        this.displayAddForm = this.displayAddForm.bind(this);
        this.handleAddDepartment = this.handleAddDepartment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        
        if(props.departments) {
            if(props.departments.legnth !== state.departments.length) {
                return {
                    departments: props.departments
                }
            }
        }
    }

    displayAddForm(e){
        if(this.state.displayForm === false) {
            this.setState({displayForm: true})
        } else if(this.state.displayForm === true ) {
            this.setState({displayForm: false});
        }
    }

    handleAddDepartment(e) {
        e.preventDefault();
        let department = {
            name : this.state.name
        }

        axios.post(`/api/department?userID?=${this.props.user.user_id}&companyID=${this.props.company.company_id}`, department).then((result) => {
            this.props.loadDepartments(this.props.company.company_id, this.props.user.user_id);
            this.setState({name:'', displayForm: false})
        }).catch((err) => {
            console.log(err.response);
        })
        
    }       

    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        
        return (
            <div className='department'>
                {
                    this.state.displayForm ? null : (
                    <header>
                        <button onClick={(e)=>this.displayAddForm(e)}>Add New Department</button>
                    </header>
                    )
                }               
                <main className='department-main'>
                    {
                        !this.state.displayForm ? null : (
                            <div className='add-department'>
                                <form className='add-department-form'>
                                    <div className='add-form-row'>
                                        <input value={this.state.name} onChange={(e)=>this.handleInputChange(e)} name='name' placeholder='Department Name'/>
                                    </div>
                                    <div className='add-form-row'>
                                        <button onClick={(e)=>this.handleAddDepartment(e)}>Add Department</button>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                    <DepartmentList userID={this.props.user.user_id} companyID={this.props.company.company_id}/>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company,
        departments: state.companyReducer.departments
    }
}

export default connect(mapStateToProps, {loadDepartments})(withRouter(Departments));