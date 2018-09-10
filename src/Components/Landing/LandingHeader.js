import React from 'react';


export default function LandingHeader(props) {
    return (
        <header className='landing-header'>
            <div className='logo'>
                <h1>EXPENSTER</h1>
            </div>
            <div className='btns'>
                <button onClick={(e)=>props.register(e)}>Sign Up</button>
                <button onClick={(e)=>props.login(e)}>Log In</button>
            </div>
        </header>
    )
}