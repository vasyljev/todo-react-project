import {TODO_DATE} from '../actions/todoDate';


const initialState = {
    date: new Date()
}

export default (state = initialState, action) => {
    switch(action.type) {
        case TODO_DATE: 
            return({
                ...state,
                date: action.date
            });
        default: return state;
    }
}