import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {PATHS} from "../../constants/routes";


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest}
        render={props => {
            console.log(isAuthenticated);
          return (isAuthenticated) ? <Component auth={isAuthenticated} {...props} /> : <Redirect to={PATHS.LOGIN}/>
        }}
    />
);


  export default PrivateRoute;  
