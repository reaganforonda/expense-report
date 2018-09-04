import React from 'react';
import {withRouter} from 'react-router-dom';
import * as util from '../../utilities/generalUtilities';
import axios from 'axios';

export class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            email: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = Object.assign({}, this.state);

        axios.post(`/api/auth/login`, user).then((result) => {
            
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        const disabledSubmit = (this.state.password.length > 0) && (this.state.email.length > 0) && (util.validateEmail(this.state.email));
        return (
            <div className='login'>
                <div className='logo-holder'>
                    Expenster
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
                </article>
            </div>
        )
    }
}

export default withRouter(Login);