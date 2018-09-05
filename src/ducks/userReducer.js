const INITIAL_STATE = {
    user: {}
}

const LOAD_USER = "LOAD_USER";

export function loadUser(user){
    return {
        type: LOAD_USER,
        payload: user
    }
}



export default function userReducer(state=INITIAL_STATE, action ) {
    switch(action.type) {

        case LOAD_USER:
            return Object.assign({}, state, {user: action.payload})

        default:
            return state;
    }
}