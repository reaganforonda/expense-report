import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadPendingReports} from '../../ducks/expenseReducer';
import Loading from '../Loading/Loading';
import PendingList from './PendingList';

export class InboxMain extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            
        }
    }

    componentDidMount (){
        this.props.loadPendingReports(this.props.user.employee_id);
    }



    render(){
        return (
            this.props.reportLoading ? <Loading/> : (
            <div className='inbox-main'>
                <header>
                    <h2>Report Number</h2>
                    <h2>Employee</h2>
                    <h2>Report Date</h2>
                    <h2>Description</h2>
                    <h2>Total Amount</h2>
                </header>
                <PendingList pendingReports={this.props.expenseReports}/>
            </div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        reportLoading: state.expenseReducer.reportLoading,
        expenseReports: state.expenseReducer.expenseReports
    }
}

export default connect(mapStateToProps, {loadPendingReports})(withRouter(InboxMain));