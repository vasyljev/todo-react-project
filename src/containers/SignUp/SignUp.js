import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom';
import {PATHS} from "../../constants/routes";
import {loginUser} from '../../actions/login';
import LoginService from '../../services/LoginServices';

class SignUpContainer extends Component {
    render() {
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={(values) => handleSubmit(values)}>
                <Field name='firstName' type='text' component='input' placeholder='Firstname' className='login-form-input'/>
                <Field name='lastName' type='text' component='input' placeholder='Lastname' className='login-form-input'/>
                <Field name='username' type='text' component='input' placeholder='Username' className='login-form-input'/> <br/>
                <Field name='email' type='email' component='input' placeholder='E-mail' className='login-form-input'/>
                <Field name='password' type='password' component='input' placeholder='Password' className='login-form-input'/>
                {/* <Field name='confirmPassword' type='password' component='input' placeholder='Confirm password' /> */}
                <button type='submit' className='submit-button'>Sign up!</button>
            </form>
        );
    }
    
}

const signUpFunction = values => LoginService.signUp(values);

SignUpContainer = reduxForm({
    form: 'signUp',
    onSubmit: signUpFunction
}) (SignUpContainer);

const mapStateToProps = ({login}) => ({
    isAuthenticated: login.isAuthenticated,
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (SignUpContainer);
