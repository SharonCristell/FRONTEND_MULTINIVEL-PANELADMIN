import React, { Component } from 'react';
import { Button, Form, Modal, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from '../../services/auth.service';
import history from '../../views/navigation/history';
import logo_nav from '../../images/adminLogo.jpg';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            validate: false,
            showModal: false
        };
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validate: true });
    };

    handleChange = (e, name) => {
        // console.log(name);
        // console.log(e);
        // TODO setState asynchrono
        // this.setState({[e.target.name]: e.target.value});
        this.state[e.target.name] = e.target.value;

    }

    handleClose = () => {
        this.setState({ showModal: false });
    }

    sendLogin = async (e) => {
        e.preventDefault();
        // console.log("Login");
        // history.push("/home")

        var data = {
            username: this.state.username,
            password: this.state.password
        };

        let response = await AuthService.login(data);
        if (response === undefined) {
            alert('Ocurrió un problema. Inténtelo más tarde.');

        } else {
            if (response.access_Token !== null) {
                if (this.props.isLogged) {
                    this.props.isLogged(true);
                    history.push("/home")

                }
                
                else {
                    alert('Usuario y/o contraseña incorrecto. No tiene permisos de acceso al sistema.');
                }

            } else {
                if (this.props.isLogged) {
                    this.props.isLogged(false);

                }
                alert('Usuario y/o contraseña incorrecto. No tiene permisos de acceso al sistema.');

            }
        }
    };

    render() {

        return (
            <Form noValidate validate={this.validate}>
                <h3>Iniciar sesión</h3>
                <h3>Panel del Administrador</h3>

                <div class="text-center">
                    <Image src={logo_nav} style={{ width: "200px" }}></Image>
                </div>
                <br></br>

                <div className="form-group">
                    <label>Usuario</label>
                    <input name='username' type="text" className="form-control" placeholder="Ingresa tu usuario"
                        onChange={e => this.handleChange(e, "username")} />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input name="password" type="password" className="form-control" placeholder="Ingresa tu contraseña"
                        onChange={e => this.handleChange(e, "password")} />
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="chkRemember" />
                        <label className="custom-control-label" htmlFor="chkRemember">Recordar inicio de sesión</label>
                    </div>
                </div> */}

                <button type="submit" className="btn btn-primary btn-block"
                    onClick={this.sendLogin}>Aceptar</button>
                <p className="forgot-password text-right">
                    <a href="/reset">¿Olvidaste tu contraseña?</a>
                </p>
                <Modal
                    show={this.state.showModal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tuvimos problemas en iniciar tu sesión. Inténtalo más tarde.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Aceptar
                    </Button>
                    </Modal.Footer>
                </Modal>

            </Form>
            // <Router>
            //     <Route exact path="/home" component={HomeView} />
            // </Router>
        );
    }
}