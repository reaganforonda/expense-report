import axios from 'axios';

const INITIAL_STATE = {
    company: {},
    departments: {},
    departmentLoading: true,
    employees: {},
    employeesLoading: true,
    selectedEmployee: {},
    selectedLoading: true
}

const LOAD_COMPANY = "LOAD_COMPANY";
const LOAD_DEPARTMENTS = "LOAD_DEPARTMENTS";
const LOAD_EMPLOYEES = "LOAD_EMPLOYEES";
const SELECT_EMPLOYEE = "SELECT_EMPLOYEE";

export function selectEmployee(employee) {
    return {
        type: SELECT_EMPLOYEE,
        payload: employee
    }
}

export function loadEmployees(companyID){
    let employees = axios.get(`/api/employees?companyID=${companyID}`).then((result) => {
        return result.data
    })

    return {
        type: LOAD_EMPLOYEES,
        payload: employees
    }
}

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

        case LOAD_EMPLOYEES + "_PENDING":
            return Object.assign({}, state, {employeesLoading: true});
        case LOAD_EMPLOYEES + "_FULFILLED":
            return Object.assign({}, state, {employees: action.payload, employeesLoading: false});

        case LOAD_DEPARTMENTS + "_PENDING":
            return Object.assign({}, state, {departmentLoading: true})
        case LOAD_DEPARTMENTS + "_FULFILLED":
            return Object.assign({}, state, {departments: action.payload, departmentLoading: false});

        case LOAD_COMPANY:
            return Object.assign({}, state, {company: action.payload})

        case SELECT_EMPLOYEE:
            return Object.assign({}, state, {selectedEmployee: action.payload, selectedLoading: false})
        default:
            return state;
    }
}