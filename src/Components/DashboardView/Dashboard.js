import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import SideMenu from './SideMenu';
import Loading from '../Loading/Loading';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={}
    }

    render(){
        console.log(this.props.user)
        console.log(this.props.user === {})
        return (
            (!this.props.user || this.props.user === {}) ? <Loading/> : (
            <div className='dashboard'>
                <SideMenu/>
                <div className='main-section'>
                    <DashboardHeader user={this.props.user}/>
                    <main>
                        main
                    </main>
                </div>
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {})(withRouter(Dashboard));