import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as util from '../../../utilities/generalUtilities';


export class AddEmployeeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            firstName: '',
            lastName: '',
            department: '',
            title: '',
            workPhone: '',
            email: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render(){
        return (
            <div className='employee-form'>
                <form className='form'>
                    <div className='form-row'>
                        <input type='text' name='firstName' value={this.state.firstName} />
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company
    }
}

export default connect(mapStateToProps, {loadCompany})(withRouter(AddEmployeeForm))