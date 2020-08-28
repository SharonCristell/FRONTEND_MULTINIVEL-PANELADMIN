import React from 'react';
import history from '../navigation/history';
import {Redirect} from 'react-router';

function InitView() {
    const isLogged = false;
    const isAuthorized = false;
    if(isLogged && isAuthorized) {
        return <Redirect to={"/home"}></Redirect>
    }
    return (
    
      <div >
           <h3>Bienvenidos</h3>
      </div>
    );
  }
  
  export default InitView;
  