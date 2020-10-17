import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import RouteProtected from './RouteProtected';
import LoginView  from '../login/LoginView';
import RegisterMainView from '../login/RegisterMainView';
import ResetView from '../login/ResetView';
import HomeView from '../home/HomeView';

import history from './history';
import RegisterEndView from "../login/RegisterEndView";
import AccountView from "../login/AccountView";
import InitView from "../home/InitView";

import MailView from "../home/MailView";

import InitialPayView from "../payment/InitialPayView";
import PendingPayView from "../payment/PendingPayView";
import QuotePayView from "../payment/QuotePayView";

import DocumentationView from "../home/DocumentationView";
import UploadDocumentsView from "../home/UploadDocumentsView";
import RegisterView from "../home/RegisterView";
import LoginBackView from "../login/LoginBackView";
import NavBar from '../navigation/NavBar';
import PasswordView from "../config/PasswordView";
import HomeGuestView from '../home/HomeGuestView';

import AuthService from '../../services/auth.service';
import EditorScheduleView from "../schedules/EditorScheduleView";
import OverdueView from "../payment/OverdueView";
import EditScheduleView from "../schedules/EditScheduleView";

export default class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogged: false,
           
        }
    }

    handleLogged = (isLogged) => {
        console.log("route:", this.state.isLogged);
        if(!this.state.isLogged){
            let isLoggedStorage= AuthService.getIsLogged();
            console.log(isLoggedStorage)
            if(isLoggedStorage){
                isLogged = true;
            }
            else{
                isLogged = false;
            }
        }
        this.setState({
            isLogged: this.state.isLogged = isLogged
        });
    }
    render() {
        const { isLogged} = this.state;
        
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
                    <RouteProtected path="/profile" component={AccountView} />
                    <RouteProtected path="/password" component={PasswordView} />
                    <RouteProtected path="/initialpayment" component={InitialPayView} />
                    <RouteProtected path="/pendingpayment" component={PendingPayView} />
                    <RouteProtected path="/quotepayment" component={QuotePayView} />
                    <RouteProtected path="/mailing" component={MailView} />
                    <RouteProtected path="/documentation" component={DocumentationView} />
                    <RouteProtected path="/registered" component={RegisterView} />
                    <RouteProtected path="/uploadDocuments" component={UploadDocumentsView} />
                    <RouteProtected path="/loginBack" component={LoginBackView} />
                    <RouteProtected path="/editor-schedule" component={EditorScheduleView} />
                    <RouteProtected path="/editschedule" component={EditScheduleView}></RouteProtected>
                    <RouteProtected path="/overduepayment" component={OverdueView}></RouteProtected>
                    <Route path="/guest" component={HomeGuestView}></Route>
                    <RouteProtected path="/" component={LoginPage} />
                </Switch>
            </Router>
        )
    }
}