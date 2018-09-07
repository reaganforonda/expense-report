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
            work_phone: '',
            email: '',
            lockMode: true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.selectedEmployee) {

        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){ 
        return (
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
                            <input name='lastName' type='text' value={this.state.lasttName} disabled={this.state.lockMode} onChange={(e)=> this.handleInputChange(e)} />
                        </div>
                        <div className='form-row'>
                            <div className='row-buttons'>
                                <button>Save/Edit</button>
                                <button>Account Options</button>
                            </div>
                        </div>
                    </form>
                    <div className='employee-account-info'>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps, {})(withRouter(EmployeeDetail))