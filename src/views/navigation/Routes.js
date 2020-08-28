import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import RouteProtected from './RouteProtected';
import LoginView  from '../login/LoginView';
import RegisterMainView from '../login/RegisterMainView';
import ResetView from '../login/ResetView';
import HomeView from '../home/HomeView';

import history from './history';
import RegisterEndView from "../login/RegisterEndView";
import TreeView from "../tree/TreeView";
import AccountView from "../login/AccountView";
import InitView from "../home/InitView";
import NavBar from '../navigation/NavBar';
import PasswordView from "../config/PasswordView";

import AuthService from '../../services/auth.service';
export default class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogged: false,
            isAuthorized:false,
        }
    }

    handleLogged = (isLogged, isAuthorized) => {
        console.log("route:", isLogged);
        if(!isLogged && isAuthorized ){
            let isLoggedStorage= AuthService.getIsLogged();
            let isAuthorizedStorage= AuthService.getIsAuthorized();

            if(isLoggedStorage && isAuthorized){
                isLogged = true;
                isAuthorized=true;
            }
        }
        this.setState({
            isLogged: this.state.isLogged = isLogged,
            isAuthorized: this.state.isAuthorized = isAuthorized
        });
    }
    render() {
        const { isLogged, isAuthorized } = this.state;
        const LoginPage = (props) => {
            return (
              <LoginView 
                isLogged={this.handleLogged}
              />
            );
          }

        return (
            <Router history={history}>
                <NavBar isLogged={isLogged}></NavBar>
                <Switch>
                    <Route exact path='/welcome' component={InitView} />
                    <Route path="/sign-in" render={LoginPage}/>
                   
                    <RouteProtected path="/sign-up" component={RegisterMainView} />
                    <Route path="/reset" component={ResetView} />
                    <RouteProtected path="/home" component={HomeView}/>
                    <RouteProtected path="/tree" component={TreeView} />
                    <RouteProtected path="/profile" component={AccountView} />
                    <RouteProtected path="/password" component={PasswordView} />
                    <RouteProtected path="/" component={LoginPage} />
                </Switch>
            </Router>
        )
    }
}