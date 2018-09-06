import React from 'react';

export default function DashboardHeader(props){
    return (
        <header className='dashboard-header'>
            <div className='header-logo'>
                Expenster
            </div>
            <div className='header-icons'>
                <img onClick={(e)=>props.logout(e)}className='logout-icon' src={require('../../assets/images/logout-icon.png')} alt='log-out'/>
            </div>
        </header>
    )
}