import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export class AdminMain extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='admin-main'>
                <div className='company-profile'>

                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company
    }
}

export default connect(mapStateToProps, {})(withRouter(AdminMain));