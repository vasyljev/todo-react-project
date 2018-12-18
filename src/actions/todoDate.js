export const TODO_DATE = 'TODO_DATE';

export const setTodoDate = date => {
    return dispatch => {
        dispatch({
            type: TODO_DATE,
            date
        })
    }
}