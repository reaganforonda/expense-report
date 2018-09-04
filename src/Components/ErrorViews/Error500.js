import React from 'react';
import {withRouter} from 'react-router-dom';


export function Error500(props){
    function handleClick(e){
        e.preventDefault();

        this.props.history.push('/');
    }
    return (
        <div className='error500'>
            <main>
                Error 500
                <div>
                    <button onClick={(e)=>handleClick(e)}>Home</button>
                </div>
            </main>
            
        </div>
    )
}

export default withRouter(Error500);