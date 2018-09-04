import React from 'react';
import {withRouter} from 'react-router-dom';

export class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='login'>
                Login Placeholder
            </div>
        )
    }
}

export default withRouter(Login);