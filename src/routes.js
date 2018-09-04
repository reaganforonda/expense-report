import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Error500 from './Components/ErrorViews/Error500';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component = {Login} />
        <Route path='/error/500' component = {Error500}/>
    </Switch>
)