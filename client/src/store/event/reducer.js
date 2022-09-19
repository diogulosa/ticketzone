export function eventReducer(state, action){
    switch (action.type) {
        case 'REQUEST_EVENT':
            return {...state, loading: true }
        case 'REQUEST_EVENT_SUCCESS':
            return {...state, loading: false, eventData: action.payload}
        case 'REQUEST_EVENT_ERROR':
            return {...state, loading: false, message: action.message }
        case 'REQUEST_EVENT_DESTROY':
            return {...state, message: "", eventData: {}}
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}