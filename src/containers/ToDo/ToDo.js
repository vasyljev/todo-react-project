import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import ToDoList from '../../containers/ToDoList'
import {PATHS} from "../../constants/routes";
import PrivateRoute from '../../containers/PrivateRoute';
import {loginUser} from '../../actions/login'
import {logOutUser} from '../../actions/login'

class ToDo extends Component {
    

    render() {
        // const auth = JSON.stringify(this.props.isAuthenticated);
        return (
        <>
            {/* <h3>{auth}</h3> */}
                <Switch>
                    <PrivateRoute path={PATHS.TODO_LIST} component={ToDoList} isAuthenticated={this.props.isAuthenticated} />   
                    
                </Switch>
                           
        </>
        );
    }
}

const mapStateToProps = ({login}) => ({
    isAuthenticated: login.isAuthenticated
  });

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser, logOutUser
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (ToDo); 
