import React from 'react';
import {withRouter} from 'react-router-dom';
import RegisterHeader from './RegisterHeader';

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            firstName: '',
            lastName: '',
            email: '',
            pw: '',
            confirmPW: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }


    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    createAccount(e) {
        e.preventDefault();
    }

    loginRedirect(e) {
        e.preventDefault();

        this.props.history.push('/login');
    }

    render() {
        return (
            <div className='regsiter'>
                <RegisterHeader login={this.loginRedirect}/>
                <main className='main'>
                    <div className='form-container'>
                        <form className='register-form'>
                            <div className='form-row'>
                                <input required type='text' name="firstName" value={this.state.firstName} placeholder='First Name' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <div className='form-row'>
                                <input required type='text' name="lastName" value={this.state.lastName} placeholder='Last Name' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <div className='form-row'>
                                <input required type='email' name='email' value={this.state.email} placeholder='Email' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <div className='form-row'>
                                <input required type='password' name='pw' value={this.state.pw} maxLength={25} placeholder='Password' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <div className='form-row'>
                                <input required type='password' name='confirmPW' value={this.state.confirmPW} maxLength={25} placeholder='Confirm Password' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <button onClick={(e)=>this.createAccount(e)}>Create An Account</button>
                        </form>
                    </div>
                </main>
                
            </div>
        )
    }
}

export default withRouter(Register);