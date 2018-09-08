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
            error: false
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
        console.log(user);

        axios.post(`/api/auth/login`, user).then((result) => {
            this.props.loadUser(result.data);
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
            error: false
        })
    }

    render(){
        const disabledSubmit = (this.state.password.length > 0) && (this.state.email.length > 0) && (util.validEmail(this.state.email));
        return (
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
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {loadUser, loadCompany})(withRouter(Login));