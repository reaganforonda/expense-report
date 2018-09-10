import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch, Route} from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import SideMenu from './SideMenu';
import Loading from '../Loading/Loading';
import AdminView from '../AdminView/AdminView';
import axios from 'axios';
import InboxView from '../InboxView/InboxView'
import ExpReportView from '../ExpenseReportView/ExpReportView';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={}

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount = async () => {
        await axios.get(`/api/auth/me`).then((users) => {
            console.log('Login');
        }).catch(err => {
            this.props.history.push('/');
        })
    }

    handleLogout(e) {
        e.preventDefault();

        axios.get('/api/auth/logout').then((res) => {
            this.props.history.push('/');
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        console.log(this.props.user)
        console.log(this.props.company)
        return (
            (!this.props.user || this.props.user === {})  ? <Loading/> : (
            <div className='dashboard'>
                <SideMenu user={this.props.user}/>
                <div className='main-section'>
                    <DashboardHeader logout={this.handleLogout}/>
                    <main>
                        <Switch>
                            <Route path='/dashboard/admin' component={AdminView}/>
                            <Route path='/dashboard/expense' component={ExpReportView}/>
                            <Route path='/dashboard/inbox' component={InboxView}/>
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