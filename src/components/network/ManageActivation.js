import React, { Component } from 'react';
import { Form, Tabs, Tab, Row, Col, Table, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../pendingpayment/node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class ManageActivation extends Component {

    sendAlert = (e) => {
        e.preventDefault();
        alert("Alerta enviada");
    }

    render() {
        return(
            <div style={{padding:30}}>
                 <Form>
                    <Tabs className="custom-tabs-main" defaultActiveKey="tab-patrocinado" id="uncontrolled-tab-example">
                        <Tab eventKey="tab-patrocinado" title="Patrocinados">
                        <Tabs className="custom-tabs" defaultActiveKey="tab-activate" id="uncontrolled-tab-example">
                                <Tab  className="titletabs" eventKey="tab-activate" title="Activos" >
                                    <div className="card-wallet">
                                        <p className="title-wallet">Puntaje total por rama: 0.00</p>
                                        <Row>
                                            <Col sm={4}><p className="label-title">Rama 1: 0.00</p></Col>
                                            <Col sm={4}><p className="label-title">Rama 2: 0.00</p></Col>
                                            <Col sm={4}><p className="label-title">Rama 3: 0.00</p></Col>
                                        </Row>
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <Row>
                                            <Col  sm={4}>
                                            <Form.Control as="select" defaultValue={'DEFAULT'}
                                                onChange={e => this.handleCivilState(e, "civilState")}>
                                                <option value="DEFAULT" disabled>Seleccione una opción</option>
                                                <option value="Activos" >Activos</option>
                                            </Form.Control>
                                            </Col>
                                        </Row>
                                    </div>
                                    <br></br>
                                    <Table responsive>
                                            <thead className="table-head">
                                                <tr>
                                                <th>N° Socio</th>
                                                <th>F. Afiliación</th>
                                                <th>Nombre</th>
                                                <th>Documento</th>
                                                <th>Rango</th>
                                                <th>Estado</th>
                                                <th>Nivel Patrocinio</th>
                                                <th>Nivel Residual</th>
                                                <th>Rama</th>
                                                <th>Patrocinador</th>
                                                <th>Próxima cuota</th>
                                                <th>Monto cuota</th>
                                                <th>Enviar alerta</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>5807</td>
                                                    <td>25-05-2020</td>
                                                    <td>Willian Avila Quiroz</td>
                                                    <td>34343434</td>
                                                    <td>Socio</td>
                                                    <td>Activo</td>
                                                    <td>1</td>
                                                    <td>2</td>
                                                    <td>1</td>
                                                    <td>Carlos Alberto Sivipaucar Revilla</td>
                                                    <td>11-08-2020</td>
                                                    <td>318.42</td>
                                                    <td>
                                                        <Button variant="info" size="sm" onClick={(e) => {this.sendAlert(e)}}>Enviar Alerta</Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                </Tab>
                                <Tab eventKey="tab-deuda" title="Deuda">
                                   <p>patrocinados deuda</p>
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="tab-residual" title="Residuales">
                            <Tabs className="custom-tabs" defaultActiveKey="tab-activate" id="uncontrolled-tab-example">
                                <Tab  className="titletabs" eventKey="tab-activate" title="Activos" >
                                    <p>residual activo</p>
                                </Tab>
                                <Tab eventKey="tab-deuda" title="Deuda">
                                   <p>residual deuda</p>
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                </Form>
            </div>
        );
    }
}