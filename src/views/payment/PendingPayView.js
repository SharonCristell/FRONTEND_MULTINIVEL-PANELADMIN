import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Pending from '../../components/payment/Pending';



export default class PendingPayView extends Component {
    
    render(){
        return(
            <div style={{ background: "white" }}>
                <Form.Label className="content-title">Pagos Pendientes</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="initial" >
                        <Tab eventKey="initial" title="Pagos Pendientes">
                            <Pending></Pending>
                        </Tab>
                </Tabs>
            </div>
        );
    }
}