import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Comission from '../../components/comissions/Comission';


export default class PayView extends Component {
    
    render(){
        return(
            <div style={{ background: "white" }}>
                <Form.Label className="content-title">Operaciones</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="comission" title="Pagos Iniciales">
                            <Comission></Comission>
                        </Tab>
                </Tabs>
            </div>
        );
    }
}