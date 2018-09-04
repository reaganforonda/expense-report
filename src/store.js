import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';

const reducers = {
    userReducer: userReducer
}


let middleware = promiseMiddleware();

export default createStore(combineReducers(reducers), applyMiddleware(middleware));