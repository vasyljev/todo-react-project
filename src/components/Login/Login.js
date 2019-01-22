import React, { Component } from 'react';
import LoginContainer from '../../containers/Login';
import LoginService from '../../services/LoginServices';
import { Link, Redirect } from 'react-router-dom';
import {PATHS} from "../../constants/routes";
import {loginUser} from '../../actions/login';
import {logOutUser} from '../../actions/login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Login extends Component {
    
    
    render() {      
        // this.setLocalAuthent();  
        
        let authValue = JSON.parse(localStorage.getItem('isAuthenticated'))
        console.log('isAuthenticated render: ', authValue);
        console.log('update',  this.props.isAuthenticated);
        if(JSON.parse(localStorage.getItem('isAuthenticated')) === true) {
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
    }

    componentDidMount() {
        // localStorage.setItem('isAuthenticated', this.props.isAuthenticated);
        // console.log('componentDidMount',  this.props.isAuthenticated, JSON.parse(localStorage.getItem('isAuthenticated')));
        // if(JSON.parse(localStorage.getItem('isAuthenticated')) === true) {
        //     console.log('componentDidMount true',  this.props.isAuthenticated);
        //     return <Redirect to={PATHS.TODO_LIST} />
        // }
    }
    
    componentDidUpdate() {
        // localStorage.setItem('isAuthenticated', this.props.isAuthenticated);
        // console.log('componentDidUpdate',  this.props.isAuthenticated, JSON.parse(localStorage.getItem('isAuthenticated')));
        // if(JSON.parse(localStorage.getItem('isAuthenticated')) === true) {
        //     console.log('update true',  this.props.isAuthenticated);
        //     return <Redirect to={PATHS.TODO_LIST} />
        // }
    }

    logHandle = values => {               
        return  LoginService.signIn(values)
        // .then(auth => auth['auth'] ? this.props.loginUser(auth) : console.log('No'));  
        .then( auth => {
            // console.log('auth Login: ', auth)
            if(auth['auth']) {
                this.props.loginUser(auth); 
                console.log('logHandle ', this.props.isAuthenticated, localStorage.getItem('isAuthenticated'));
                zz
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

export default connect (mapStateToProps, mapDispatchToProps) (Login); 
