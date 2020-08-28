import React, { Component } from 'react';
import { Button, Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/logo.png'

import history from '../navigation/history';

export default class PackageEndView extends Component{

    onEventClcik = (e) => {
        e.preventDefault();
        history.push("/home");
    }
    render(){
        return(
            <div className="register-inner">
                <Form style={{textAlign:'center'}}>
                    <Image src={logo} fluid></Image>
                    <hr className="line"></hr>
                    <Form.Group>
                        <h4 className="textMessage">Estamos validando ...</h4>
                        <Form.Label className="textMessage">En breves momentos, tu compra será finalizada. </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={this.onEventClcik}>Volver al inicio</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}