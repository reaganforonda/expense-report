import React from 'react';
import {NavLink} from 'react-router-dom';

export default function SideMenu(props) {
    return (
        <div className='sidemenu'>
            <div className='user-section'>
                <div className='profile-image'>
                    <img src={require(`../../assets/images/male-avatar.png`)} alt={'profile picture'}/>
                </div>
                <div className='profile-name'>
                    {props.user.first_name} {props.user.last_name}
                </div>
            </div>
            <nav>
                <NavLink className='side-link' activeClassName='active-link' exact to='/dashboard'>Home</NavLink>
            </nav>
        </div>
    )
}