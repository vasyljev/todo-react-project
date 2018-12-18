import React, { Component } from 'react';
import LoginContainer from '../../containers/Login';
import { Link, Redirect } from 'react-router-dom';
import {PATHS} from "../../constants/routes";
import {loginUser} from '../../actions/login'
import {logOutUser} from '../../actions/login'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Login extends Component {
    render() {
        
        const {isAuthenticated} = this.props;
        if(this.props.isAuthenticated === true) {
            return <Redirect to={PATHS.TODO_LIST} />
        }
        return(
            <div className='login-form'>
                <h2>Login form</h2>
                <LoginContainer isAuthenticated={isAuthenticated} 
                                loginHandle= {this.logHandle} 
                                loginUser= {this.loginUser}
                                />
                <Link to={PATHS.SIGNUP} className='submit-button'>Sign Up</Link>
                {/* <Link to={PATHS.TODO_LIST}>Todo</Link> */}
            </div>
        );
    }

    logHandle = () => {
        
        return  this.props.loginUser();
    }
   
}

const mapStateToProps = ({login}) => ({
    isAuthenticated: login.isAuthenticated
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (Login); 
