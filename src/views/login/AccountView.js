import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'


import ProfileView from '../config/ProfileView';
import DocumentView  from '../config/DocumentView';

export default class AccountView extends Component {

    render() {
        return (
            <div style={{background: "white"}}>
                <Form.Label class="content-title">Datos del Socio</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="account" >
                    <Tab eventKey="profileView" title="Datos de la cuenta">
                        <ProfileView></ProfileView>
                    </Tab>
                    <Tab eventKey="documentView" title="Mis contratos">
                        <DocumentView></DocumentView>
                    </Tab>
                
                </Tabs>
            </div>
        );
    }
}