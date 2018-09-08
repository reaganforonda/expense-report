import React from 'react';

export default class EmployeeAcct extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return(
            <div className='employee-account-info'>
                <div>
                    <h2>Expenster Account Options</h2>
                </div>
                <div>
                    Rights
                </div>
                <div>
                    Reset Password
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}