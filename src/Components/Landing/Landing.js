import React from 'react';
import {withRouter} from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

export class Landing extends React.Component{
    constructor(props) {
        super(props);
        this.state={}
    }

    render(){
        return (
            <div className='landing'>
                <LandingHeader/>
                <main>
                    Main
                </main>
                <LandingFooter/>
            </div>
        )
    }
}

export default withRouter(Landing);