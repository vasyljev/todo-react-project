export const ADD_ITEM = 'ADD_ITEM';

export const addNewItemTodo = item => {
    return dispatch => {
        dispatch({
            type: ADD_ITEM,
            item
        })
    }
}

export const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY';

export const changeVisibilyty = () => {
    return dispatch => {
        dispatch({
            type: CHANGE_VISIBILITY
        })
    }
}


export const CHANGE_ITEM = 'CHANGE_ITEM';

export const changeTodoItem = (title, date, id) => {
    return dispatch => {
        dispatch({
            type: CHANGE_ITEM,
            title,
            date,
            id
        })
    }
}

export const CHANGE_BUTTON_NAME = 'CHANGE_BUTTON_NAME';

export const changeButtonName = (id) => {
    return dispatch => {
        dispatch({
            type: CHANGE_BUTTON_NAME,
            id
        })
    }
}
