import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';
import companyReducer from './ducks/companyReducer';

const reducers = {
    userReducer: userReducer,
    companyReducer: companyReducer
}


let middleware = promiseMiddleware();

export default createStore(combineReducers(reducers), applyMiddleware(middleware));