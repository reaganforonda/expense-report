import React from 'react';
import {NavLink} from 'react-router-dom';

export default function AdminViewHeader(props) {
    return (
        <header className='admin-view-header'>
            <nav className='header-nav'>
                <NavLink to='/dashboard/admin/main'>Main</NavLink>
                <NavLink to='/dashboard/admin/company'>Company</NavLink>
            </nav>        
        </header>
    )
}