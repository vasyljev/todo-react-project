import React, { Component } from 'react';
import SignUpContainer from '../../containers/SignUp/';
import { Link } from 'react-router-dom';
import {PATHS} from "../../constants/routes";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from '../../actions/login';
import LoginService from '../../services/LoginServices';

class SignUp extends Component {
    render() {
        return(
            <>
                <h2>Signup form</h2>
                <SignUpContainer onSubmit={this.submitHandler} />
                <Link to={PATHS.LOGIN} className='submit-button'>Login</Link>
            </>
        );
    }

    submitHandler = values => {
        console.log('submit');
        return LoginService.signUp(values).then(data => data === 'User created' ? this.goBackToLogin() : window.alert('Error'));        
    }

    goBackToLogin = () => {
        window.alert('User created');
        this.props.history.goBack();
    }
}

const mapStateToProps = ({login}) => ({
    isAuthenticated: login.isAuthenticated,
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (SignUp);
