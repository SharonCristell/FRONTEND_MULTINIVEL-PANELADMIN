import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Period from '../../components/admin/Period';

export default class PeriodView extends Component {
    
    render(){
        return(
            <div style={{ background: "white" }}>
                <Form.Label className="content-title">Operaciones</Form.Label>
                <Tabs className="custom-tabs-main" defaultActiveKey="initial" >
                        <Tab eventKey="initial" title="Pagos vencidos">
                            <Period></Period>
                        </Tab>
                </Tabs>
            </div>
        );
    }
}