import React from 'react';

export default function RegisterHeader(props) {
    return (
        <header className='register-header'>
            <div className='logo'>
                Expenster
            </div>
            <div className='btns'>
                <button onClick={(e)=>props.login(e)}>Log In</button>
            </div>
        </header>
    )
}