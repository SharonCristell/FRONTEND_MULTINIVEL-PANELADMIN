import React, { Component } from 'react';
import {Carousel, Row, Col, Card, Table, Button, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo1 from '../../images/carousel/BANNER INCLUB-1.png';
import logo2 from '../../images/carousel/BANNER INCLUB-2.png';
import logo3 from '../../images/carousel/BANNER INRESORT FINAL.png';
import logo4 from '../../images/carousel/BANNER KEOLA-3.png';


import history from '../navigation/history';
import MainView from './MainView';
import TreeView from '../tree/TreeView';
import RegisterMainView from '../login/RegisterMainView';
import MenuHome from '../../components/home/MenuHome';
import NetworkView from './NetworkView';
import ToolView from './Toolview';
import PayView from './PayView';
import ShopView from './ShopView';

export default class HomeView extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventState:{
                showMenuHome: true,
                showMenuSocio: false,
                showMenuTool: false,
                showMenuNet: false,
                showMenuPay: false,
                showMenuShop: false
            }
        }
    }

    onClicked = (e, path) => {
        history.push(path);
    }

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
        return(
            <div style={{background: "white"}}>
                {/* <div style={{display: showCarrusel?'inline':'none'}}> */}
                {/* Carousel */}
                <Carousel>
                    {/* <Carousel.Item>
                        <img  className="d-block w-100" src={logo1} height="250px"/>
                        <Carousel.Caption>
                        {/* <h3>in Rekkkkkksorts</h3> */}
                        {/* </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image className="d-block w-100" src={logo2} />

                    </Carousel.Item> */}
                    <Carousel.Item>
                        <Image className="d-block w-100" src={logo3}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image className="d-block w-100" src={logo4} />
                    </Carousel.Item>
                </Carousel>
                {/* </div> */}
                <div  className="home-container">
                    {/* Menu home */}
                    <MenuHome  onChange={this.eventMenu} onClick={this.onClicked}></MenuHome>
                    <hr></hr>
                    {/* Content */}
                    <div>
                        {eventState.showMenuHome && <MainView></MainView>}
                        {eventState.showMenuSocio && <RegisterMainView></RegisterMainView>}
                        {eventState.showMenuTool && <ToolView></ToolView>}
                        {eventState.showMenuNet && <NetworkView></NetworkView>}
                        {eventState.showMenuPay && <PayView></PayView>}
                        {eventState.showMenuShop && <ShopView></ShopView>}
                    </div>
                </div>
        </div>
        );
    }
}