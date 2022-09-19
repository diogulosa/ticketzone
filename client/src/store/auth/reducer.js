export function authReducer(state, action){
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {...state, loading: true }
        case 'LOGIN_SUCCESS':
            return {...state, loading: false, loggedIn: true, userData: action.payload.user}
        case 'LOGIN_ERROR':
            return {...state, loading: false, message: action.message }
        case 'LOG_OUT':
            return {...state, loggedIn: false, userData: {}}
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

