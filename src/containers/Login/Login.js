import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import LoginService from '../../services/LoginServices';
import {loginUser} from '../../actions/login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class LoginContainer extends Component { 
    // constructor(props) {
    //     super(props);   
        
    // }
    
    
    
    render() {
        const {handleSubmit} = this.props;
        console.log(this.props.userDate['auth']);
        return(
            <form onSubmit={(values) => handleSubmit(values).then(auth => auth['auth'] ? this.props.loginUser(auth) : console.log('No'))}>
                <Field name='username' component='input' type='text' placeholder='Username' />
                <Field name='password' component='input' type='password' placeholder='Password' />
                
                <button type='submit' >Login</button>
            </form>
        );
    }

}

const handleSubmitFunction = (values) => {
    return LoginService.signIn(values);
            // .then(auth => auth ? this.props.loginUser() : console.log('No'));    
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