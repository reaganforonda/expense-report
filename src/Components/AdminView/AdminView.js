import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminViewHeader from './AdminViewHeader';
import AdminMain from './AdminMain';
import CompanyForm from './Company/CompanyForm';

export class AdminView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render(){
        return (
            <div className='admin-view'>
                <AdminViewHeader/>
                <main>
                    <Switch>
                        <Route exact path='/dashboard/admin' component={AdminMain}/>
                        <Route path='/dashboard/admin/company' component={CompanyForm}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {})(withRouter(AdminView));