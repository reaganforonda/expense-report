import React from 'react';
import {NavLink} from 'react-router-dom';

export default function SideMenu(props) {
    return (
        <div className='sidemenu'>
            <nav>
                <NavLink className='side-link' activeClassName='active-link' exact to='/dashboard'>Home</NavLink>
            </nav>
        </div>
    )
}