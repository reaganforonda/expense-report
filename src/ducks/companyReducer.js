import axios from 'axios';

const INITIAL_STATE = {
    company: {},
    departments: {},
    departmentLoading: true
}

const LOAD_COMPANY = "LOAD_COMPANY";
const LOAD_DEPARTMENTS = "LOAD_DEPARTMENTS";

export function loadCompany(company){
    return {
        type: LOAD_COMPANY,
        payload: company
    }
}

export function loadDepartments(companyID, userID) {
    let departments = axios.get(`/api/departments?companyID=${companyID}&userID=${userID}`).then((result) => {
        return result.data
    })

    return {
        type: LOAD_DEPARTMENTS,
        payload: departments
    }
}

export default function companyReducer(state=INITIAL_STATE, action ) {
    switch(action.type) {

        case LOAD_DEPARTMENTS + "_PENDING":
            return Object.assign({}, state, {departmentLoading: true})
        case LOAD_DEPARTMENTS + "_FULFILLED":
            return Object.assign({}, state, {departments: action.payload, departmentLoading: false});

        case LOAD_COMPANY:
            return Object.assign({}, state, {company: action.payload})

        default:
            return state;
    }
}