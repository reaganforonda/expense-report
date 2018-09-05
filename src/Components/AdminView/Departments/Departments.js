import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadDepartments} from '../../../ducks/companyReducer';

export class Departments extends React.Component{
    constructor(props){
        super(props);

        this.state={
            departments: '',
            displayForm: false
        }

        this.displayAddForm = this.displayAddForm.bind(this);
        this.handleAddDepartment = this.handleAddDepartment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        this.props.loadDepartments(this.props.company.company_id, this.props.user.user_id)
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

    displayAddForm(){
        if(this.state.displayForm === false) {
            this.state.displayForm === true
        } else if(this.state.displayForm === true ) {
            this.state.displayForm === false
        }
    }

    handleAddDepartment(e) {
        e.preventDefault();

        this.displayAddForm();
    }

    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        return (
            <div className='department'>
                {
                    this.state.displayAddForm ? null : (
                    <header>
                        <button onClick={()=>this.displayAddForm()}>Add New Department</button>
                    </header>
                    )
                }               
                <main className='department-main'>
                {
                    !this.state.displayAddForm ? null : (
                        <div className='add-department'>
                            <form className='add-department-form'>
                                <div className='add-form-row'>
                                    <input name='name' placeholder='Department Name'/>
                                </div>
                                <div className='add-form-row'>
                                    <button>Add Department</button>
                                </div>
                            </form>
                        </div>
                    )
                }
            
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