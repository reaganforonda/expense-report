import React from 'react';


export default function LandingHeader(props) {
    return (
        <header className='landing-header'>
            <div className='logo'>
                Expenster Logo Placeholder
            </div>
            <menu className='menu'>
                <div>Link</div>
                <div>Link</div>
                <div>Link</div>
            </menu>
            <div className='btns'>
                <button onClick={(e)=>props.register(e)}>Sign Up</button>
                <button onClick={(e)=>props.login(e)}>Log In</button>
            </div>
        </header>
    )
}