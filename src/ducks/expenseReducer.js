import axios from 'axios';

const INITIAL_STATE = {
    expenseReports:[],
    reportLoading: true,
    expensesLoading: true,
    expenses:[]
}

const LOAD_EXP_REPORTS = "LOAD_EXP_REPORTS";
const LOAD_EXPENSES = "LOAD_EXPENSES";

export function loadExpenseReports(employeeID, reportID){
    const reports = axios.get(`/api/expense/report?employeeID=${employeeID}&reportID=${reportID}`).then((result) => {
        return result.data
    });

    return {
        type: LOAD_EXP_REPORTS,
        payload: reports
    }
}

export function loadExpenses(employeeID) {
    const expenses = axios.get(`/api/expenses?employeeID=${employeeID}&filter=${'open'}`).then((result) => {
        return result.data
    })

    return {
        type: LOAD_EXPENSES,
        payload: expenses
    }
}

export default function expenseReducer(state=INITIAL_STATE, action ) {
    switch(action.type) {
        case LOAD_EXP_REPORTS + "_PENDING":
            return Object.assign({}, state, {reportLoading: true});
        case LOAD_EXP_REPORTS + "_FULFILLED":
            return Object.assign({}, state, {expenseReports: action.payload, reportLoading: false});

        case LOAD_EXPENSES + "_PENDING":
            return Object.assign({}, state, {reportLoading: true});

        case LOAD_EXPENSES + "_FULFILLED":
            return Object.assign({}, state, {reportLoading: false, expenses: action.payload})

        default:
            return state;
    }
}