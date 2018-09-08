import React from 'react';
import {withRouter} from 'react-router-dom';

export function Error500(props){
    function handleClick(e){
        e.preventDefault();

        props.history.push('/');
    }
    return (
        <div className='error500'>
            <main>
                <div>
                    <h1>Oopps....</h1>
                    <p>Something Went Wrong</p>
                    <p>Error: 500</p>
                </div>
                <div>
                    <button onClick={(e)=>handleClick(e)}>Home</button>
                </div>
            </main>
            
        </div>
    )
}

export default withRouter(Error500);