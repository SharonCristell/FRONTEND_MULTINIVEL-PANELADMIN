import React, { Component } from 'react';
import { Form,  Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import BasicOperationView  from '../config/BasicOperationView';

export default class MailView extends Component {
    
    render(){
        return(
            <div style={{background: "white"}}>
                <Form.Label className="content-title">Mailing</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="comission" title="Reenviar correos">
                            <BasicOperationView></BasicOperationView>
                        </Tab>
                </Tabs>
                

            </div>
        );
    }
}