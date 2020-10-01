import React, { Component } from 'react';
import { Form,  Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PartnerList from '../../components/register/PartnerList';

export default class RegisterView extends Component {
    
    render(){
        return(
            <div style={{background: "white"}}>
                <Form.Label className="content-title">Socios Registrados</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="comission" title="Socios Registrados">
                            <PartnerList></PartnerList>
                        </Tab>
                </Tabs>
                

            </div>
        );
    }
}