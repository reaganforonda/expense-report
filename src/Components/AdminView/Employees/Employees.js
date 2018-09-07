import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import AddEmployeeForm from './AddEmployeeeForm';
import EmployeeList from './EmployeeList';

export class Employees extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayForm: false
        }

        this.handleAddEmployeeButton = this.handleAddEmployeeButton.bind(this);
    }

    handleAddEmployeeButton() {
        if(this.state.displayForm === false) {
            this.setState({displayForm: true});
        } else {
            this.setState({displayForm: false});
        }
    }

    render(){
        return(
            <div className='employees'>
            {
                this.state.displayForm === false ? <div>
                <button onClick={()=>this.handleAddEmployeeButton()}>Add Employee</button>
                </div> : null
            }
                {
                    this.state.displayForm ? <AddEmployeeForm toggleForm={this.handleAddEmployeeButton}/> : null
                }
                <main>
                    <EmployeeList companyID={this.props.company.company_id} userID={this.props.user.user_id}/>
                </main>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company,
        employees: state.companyReducer.employees
    }
}

export default connect(mapStateToProps, {})(withRouter(Employees));