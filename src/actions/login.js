export const LOGIN = 'LOGIN';

export const loginUser = userDate => {
    console.log('login');
    console.log(userDate);
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

// export const CURRENT_USER = 'CURRENT_USER';

// export const addCurrentUserDate = () => {
//     return dispatch => {
//         dispatch({
//             type: CURRENT_USER,
//             userDate
//         })
//     }
// }