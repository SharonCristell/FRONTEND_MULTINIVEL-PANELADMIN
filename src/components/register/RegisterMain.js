import React, { Component } from 'react';
import { Form, Tabs, Tab, Button, Row, Col }from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepSettings from './StepSettings';
import StepPayment from './StepPayment';
import Step from './Step';

//Main register
export default class RegisterMain extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentTab: "Step1",
            btnBack : 'none',
            btnNext: 'inline-block',
            tabs : ["Step1", "Step2", "Step3", "Step4"],
            packages: []
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ packages: props.packages })
    }
    /**
     * 
     * @param {*} data  value given for child conmponent, it associates with onChange function from child
     * @param {*} field properties send by child component
     * Send the data using props ( reference of its parents )
     */
    eventhandler = (data, field) => {
        // console.log('register main');
        // console.log(data, field);
        this.props.onChange(data, field);
    };
    
    eventPay = (data, field) => {
        // console.log('register main');
        // console.log(data, field);
        this.props.eventPay(data, field);
    };

    eventVoucher = (data, field) => {
        this.props.eventVoucher(data, field);
    };

    /**
     * 
     * @param {*} e event associates navigation's buttons
     */
    onNavigation = (e) =>{
        console.log(e);
        e.preventDefault();
        let event = e.target.id;
        let current = this.state.currentTab;
        let idx = this.state.tabs.findIndex(element => element === current);
        if(event === "btnBack") {
            idx = idx - 1 ;
        } else if (event === "btnNext") {
            idx = idx + 1 ;
        
        }
        this.updatePageNavigation(idx, current);
    };

    /**
     * TODO : event to handle if the form (steps is complete)
     */
    eventComplete = () => {}


    handleSelect = (key) => {

        let idx = this.state.tabs.findIndex(element => element === key);
        this.updatePageNavigation(idx, key);
           
        
    }
    updatePageNavigation = (idx,key) => {
        let back = '';
        let next = '';
        if(idx === (this.state.tabs.length -1)){
           next = 'none';
           back = 'inline-block';
           this.props.eventFooter("flex", "displayFooter")
            
        } else  if (idx === 0) {
            next = 'inline-block';
            back = 'none';
            this.props.eventFooter("none", "displayFooter")
        } else {
            next = 'inline-block';
            back = 'inline-block';
            this.props.eventFooter("none", "displayFooter")
        }
        this.setState({
                currentTab: this.state.tabs[idx],
                btnNext: next,
                btnBack: back
            }, () => {
                console.log(this.state)
            });
        
    }

    render() {
        
        // console.log("Register main");
        // console.log(this.props.packages);
        // console.log(this.state);
        return (
            <div>
            <Form>
                <Form.Group >
                <Tabs 
                    activeKey = {this.state.currentTab}
                    onSelect={key => this.handleSelect(key)}>
                    <Tab eventKey="Step1" title='Paso 1'>
                        <StepOne onChange={this.eventhandler} ></StepOne>
                    </Tab>
                    <Tab eventKey="Step2" title='Paso 2'>
                        <StepTwo onChange={this.eventhandler}></StepTwo>
                    </Tab>
                    <Tab eventKey="Step3" title='Paso 3'>
                        <StepThree onChange={this.eventhandler}></StepThree>
                    </Tab>
                    <Tab eventKey="Step4" title='Medios de pago'>
                        <Step packages={this.state.packages}
                                eventPay={this.eventPay}
                                onchangePayVoucher={this.eventVoucher}></Step>
                    </Tab>
                </Tabs>
                </Form.Group>
                <Form.Group>
                    <Row className="row justify-content-between">
                        <Col ms={4}>
                            <Button id="btnBack" style={{display:this.state.btnBack}} variant="outline-primary"
                                onClick={this.onNavigation}>Atrás</Button>
                        </Col>
                        <Col  style={{textAlign: 'right'}}>
                            <Button id="btnNext" style={{display:this.state.btnNext}} variant="outline-primary"
                                onClick={this.onNavigation}>Siguiente</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            
            </div>
        );
    }
}
