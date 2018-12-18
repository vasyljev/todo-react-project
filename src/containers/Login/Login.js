import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import LoginService from '../../services/LoginServices';
import {loginUser} from '../../actions/login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class LoginContainer extends Component { 
    render() {
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={(values) => handleSubmit(values).then(auth => auth['auth'] ? this.props.loginUser(auth) : console.log('No'))} className="login-form">
                <div className='input-wrap'>
                    <Field name='username' component='input' type='text' placeholder='Username' className='login-form-input' />
                    <Field name='password' component='input' type='password' placeholder='Password' className='login-form-input'/>
                </div>
                <button type='submit' className='submit-button' >Login</button>
            </form>
        );
    }

}

const handleSubmitFunction = (values) => {
    return LoginService.signIn(values);
}
 


LoginContainer = reduxForm({
    form: 'login',
    onSubmit: handleSubmitFunction,
    initialValues: {
        username: 'vasyljev',
        password: '1'
    }
}) (LoginContainer);

const mapStateToProps = ({login}) => ({
    isAuthenticated: login.isAuthenticated,
    userDate: login.userDate
  });
const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);