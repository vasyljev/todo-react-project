import React, { Component } from 'react';
import LoginContainer from '../../containers/Login';
import LoginService from '../../services/LoginServices';
import { Link, Redirect, withRouter } from 'react-router-dom';
import {PATHS} from "../../constants/routes";
import {loginUser} from '../../actions/login';
import {logOutUser} from '../../actions/login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Login extends Component {
    
    
    render() {      
        this.setLocalAuthent();  
        
        let authValue = JSON.parse(localStorage.getItem('isAuthenticated'))
        console.log('isAuthenticated render: ', authValue);
        console.log('update',  this.props.isAuthenticated);
        if(this.props.isAuthenticated === true) {
            console.log('isAuthenticated render true: ', authValue);
            this.props.loginUser();
            return <Redirect to={PATHS.TODO_LIST} />
        }
        
        return(
            <div className='login-form'>
                <h2>Login form</h2>
                <LoginContainer onSubmit={this.logHandle} />
                <Link to={PATHS.SIGNUP} className='submit-button'>Sign up</Link>
            </div>
        );
    }

    setLocalAuthent = () => {       
       localStorage.setItem('isAuthenticated', this.props.isAuthenticated);
        console.log('isAuthenticated: ', localStorage.getItem('isAuthenticated'));
        return localStorage.getItem('isAuthenticated');
    }

    logHandle = values => {               
        return  LoginService.signIn(values)
        // .then(auth => auth['auth'] ? this.props.loginUser(auth) : console.log('No'));  
        .then( auth => {
            // console.log('auth Login: ', auth)
            if(auth['auth']) {
                this.props.loginUser(auth); 
                this.setLocalAuthent();
                // this.redirectToLogin();
                console.log('logHandle ', this.props.isAuthenticated, localStorage.getItem('isAuthenticated'));
                
            } else {
                console.log('No') 
            }
        })      
    }
}

const mapStateToProps = ({login}) => ({
    isAuthenticated: login.isAuthenticated
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser
}, dispatch);

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (Login)); 
