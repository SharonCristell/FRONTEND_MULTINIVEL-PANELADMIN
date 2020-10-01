import React, { Component } from 'react';
import { Form, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import NetComponent from '../../components/network/NetComponent';
import Placement from '../../components/network/Placement';
import Promotor from '../../components/network/Promotor';
import ManageActivation from '../../components/network/ManageActivation';
import Sponsor from '../../components/network/Sponsors';
import NetResidual from '../../components/network/NetResidual';

export default class NetworkView extends Component {

    render() {
        return(
            <div>
                <Form.Label className="content-title">Usuarios</Form.Label>
                
                <Tabs className="custom-tabs-main" defaultActiveKey="treePat" >
                        <Tab eventKey="treePat" title="Pagos Iniciales">
                            <NetComponent type="patrocinio"></NetComponent>
                        </Tab>
                        <Tab eventKey="treeResidual" title="Árbol Residual">
                            <NetResidual type="residual"></NetResidual>
                        </Tab>
                        <Tab eventKey="sponsor" title="Lista de patrocinadores">
                            <Sponsor></Sponsor>
                        </Tab>
                        <Tab eventKey="placement" title="Placement">
                            <Placement></Placement>
                        </Tab>
                        {/* <Tab eventKey="promotor" title="Promotores">
                            <Promotor></Promotor>
                        </Tab> */}
                        {/* <Tab eventKey="historyRange" title="Historial de Rangos">
                            
                        </Tab> */}
                        <Tab eventKey="activations" title="Gestión de Activación">
                            <ManageActivation></ManageActivation>
                        </Tab>
                        {/* <Tab eventKey="filterRange" title="Filtro por Rango">
                            
                        </Tab> */}
                </Tabs>
            </div>
        );
    }
}