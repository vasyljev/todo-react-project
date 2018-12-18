import React from 'react';
import SignUpContainer from '../../containers/SignUp/';
import { Link } from 'react-router-dom';
import {PATHS} from "../../constants/routes";

const SignUp = () => {
    return(
        <>
            <h2>Signup form</h2>
            <SignUpContainer />
            <Link to={PATHS.LOGIN}>Login</Link>
        </>
    );
}

export default SignUp;