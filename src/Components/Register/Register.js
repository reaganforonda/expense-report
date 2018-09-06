import React from 'react';
import {withRouter} from 'react-router-dom';
import RegisterHeader from './RegisterHeader';
import axios from 'axios';
import * as util from '../../utilities/generalUtilities';

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
        this.loginRedirect = this.loginRedirect.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }


    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    createAccount(e) {
        e.preventDefault();
        
        let user = Object.assign({}, this.state);
        
        if(user.confirmPW === user.pw) {
            axios.post(`/api/auth/register`, user).then((result) => {
                this.resetForm();
                this.props.history.push('/login');
            }).catch((err) => {
                console.log(err.response);
                // TODO: 400 error for duplicate emails
            })
        }
    }

    loginRedirect(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }

    resetForm(){
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            pw: '',
            confirmPW: ''  
        })
    }

    render() {
        const validPW = (this.state.pw === this.state.confirmPW) && (this.state.confirmPW.length <=25 && this.state.pw.length <=25);
        const validEmail = util.validEmail(this.state.email) && this.state.email.length > 0;
        const submitDisabled = validPW && validEmail && this.state.pw.length > 0 && this.state.confirmPW.length > 0;
        
        return (
            <div className='register'>
                <RegisterHeader login={this.loginRedirect}/>
                <main className='main'>
                    <div className='form-container'>
                        <div className='form-header'> 
                            <h2>Sign Up</h2>
                        </div>
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
                            {
                                validPW ? null : (
                                    <div className='form-row'>
                                        <p>Password does not match</p>
                                    </div>
                                )
                            }
                            <div className='form-row'>
                            
                                <button disabled={!submitDisabled} type='submit' onClick={(e)=>this.createAccount(e)}>Sign Up</button>
                            </div>
                        </form>
                        {

                        }
                    </div>
                </main>
                
            </div>
        )
    }
}

export default withRouter(Register);