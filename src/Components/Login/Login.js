import React from 'react';
import {withRouter} from 'react-router-dom';
import * as util from '../../utilities/generalUtilities';
import axios from 'axios';
import {connect} from 'react-redux';
import {loadUser} from '../../ducks/userReducer';
import {loadCompany} from '../../ducks/companyReducer';

export class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            email: '',
            password: '',
            newPW: '',
            confirmPW: '',
            error: false,
            displayPWReset: false,
            user: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = Object.assign({}, this.state);

        axios.post(`/api/auth/login`, user).then((result) => {
            if(result.data.updatePWRequired){
                this.setState({displayPWReset: true, user: result.data})
            }else {
                this.props.loadUser(result.data);
                if(result.data.company) {
                    axios.get(`/api/company/${result.data.user_id}`).then((result) => {
                        this.props.loadCompany(result.data[0])
                        this.props.history.push('/dashboard');
                        this.resetForm();
                    }).catch((err) => {
                        if(err.response.status === 500){
                            this.props.history.push('/error/500');
                        } else if (err.response.status===401){
                            this.setState({error: true})
                        }
                    })
                } else {
                    this.props.history.push('/dashboard');
                    this.resetForm();
                }

            }  
        }).catch((err) => {
            if(err.response.status === 500){
                this.props.history.push('/error/500');
            } else if (err.response.status===401){
                this.setState({error: true})
            }
        })
    }

    resetForm(){
        this.setState({
            email: '',
            password: '',
            newPW: '',
            confirmPW: '',
            error: false,
            displayPWReset: false,
            user: ''
        })
    }

    handleUpdatePW (e) {
        e.preventDefault();

        let updateInfo={
            user: this.state.user,
            currentPW: this.state.password,
            confirmPW : this.state.confirmPW,
            newPW : this.state.newPW
        }

        axios.put('/api/auth/update', updateInfo).then((result) => {
            alert('Password Reset Successful - Please Login Again');
            this.props.history.push('/login');
            this.resetForm();
        }).catch((err) => {
            console.log(err.response);
            if(err.response.status === 500) {
                this.props.history.push('/error/500')
            }
            
        })
    }

    render(){
        const disabledSubmit = (this.state.password.length > 0) && (this.state.email.length > 0) && (util.validEmail(this.state.email));
        const validPW = (this.state.newPW === this.state.confirmPW) && (this.state.confirmPW.length <=25 && this.state.newPW.length <=25);
        let disabledPassword = '';
        if(this.state.displayPWReset) {
            disabledPassword =(this.state.newPW === this.state.confirmPW) && (this.state.confirmPW.length <=25 && this.state.newPW.length <=25) && (this.state.newPW.length > 0)
        }
        return (
            this.state.displayPWReset ? <div className='login'>
                <div className='logo-holder'>
                    <h1>Expenster</h1>
                </div>
                <article className='form-container'>
                    <form className='login-form'>
                    <div className='form-row'>
                        <h2>Please Update Your Password</h2>
                    </div>
                        <div className='form-row'>
                            <input type='password' maxLength={25} name='newPW' value={this.state.newPW} onChange={(e)=>this.handleInputChange(e)} placeholder='New Password'/>
                        </div>
                        <div className='form-row'>
                            <input type='password' maxLength={25} name='confirmPW' value={this.state.confirmPW} onChange={(e)=>this.handleInputChange(e)} placeholder='Confirm Password'/>
                        
                        </div>
                        {
                            validPW? null : (
                                <div className='form-row'>
                                    <p>Password does not match</p>
                                </div>
                            )
                        }
                        <div className='form-row'>
                            <button disabled={!disabledPassword} onClick={(e)=>this.handleUpdatePW(e)}>Update Password</button>
                        </div>
                    </form>
                    {
                    this.state.error ? (<div className='form-row'><div className='error'>Incorrect Email or Password</div></div>) : null
                }
                </article>
            </div>: (
            <div className='login'>
                <div className='logo-holder'>
                    <h1>Expenster</h1>
                </div>
                <article className='form-container'>
                    <form className='login-form'>
                        <div className='form-row'>
                            <input type='email' name='email' value={this.state.email} onChange={(e)=>this.handleInputChange(e)} placeholder='Email'/>
                        </div>
                        <div className='form-row'>
                            <input type='password' name='password' value={this.state.password} onChange={(e)=>this.handleInputChange(e)} placeholder='Password'/>
                        </div>
                        <div className='form-row'>
                            <button disabled={!disabledSubmit} onClick={(e)=>this.handleSubmit(e)}>Login</button>
                        </div>
                    </form>
                    {
                    this.state.error ? (<div className='form-row'><div className='error'>Incorrect Email or Password</div></div>) : null
                }
                </article>
                
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {loadUser, loadCompany})(withRouter(Login));