import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import OverduePayment from '../../components/payment/OverduePayment';


export default class OverdueView extends Component {
    
    render(){
        return(
            <div style={{ background: "white" }}>
                <Form.Label className="content-title">Operaciones</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="initial" >
                        <Tab eventKey="initial" title="Deudas vencidas">
                            <OverduePayment></OverduePayment>
                        </Tab>
                </Tabs>
            </div>
        );
    }
}