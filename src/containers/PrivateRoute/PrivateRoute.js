import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {PATHS} from "../../constants/routes";


const PrivateRoute = ({ component: Component, submitHandle, isAuthenticated, ...rest }) => (
    <Route {...rest}
        render={props => {
          return (isAuthenticated) ? <Component onSubmit={submitHandle} auth={isAuthenticated} {...props} /> : <Redirect to={PATHS.LOGIN}/>
        }}
    />
);


  export default PrivateRoute;  
