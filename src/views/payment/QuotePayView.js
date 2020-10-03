import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Quote from '../../components/payment/Quote';


export default class QuotePayView extends Component {
    
    render(){
        return(
            <div style={{ background: "white" }}>
                <Form.Label className="content-title">Operaciones</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="initial" >
                        <Tab eventKey="initial" title="Pagos de Cuotas">
                            <Quote></Quote>
                        </Tab>
                </Tabs>
            </div>
        );
    }
}