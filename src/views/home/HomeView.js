import React, { Component } from 'react';
import { Carousel, Row, Col, Card, Table, Button, Image, Navbar, Nav, NavDropdown, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo1 from '../../images/carousel/BANNER INCLUB-1.png';
import logo2 from '../../images/carousel/BANNER INCLUB-2.png';
import logo3 from '../../images/carousel/BANNER INRESORT FINAL.png';
import logo4 from '../../images/carousel/BANNER KEOLA-3.png';


import history from '../navigation/history';
import MainView from './MainView';
import RegisterMainView from '../login/RegisterMainView';
import MenuHome from '../../components/home/MenuHome';
import PendingPaymentView from './PendingPaymentView';
import MailView from './MailView';
import PayView from './PayView';
import Sidebar from "../navigation/Sidebar";
import Content from "../navigation/Content";


export default class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventState: {
                showMenuHome: true,
                showMenuSocio: false,
                showMenuTool: false,
                showMenuNet: false,
                showMenuPay: false,
                showMenuShop: false
            },
            isOpen: false,
            isMobile: true,
            
        };
        this.previousWidth = -1;
    }


OnClicked = (e, path) => {
    history.push(path);
}

updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }

componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

/**
 * Event of menu's component
 * @param {*} eventMenuState stat of menu component to show Views
 */
eventMenu = (eventMenuState) => {
    this.setState({ eventState: this.state.eventState = eventMenuState });
    console.log("event menu");
};


render() {
    const { eventState } = this.state;
    console.log("refresh home");
    console.log(eventState
    );
    return (
      <div className="App wrapper">
          <Sidebar toggle={this.toggle} isOpen={this.state.isOpen} />
        {/*<Content toggle={this.toggle} isOpen={this.state.isOpen} /> */}
        </div>


    );
}
}