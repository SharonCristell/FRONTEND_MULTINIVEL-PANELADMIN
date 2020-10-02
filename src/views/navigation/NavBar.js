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

import Sidebar from "./Sidebar";
import Content from "../navigation/Content";
import '../styles/Navbar.css';
// // Production
const link = 'https://inclub.world';

//Test
//const link = 'https://inresorttest.web.app'

export default class NavBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showLogout: false,
      showAccount: false,
      showGuest: false,
      navExpanded: false,
      user: "",
      password: "",

    }
   
  }
  
  /**
   * Redirect to path
   * @param {*} e 
   * @param {*} path 
   */
  OnClicked = (e, path) => {
    history.push(path);
    this.setState({
      navExpanded: this.state.navExpanded = false,
    })
  }

  handleHome = (e) => {
    let currentLocation = window.location;
    //console.log(currentLocation);
    if(currentLocation.pathname.includes("home")) {
      window.location.reload();
    } else {
      history.push("/home");
    }
  }
  setNavExpanded = (expanded) => {
    console.log(expanded)
    this.setState({ 
      navExpanded: this.state.navExpanded = expanded 
    });
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
  //  LoginGuest 
  OnClickGuest = async(e) => {
    e.preventDefault();

    let data = {
      username : this.state.user,
      password : this.state.password
    }
    // Load services
    let response = await AuthService.loginAdmin(data);
    if(response !== undefined && response.access_Token !== null) {
      this.setState({
        showGuest: false,
        user: "",
        password: ""
      });

      // redireect new page sha512
      let idUser = response.idUser;
      let field = "6f1e7dc9b9c43fb7dd2ff99b7a6bc0cb5607e8b03d5a97ae3004685338a7f1821ec146da4567500bd97fb2e851df1a1b99361a7ff2366b7700ebc856d702cb69";
      let url = link + "/guest?" + field + "=" + idUser;
      window.open(url, "_blank")
    } else {
        this.setState({
          showGuest: false,
          user: "",
          password: ""
        });
        alert("Ocurrió un problema. Inténtelo más tarde.")
    }

  }

  handleShowGuest = (e) => {
    e.preventDefault();
    this.setState({
      showGuest : true
    });
  }

  handleCloseGuest = (e) => {
   
    this.setState({
      showGuest : false,
      use: "",
      password: ""
    });
  }
  handleChange = (e, field) => {
    
    let value = e.target.value;
    this.setState({
        [field]: this.state[field] = value
    });
   
  };

  ///// End guest


  
  render(){
    // console.log("Navbar");
    const isLogged = AuthService.getIsLogged();
    console.log(isLogged);
    const name = AuthService.getName();
    const idUser = AuthService.getCurrentIdUser();
    let issuperUser = false;
    if(Number(idUser) === 12853) {
      issuperUser = true;
    }
    const { navExpanded } = this.state;
    // console.log(name, isLogged)
  return (
    <div>
      <Navbar bg="light" expand="lg">
        
        
        <Navbar.Brand href="#" onClick={e => this.handleHome(e)}><Image src={logo_nav} style={{width:"100px"}}></Image></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isLogged && <Navbar.Collapse id="basic-navbar-nav"style={{ textAlign: "right"}}>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            {/* <Nav.Link href="" onClick={e => this.OnClicked(e, "/home")}>Principal</Nav.Link>
            <Nav.Link href="" onClick={() => this.handleShowAccount()}>Mi Cuenta</Nav.Link> */}
           
            <NavDropdown title={name} id="basic-nav-dropdown">
              <NavDropdown.Item href="" onClick={e => this.OnClicked(e, "/profile")}>Mi Cuenta</NavDropdown.Item>
              <NavDropdown.Item href=""  onClick={e => this.OnClicked(e, "/password")}>Cambiar contraseña</NavDropdown.Item>
              <NavDropdown.Divider />
              {issuperUser && 
                <NavDropdown.Item href="" onClick={e => this.handleShowGuest(e)}>Ver perfil de socio</NavDropdown.Item>
              }
            </NavDropdown>
            <Nav.Link href="" onClick={(e) => this.handleShow(e)}>| Cerrar sesión</Nav.Link>
          </Nav>
          </Navbar.Collapse> 
           //<Sidebar toggle={this.toggle} isOpen={this.state.isOpen} />&& 
           //<Content toggle={this.toggle} isOpen={this.state.isOpen} /> 
        }
        {!isLogged  && 
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
      {/* Modal guest*/}
      <Modal show={this.state.showGuest} onHide={(e) => this.handleCloseGuest(e)}>
          <Modal.Header closeButton>
          <Modal.Title>Ver perfil de socio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control type="text" placeholder="Ingrese usuario" 
                                    onChange={e => {this.handleChange(e, 'user')}}/>
                    </Form.Group>
                  </Form>
                  <Form>
                    <Form.Group>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Ingrese contraseña" 
                                    onChange={e => {this.handleChange(e, 'password')}}/>
                    </Form.Group>
                  </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="success" onClick={(e) => this.OnClickGuest(e)}>
              Ingresar
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
  }
}

