import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PendingPayment from '../../components/pendingpayment/PendingPayment';



export default class PayView extends Component {
    
    render(){
        return(
            <div style={{ background: "white" }}>
                <Form.Label className="content-title">Pagos Pendientes</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="comission" title="Pagos Pendientes">
                            <PendingPayment></PendingPayment>
                        </Tab>
                </Tabs>
            </div>
        );
    }
}