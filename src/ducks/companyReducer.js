const INITIAL_STATE = {
    company: {}
}

const LOAD_COMPANY = "LOAD_COMPANY";

export function loadCompany(company){
    return {
        type: LOAD_COMPANY,
        payload: company
    }
}

export default function companyReducer(state=INITIAL_STATE, action ) {
    switch(action.type) {

        case LOAD_COMPANY:
            return Object.assign({}, state, {company: action.payload})

        default:
            return state;
    }
}