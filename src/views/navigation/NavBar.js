import React, { Component } from 'react';
import AuthService from '../../services/auth.service';
import { Image, Navbar, Nav, NavDropdown, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCreditCard, BsBellFill, BsQuestionSquareFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa'

import Account from '../../components/user/Account';
import history from  '../navigation/history';
import logo_nav from '../../images/navologo.png';
import '../styles/Custom.css';

export default class NavBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showLogout: false,
      showAccount: false,
    }
  }
  
  /**
   * Redirect to path
   * @param {*} e 
   * @param {*} path 
   */
  OnClicked = (e, path) => {
    history.push(path);
  }



  // Handle modal logout
  handleClose = (e) => {
    this.setState({
      showLogout : false
    });
  }
  handleShow = (e) => {
    e.preventDefault();
    this.setState({
      showLogout : true
    });
  }
  onCloseSession = (e) => {
    e.preventDefault();
    AuthService.logout();
    this.setState({
      showLogout : false
    });
    history.push("/sign-in");
  }

  // Handle modal account
  handleCloseAccount = (e) => {
    e.preventDefault();
    this.setState({
      showAccount : false
    });
  }
  handleShowAccount = (e) => {
    e.preventDefault();
    this.setState({
      showAccount : true
    });
  }

  
  render(){
    // console.log("Navbar");
    const isLogged = AuthService.getIsLogged();
    const isAuthorized = AuthService.getIsLogged();
    const name = AuthService.getName();
    // console.log(name, isLogged)
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#" onClick={e => this.OnClicked(e, "/home")}><Image src={logo_nav} style={{width:"100px"}}></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isLogged && isAuthorized && <Navbar.Collapse id="basic-navbar-nav"style={{ textAlign: "right"}}>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            {/* <Nav.Link href="" onClick={e => this.OnClicked(e, "/home")}>Principal</Nav.Link>
            <Nav.Link href="" onClick={() => this.handleShowAccount()}>Mi Cuenta</Nav.Link> */}
            <NavDropdown title={name} id="basic-nav-dropdown">
              <NavDropdown.Item href="" onClick={e => this.OnClicked(e, "/profile")}>Mi Cuenta</NavDropdown.Item>
              <NavDropdown.Item href=""  onClick={e => this.OnClicked(e, "/password")}>Cambiar contraseña</NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item href="">Cerrar sessión</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="" onClick={(e) => this.handleShow(e)}>| Cerrar sesión</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        }
        {!isLogged && !isAuthorized && 
            <Navbar.Collapse id="basic-navbar-nav"style={{ textAlign: "right"}}>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link href="" onClick={e => this.OnClicked(e, "/sign-in")}>Iniciar sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        }
      </Navbar>
      {/* Modal */}
      <Modal show={this.state.showLogout} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Cerrar sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group>
                  ¿Desea cerrar su sesión?
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" size="sm" onClick={(e) => this.onCloseSession(e)}>
              Aceptar
          </Button>
          <Button variant="secondary" size="sm" onClick={(e) => this.handleClose(e)}>
              Cancelar
          </Button>
          </Modal.Footer>
      </Modal>
      {/* Modal */}
      <Modal show={this.state.showAccount} onHide={(e) => this.handleCloseAccount(e)}>
          <Modal.Header closeButton>
          <Modal.Title>Mi cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                  <Account></Account>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={(e) => this.handleCloseAccount(e)}>
              Cerrar
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
  }
}

