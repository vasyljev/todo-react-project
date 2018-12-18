import { LOGIN } from '../actions/login';
import { LOGOUT } from '../actions/login';



const InitialState = {
    isAuthenticated: false,
    userDate: {}
}

export default (state = InitialState, action) => {
    
    switch(action.type) {
        case LOGIN:
            return ({
                ...state,
                isAuthenticated: true,
                userDate: action.userDate
            })
        case LOGOUT:
            return({
                ...state,
                isAuthenticated: false,
                userDate: []
            })
        default: return state;
    }
}