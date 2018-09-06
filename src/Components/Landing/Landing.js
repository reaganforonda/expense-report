import React from 'react';
import {withRouter} from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

export class Landing extends React.Component{
    constructor(props) {
        super(props);
        this.state={}
        
        this.handleRegisterBtn = this.handleRegisterBtn.bind(this);
        this.handleLoginBtn = this.handleLoginBtn.bind(this);
    }

    handleRegisterBtn(e) {
        e.preventDefault();

        this.props.history.push('/register');
    }

    handleLoginBtn(e) {
        e.preventDefault();

        this.props.history.push('/login');
    }

    render(){
        return (
            <div className='landing'>
                <LandingHeader register={this.handleRegisterBtn} login={this.handleLoginBtn}/>
                <main>
                    <section className='top-section'>
                        <div>
                            <h1>Expenster</h1>
                        </div>
                        <div>
                            <p>Expense Report Management Software</p>
                        </div>
                    </section>
                    <section className='mid-section'>
                        <div>
                            <p>Enter your email to contact us</p>
                            <input type='email' placeholder='Enter Your Email'/>
                        </div>
                    </section>
                </main>
                <LandingFooter/>
            </div>
        )
    }
}

export default withRouter(Landing);