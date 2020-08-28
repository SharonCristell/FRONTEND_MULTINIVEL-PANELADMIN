import React, { Component } from 'react';
import { Form,  Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Comission from '../../components/mailing/Comission';

export default class ToolView extends Component {
    
    render(){
        return(
            <div>
                <Form.Label className="content-title">Mailing</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="comission" title="Reenviar correos">
                            <Comission></Comission>
                        </Tab>
                </Tabs>
                

            </div>
        );
    }
}