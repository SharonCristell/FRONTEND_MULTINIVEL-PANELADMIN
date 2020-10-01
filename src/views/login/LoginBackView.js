import React, { Component } from 'react';

import  Login  from '../../components/login/Login';
// import '../styles/Login';


export default class LoginBackView extends Component{
  
  handleLogged = (isLogged, isAuthorized) => {
    console.log("login view", isLogged);
    if(this.props.isLogged && this.props.isAuthorized){
        this.props.isLogged(isLogged);  
        this.props.isLogged(isAuthorized);
 
    } 
  }
  render(){
    return(
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Login isLogged={this.handleLogged}></Login>
        </div>
      </div>
    );
  }
}
