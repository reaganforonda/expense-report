import React from 'react';
import {NavLink} from 'react-router-dom';

export default function ExpReportViewHeader(props) {
    return (
        <header className='sub-view-header'>
            <nav className='header-nav'>
                <NavLink className='admin-link' activeClassName='active-link' to='/dashboard/expense/reports'>Reports</NavLink>
                <NavLink className='admin-link' activeClassName='active-link'  to='/dashboard/expense/expenses'>Expenses</NavLink>
            </nav>        
        </header>
    )
}