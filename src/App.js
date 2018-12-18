import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'


import './styles/base.scss';
import MainLayout from "./Layout/Main";
import ToDo from './containers/ToDo'
import ErrorPage from "./containers/Error/ErrorPage";
import {PATHS} from "./constants/routes";
import Login from './components/Login';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <BrowserRouter>
          <div className="App">
            <MainLayout>
              <Switch>
                <Route exact path='/' component={() => <Redirect to={PATHS.TODO} />} />
                <Route path={PATHS.TODO} component={ToDo} />
                <Route exact  path={PATHS.LOGIN} component={Login} />
                <Route exact  path={PATHS.SIGNUP} component={SignUp} />  
                <Route component={ErrorPage} />
              </Switch>
            </MainLayout>
          </div>
        </BrowserRouter>
      </Provider>  
    );
  }
}

export default App;
