import React from 'react';
import {withRouter} from 'react-router-dom';
import RegisterHeader from './RegisterHeader';
import axios from 'axios';
import * as util from '../../utilities/generalUtilities';

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            acct_type: '',
            firstName: '',
            lastName: '',
            email: '',
            pw: '',
            confirmPW: '',
            companyName: '',
            address: '',
            city: '',
            state: '',
            zipcode : '',
            phone: '',

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.loginRedirect = this.loginRedirect.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.setEnterpise = this.setEnterpise.bind(this);
        this.setIndividual = this.setIndividual.bind(this);
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
            acct_type: '',
            firstName: '',
            lastName: '',
            email: '',
            pw: '',
            confirmPW: '',
            companyName: '',
            address: '',
            city: '',
            state: '',
            zipcode : '',
            phone: ''  
        })
    }

    setEnterpise() {
        this.setState({acct_type: 1})
    }

    setIndividual() {
        this.setState({acct_type: 1})
    }

    render() {
        const validPW = (this.state.pw === this.state.confirmPW) && (this.state.confirmPW.length <=25 && this.state.pw.length <=25);
        const validEmail = util.validEmail(this.state.email) && this.state.email.length > 0;
        const validCompany = (this.state.companyName.length > 0 && this.state.address.length > 0 && this.state.city.length > 0 && this.state.zipcode.length > 0 && this.state.phone.length > 0) && this.state.acct_type===1;
        const submitDisabled = validCompany && validPW && validEmail && this.state.pw.length > 0 && this.state.confirmPW.length > 0 && (this.state.acct_type === 1 || this.state.acct_type ===2)
        const inputDisabled = !(this.state.acct_type === 1 || this.state.acct_type === 2);
        
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
                                <div className='form-row-btns'>
                                    <button type='button' onClick={()=>this.setEnterpise()}>Enterprise</button>
                                    <button  type='button' onClick={()=>this.setIndividual()} disabled={true}>Individual</button>
                                </div>
                            </div>
                            <div className='form-row'>
                                <input disabled={inputDisabled} required type='text' name="firstName" value={this.state.firstName} placeholder='First Name' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <div className='form-row'>
                                <input disabled={inputDisabled} required type='text' name="lastName" value={this.state.lastName} placeholder='Last Name' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <div className='form-row'>
                                <input disabled={inputDisabled} required type='email' name='email' value={this.state.email} placeholder='Email' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            {
                                this.state.acct_type === 1 ? 
                                (<div>
                                    <div className='form-row'>
                                        <input disabled={inputDisabled} required type='text' name={"companyName"} value={this.state.companyName} placeholder='Company Name' onChange={(e)=>this.handleInputChange(e)}/>
                                    </div>
                                    <div className='form-row'>
                                        <input disabled={inputDisabled} required type='text' name={"address"} value={this.state.address} placeholder='Company Address' onChange={(e)=>this.handleInputChange(e)}/>
                                    </div>
                                    <div className='form-row'>
                                        <input disabled={inputDisabled} required type='text' name={"city"} value={this.state.city} placeholder='City' onChange={(e)=>this.handleInputChange(e)}/>
                                    </div>
                                    <div className='form-row'>
                                        <input disabled={inputDisabled} required type='text' name={"state"} value={this.state.state} placeholder='State' onChange={(e)=>this.handleInputChange(e)}/>
                                    </div>
                                    <div className='form-row'>
                                        <input disabled={inputDisabled} required type='number' name={"zipcode"} value={this.state.zipcode} placeholder='Zipcode' onChange={(e)=>this.handleInputChange(e)}/>
                                    </div>
                                    <div className='form-row'>
                                        <input disabled={inputDisabled} required type='text' name={"phone"} value={this.state.phone} placeholder='Phone' onChange={(e)=>this.handleInputChange(e)}/>
                                    </div>
                                </div>
                                ) : null
                            }
                            <div className='form-row'>
                                <input disabled={inputDisabled} required type='password' name='pw' value={this.state.pw} maxLength={25} placeholder='Password' onChange={(e)=>this.handleInputChange(e)}/>
                            </div>
                            <div className='form-row'>
                                <input disabled={inputDisabled} required type='password' name='confirmPW' value={this.state.confirmPW} maxLength={25} placeholder='Confirm Password' onChange={(e)=>this.handleInputChange(e)}/>
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
                    </div>
                </main>
                
            </div>
        )
    }
}

export default withRouter(Register);