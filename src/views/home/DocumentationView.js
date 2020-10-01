import React, { Component } from 'react';
import { Form,  Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserDocumentation from '../../components/documentation/UserDocumentation';

export default class DocumentationView extends Component {
    
    render(){
        return(
            <div style={{background: "white"}}>
                <Form.Label className="content-title">Datos de los Usuarios</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="comission" title="Corregir datos y documentos">
                            <UserDocumentation></UserDocumentation>
                        </Tab>
                </Tabs>
                

            </div>
        );
    }
}