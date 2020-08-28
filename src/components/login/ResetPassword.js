import React, { Component } from 'react';
import {Form, Button, Row, Col, Badge} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from '../../views/navigation/history';
import UserService from '../../services/user.service';

export default class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            password: "",
            repassword: "",
            valPassword: false,
            valRePassword: false,
            isSame: false,
            message: ""
        }
    }

    handleChange = (e, field) => {
        console.log(field, ": ",  e.target.value);
        this.setState({[field]: e.target.value});
        console.log(this.state);
        this.setState({
            message: this.state.message = ""
        });
    };

    validatePassword = () => {
        
        if(this.state.password.length === 0) {
            this.setState({valPassword: this.state.valPassword = true});
            return false;
        } else if (this.state.repassword.length === 0){
            this.setState({
                valPassword: this.state.valPassword = false,
                valRePassword: this.state.valRePassword = true
            });
            return false;
        } else if (this.state.repassword !== this.state.password){
            this.setState({
                valPassword: this.state.valPassword = false,
                isSame: this.state.isSame = false,
                message: this.state.message = "Contraseñas no coinciden."
            });
            return false;
        }
        this.setState({
            message: this.state.message = ""
        });
        return true;
    }

    sendData = async(e) => {
        e.preventDefault();

       if(this.validatePassword()) {
            let data = {};
            data.token = this.props.token;
            let user = {};
            user.password = this.state.password;
            data.user = user;
            
            let response = await UserService.recoverPassword(data);

            if(response !== undefined){
                if(response.status === 1) {
                    history.push("/");
                } else {
                    alert("Ocurrió un problema al reestablecer su contraseña.");
                }
            } else {
                alert("Tuvimos problemas en reestablecer su contraseña. Inténtalo más tarde.");
            }
       }
    };

    render() {
        
        return (
                <div>
                    <h3>Reestablecer contraseña</h3>
                    <Form controlid="validationPassword" validated={this.state.valPassword}>
                        <Form.Group >
                            <Form.Label>Nueva contraseña</Form.Label>
                            <Form.Control required type="password" 
                                placeholder="Ingresa tu nueva contraseña"
                                onChange={e => this.handleChange(e, "password")}/>
                            <Form.Control.Feedback type="invalid">Ingrese contraseña.</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Form controlid="validationRePassword" validated={this.state.valRePassword}>
                        <Form.Group>
                        <Form.Label>Vuelva a ingresar su contraseña</Form.Label>
                        <Form.Control required type="password" 
                            placeholder="Vuelva a ingresa su contraseña"
                            onChange={e => this.handleChange(e, "repassword")} isValid={this.state.isSame} />
                        <Form.Control.Feedback type="invalid">Vuelva a ingresar su contraseña.</Form.Control.Feedback>
                        <Form.Text className="textAlert">{this.state.message}</Form.Text>
                    </Form.Group>
                    </Form>
                    <Form.Group>
                         <div className="row justify-content-between" >
                            <Col >
                                <Button variant="primary" onClick={this.sendData}
                                    >Reestablecer</Button>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <Button variant="secondary"
                                    >Cancelar</Button>
                            </Col>
                        </div>
                    </Form.Group>
              </div>
        );
    }
    

}
