import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminViewHeader from './AdminViewHeader';
import AdminMain from './AdminMain';
import CompanyForm from './Company/CompanyForm';
import Departments from './Departments/Departments';
import Employees from './Employees/Employees';
import EmployeeDetail from './Employees/EmployeeDetail';

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
                        <Route path='/dashboard/admin/departments' component={Departments}/>
                        <Route path='/dashboard/admin/employees' component={Employees}/>
                        <Route path='/dashboard/admin/employees-detail' component={EmployeeDetail}/>
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