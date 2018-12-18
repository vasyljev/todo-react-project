import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import LoginService from '../../services/LoginServices';

class SignUpContainer extends Component {
    render() {
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <Field name='firstName' type='text' component='input' placeholder='Firstname' />
                <Field name='lastName' type='text' component='input' placeholder='Lastname' />
                <Field name='username' type='text' component='input' placeholder='Username' />
                <Field name='email' type='email' component='input' placeholder='E-mail' />
                <Field name='password' type='password' component='input' placeholder='Password' />
                {/* <Field name='confirmPassword' type='password' component='input' placeholder='Confirm password' /> */}
                <button type='submit'>Sign up!</button>
            </form>
        );
    }
    
}

const signUpFunction = values => LoginService.signUp(values);

SignUpContainer = reduxForm({
    form: 'signUp',
    onSubmit: signUpFunction
}) (SignUpContainer);

export default SignUpContainer;