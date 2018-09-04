import React from 'react';
import {withRouter} from 'react-router-dom';


export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state={}
    }

    render() {
        return (
            <div className='regsiter'>
                Register
            </div>
        )
    }
}

export default withRouter(Register);