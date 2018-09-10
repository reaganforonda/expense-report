import React from 'react';
import {NavLink} from 'react-router-dom';

export default function SideMenu(props) {
    return (
        <div className='sidemenu'>
            <div className='user-section'>
                <div className='profile-image'>
                    <img src={require(`../../assets/images/male-avatar.png`)} alt={'profile-avatar'}/>
                </div>
                <div className='profile-name'>
                    {props.user.first_name} {props.user.last_name}
                </div>
            </div>
            <nav className='nav-menu'>
                <NavLink className='side-link' activeClassName='active-link' exact to='/dashboard'>Home</NavLink>
                {
                    props.user.rights.Expense === true ? <NavLink className='side-link' activeClassName='active-link' to='/dashboard/inbox'>Inbox</NavLink> : (
                        null
                    )
                }
                {
                    props.user.rights.Expense === true ? <NavLink className='side-link' activeClassName='active-link' to='/dashboard/expense'>Expense</NavLink> : (
                        null
                    )
                }
                {
                    props.user.rights.Admin === true ? <NavLink className='side-link' activeClassName='active-link' to='/dashboard/admin'>Admin</NavLink> : (
                        null
                    )
                }
            </nav>
        </div>
    )
}