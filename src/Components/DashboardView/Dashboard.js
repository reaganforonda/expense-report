import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch, Route} from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import SideMenu from './SideMenu';
import Loading from '../Loading/Loading';
import AdminView from '../AdminView/AdminView';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={}
    }

    render(){
        return (
            (!this.props.user || this.props.user === {}) && (this.props.company) ? <Loading/> : (
            <div className='dashboard'>
                <SideMenu user={this.props.user}/>
                <div className='main-section'>
                    <DashboardHeader/>
                    <main>
                        <Switch>
                            <Route path='/dashboard/admin' component={AdminView}/>
                        </Switch>
                    </main>
                </div>
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.company
    }
}

export default connect(mapStateToProps, {})(withRouter(Dashboard));