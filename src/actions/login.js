export const LOGIN = 'LOGIN';

export const loginUser = userDate => {
    return dispatch => {
        dispatch({
            type: LOGIN,
            userDate     
        })
    }
}

export const LOGOUT = 'LOGOUT';

export const logOutUser = () => {
    console.log('logout')
    return dispatch => {
        dispatch({
            type: LOGOUT
                      
        })
    }
}