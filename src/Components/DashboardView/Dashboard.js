import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import SideMenu from './SideMenu';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={}
    }

    render(){
        console.log(this.props.user);
        return (
            <div className='dashboard'>
                <DashboardHeader/>
                <SideMenu/>
                <main>
                    main
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

export default connect(mapStateToProps, {})(withRouter(Dashboard));