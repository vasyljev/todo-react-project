import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from '../../actions/login';

class SignUpContainer extends Component {
    render() {
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <Field name='firstName' type='text' component='input' placeholder='Firstname' className='login-form-input'/>
                <Field name='lastName' type='text' component='input' placeholder='Lastname' className='login-form-input'/>
                <Field name='username' type='text' component='input' placeholder='Username' className='login-form-input'/> <br/>
                <Field name='email' type='email' component='input' placeholder='E-mail' className='login-form-input'/>
                <Field name='password' type='password' component='input' placeholder='Password' className='login-form-input'/>
                <button type='submit' className='submit-button'>Sign up!</button>
            </form>
        );
    }
}

SignUpContainer = reduxForm({
    form: 'signUp'
}) (SignUpContainer);

const mapStateToProps = ({login}) => ({
    isAuthenticated: login.isAuthenticated,
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (SignUpContainer);
