import { ADD_ITEM } from '../actions/todoList';
import { CHANGE_VISIBILITY } from '../actions/todoList';
import { CHANGE_ITEM } from '../actions/todoList';

const InitialState = {
    list: [],
    visibilityClass: 'invisible',
    tempTitle: 'buy milk',
    tempDate: new Date(),
    tempId: ''
}

export default (state = InitialState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            return({
                ...state,
                list: action.item
            })
        case CHANGE_VISIBILITY:
            return({
                ...state,
                visibilityClass: state.visibilityClass === 'visible' ? 'invisible' : 'visible'
            })
        case CHANGE_ITEM: 
            console.log('Change Item: ', action.title, action.date, action.id)
            return({
                ...state,
                tempTitle: action.title,
                tempDate: new Date(action.date),
                tempId: action.id
            })

        default: return state;
    }

}