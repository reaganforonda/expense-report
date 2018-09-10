import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import InboxMain from './InboxMain';

export class InboxView extends React.Component{
    constructor(props) {
        super(props);

        this.state={}
    }

    render(){
        return (
            <div className='inbox-view'>
                <main>
                    <Switch>
                        <Route exact path='/dashboard/inbox' component={InboxMain}/>>
                    </Switch>
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps, {})(withRouter(InboxView));