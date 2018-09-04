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
                    <div className='main-sec-1'>
                        <h1>Expenster</h1>
                    </div>
                    <div className='main-sec-1'>
                        
                    </div>
                </main>
                <LandingFooter/>
            </div>
        )
    }
}

export default withRouter(Landing);