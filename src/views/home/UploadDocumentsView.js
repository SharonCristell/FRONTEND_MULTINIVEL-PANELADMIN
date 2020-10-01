import React, { Component } from 'react';
import { Form,  Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import UploadDocument from '../../components/uploadDocuments/UploadDocument';

export default class UploadDocumentsView extends Component {
    
    render(){
        return(
            <div style={{background: "white"}}>
                <Form.Label className="content-title">Archivos cargados</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="comission" title="Cargar archivos bancarios">
                            <UploadDocument></UploadDocument>
                        </Tab>
                </Tabs>
                

            </div>
        );
    }
}