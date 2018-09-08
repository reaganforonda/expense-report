import React from 'react';
import {NavLink} from 'react-router-dom';

export default function AdminViewHeader(props) {
    return (
        <header className='sub-view-header'>
            <nav className='header-nav'>
                <NavLink className='admin-link' activeClassName='active-link' to='/dashboard/expense/main'>Main</NavLink>
            </nav>        
        
        </header>
    )
}