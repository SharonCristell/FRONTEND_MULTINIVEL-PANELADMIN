import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Initial from '../../components/payment/Initial';


export default class InitialPayView extends Component {
    
    render(){
        return(
            <div style={{ background: "white" }}>
                <Form.Label className="content-title">Operaciones</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="initial" >
                        <Tab eventKey="initial" title="Pagos Iniciales">
                            <Initial></Initial>
                        </Tab>
                </Tabs>
            </div>
        );
    }
}