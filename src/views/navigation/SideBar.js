import React, { Component } from 'react';
import AuthService from '../../services/auth.service';
import { Image, Navbar, Nav, NavDropdown, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCreditCard, BsBellFill, BsQuestionSquareFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa'

import Account from '../../components/user/Account';
import history from '../navigation/history';
import logo_nav from '../../images/navologo.png';
import '../styles/Custom.css';
import Content from "../navigation/Content";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import icon2 from '../../images/icons/settings.png';
import '../styles/Navbar.css';

// // Production
// const linkMail = 'https://inclub.world/register-payment';
// const linkServer = 'https://inclub.world'


// Test
const linkMail = 'https://inresorttest.web.app/register-payment'
const linkServer = 'https://inresorttest.web.app'

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLogout: false,
            showAccount: false,
            newLogin: "link",

        }
        this.handleShowLogin = this.handleShowLogin.bind(this);

    }
    componentDidMount() {

        let idSocio =  this.state.idSocio;
        //let link = linkServer + '/sign-in' ;   
        let link = linkServer + '/login-admin' ;       
        this.setState({
            link: this.state.link = link
        });        
    
      }

    /**
     * Redirect to path
     * @param {*} e 
     * @param {*} path 
     */
    OnClicked = (e, path) => {
        history.push(path);
    }
    handleShowLogin  = (e) => {

        e.preventDefault();
        window.open (this.state.link);

    }



    // Handle modal logout
    handleClose = (e) => {
        this.setState({
            showLogout: false
        });
    }
    handleShow = (e) => {
        e.preventDefault();
        this.setState({
            showLogout: true
        });
    }
    onCloseSession = (e) => {
        e.preventDefault();
        AuthService.logout();
        this.setState({
            showLogout: false
        });
        history.push("/sign-in");
    }

    // Handle modal account
    handleCloseAccount = (e) => {
        e.preventDefault();
        this.setState({
            showAccount: false
        });
    }
    handleShowAccount = (e) => {
        e.preventDefault();
        this.setState({
            showAccount: true
        });
    }


    render() {
        // console.log("Navbar");
        const isLogged = AuthService.getIsLogged();
        const isAuthorized = AuthService.getIsLogged();
        const name = AuthService.getName();
        const {link } = this.state;
        // console.log(name, isLogged)
        return (

            <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
                <div className="sidebar-header">
                    <Button
                        variant="link"
                        onClick={this.props.toggle}
                        style={{ color: "#fff" }}
                        className="mt-4"
                    >
                         <Image className="col-image" src={icon2} ></Image>
                    </Button>
                </div>
                <Navbar bg="light" expand="lg" className="flex-column">
                    <Nav.Link href="" onClick={e => this.OnClicked(e, "/initialpayment")}>Pagos Iniciales</Nav.Link>
                    <Nav.Link href="" onClick={e => this.OnClicked(e, "/pendingpayment")}>Pagos Pendientes</Nav.Link>
                    <Nav.Link href="" onClick={e => this.OnClicked(e, "/mailing")}>Envio Correos</Nav.Link>
                    <Nav.Link href="" onClick={e => this.OnClicked(e, "/documentation")}>Corregir datos y documentos</Nav.Link>
                    <Nav.Link href="" onClick={e => this.OnClicked(e, "/registered")}>Socios Registrados</Nav.Link>
                    <Nav.Link href="" onClick={e => this.OnClicked(e, "/uploadDocuments")}>Carga de Archivos</Nav.Link>
                {/*<Nav.Link href="" onClick={e => this.handleShowLogin(e)}>Entrar BackOffice Socios</Nav.Link>*/}
                </Navbar>

            </div>
        );
    }
}

