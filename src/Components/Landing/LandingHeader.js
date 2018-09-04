import React from 'react';


export default function LandingHeader(props) {
    return (
        <header className='landing-header'>
            <div className='landing-header-logo'>
                Expenster Logo Placeholder
            </div>
            <menu className='landing-header-menu'>
                <div>Link</div>
                <div>Link</div>
                <div>Link</div>
            </menu>
            <div className='lanading-header-btns'>
                <button>Login</button>
                <button>Sign Up</button>
            </div>
        </header>
    )
}