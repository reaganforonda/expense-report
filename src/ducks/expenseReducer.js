import axios from 'axios';

const INITIAL_STATE = {
    expenseReports:[],
    reportLoading: true,
    expensesLoading: true,
    expenses:[]
}

const LOAD_EXP_REPORTS = "LOAD_EXP_REPORTS";
const LOAD_EXPS = "LOAD_EXPS";

export function loadExpenseReports(employeeID){
    const reports = axios.get(`/api/expense/report?employeeID=${employeeID}`).then((result) => {
        return result.data
    });

    return {
        type: LOAD_EXP_REPORTS,
        payload: reports
    }
}

export default function expenseReducer(state=INITIAL_STATE, action ) {
    switch(action.type) {
        case LOAD_EXP_REPORTS + "_PENDING":
            return Object.assign({}, state, {reportLoading: true});
        case LOAD_EXP_REPORTS + "_FULFILLED":
            return Object.assign({}, state, {expenseReports: action.payload, reportLoading: false});

        default:
            return state;
    }
}