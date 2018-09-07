import React from 'react';
import {NavLink} from 'react-router-dom';

export default function AdminViewHeader(props) {
    return (
        <header className='admin-view-header'>
            <nav className='header-nav'>
                <NavLink className='admin-link' activeClassName='active-link' to='/dashboard/admin/main'>Main</NavLink>
                <NavLink className='admin-link' activeClassName='active-link'  to='/dashboard/admin/company'>Company</NavLink>
                <NavLink className='admin-link' activeClassName='active-link'  to='/dashboard/admin/departments'>Departments</NavLink>
                <NavLink className='admin-link' activeClassName='active-link'  to='/dashboard/admin/employees'>Employees</NavLink>
            </nav>        
        </header>
    )
}