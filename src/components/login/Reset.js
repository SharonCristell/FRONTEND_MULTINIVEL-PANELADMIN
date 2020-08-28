import React, { Component } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import history from '../../views/navigation/history';

const url_reset = "https://api.inresorts.club/api/User/StarRecovery";
const url_recovery = "https://api.inresorts.club/api/User/Recovery";

export default class Reset extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            mesagge: ""
        }
    }

    handleChange = (e, field) => {
        console.log(field, ": ",  e.target.value);
        this.setState({
            [field]: e.target.value,
            message: ""
        });
        console.log(this.state);
    };

    sendData = (e) => {
        e.preventDefault();
        var data = {};
        data.username = this.state.email;
        fetch(url_reset, {
            method:'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(response =>{ 
            console.log(response);
            if(response.status === 1) {
                this.sendMail();
            } else {
                this.setState({
                    mesagge: this.state.message = "Correo electrónico o usuario no esta registrado."
                });
            }
                        
        })
        .catch(error => {
            console.log('error');
            alert('Error');
        });
    }

    sendMail = () => {
        var data = {};
        data.username = this.state.email;
        fetch(url_recovery, {
            method:'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(response =>{ 
            console.log(response);
            if(response.status === 1) {
                alert("Le hemos enviado un correo.");
                history.push("/");
            }           
        })
        .catch(error => {
            console.log('error');
            console.log(error);
        });
    }

    render() {
        return (
                <Form>
                    <h3>Reestablece tu contraseña</h3>
                    <Form.Group>
                        <Form.Label>Ingresa tu correo electrónico o usuario: </Form.Label>
                        <Form.Control required type="email" 
                            placeholder="Ingrese su correo electrónico o usuario."
                            onChange={e => this.handleChange(e, "email")} />
                        <Form.Text className="textAlert">{this.state.message}</Form.Text >
                        <Form.Text>Recibirás un correo para reestablecer tu contraseña. </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={this.sendData}>Reestablecer contraseña</Button>
                    </Form.Group>

            </Form>
        );
    }
    

}
