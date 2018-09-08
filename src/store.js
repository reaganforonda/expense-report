import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';
import companyReducer from './ducks/companyReducer';
import expenseReducer from './ducks/expenseReducer';

const reducers = {
    userReducer: userReducer,
    companyReducer: companyReducer,
    expenseReducer: expenseReducer
}


let middleware = promiseMiddleware();

export default createStore(combineReducers(reducers), applyMiddleware(middleware));