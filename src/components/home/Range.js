import React, { Component } from 'react';
import  { Form, Row, Col, Tab, Tabs} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../views/styles/CustomTabs.css';

export default class Range extends Component{
    constructor(props){
        super(props);
        this.state = {
            points: {
                rama1: "375",
                rama2: "225",
                rama3: "180",
                directo: "180",
            },
            pointsNextCom:{
                    rama1: "375",
                    rama2: "225",
                    rama3: "180",
                    directo: "180",
                },
            pointsNextRes:{
                    rama1: "375",
                    porc1: 0,
                    rama2: "225",
                    porc2: "0",
                    rama3: 0,
                    porc3: 0,
                    directo: "180",
                
            },
            pointTotPending: "120",
            pointDirPending: "0"
        }
    }

    componentDidMount() {
        let points = this.props.dash.puntsTotalRamesPatrocinio;
        let tempPoints = {};

        points.forEach( elem => {
            if(elem.name == "Rama 1") {
                tempPoints.rama1 = elem.totalRama;
            } else if(elem.name == "Rama 2") {
                tempPoints.rama2 = elem.totalRama;
            } else if(elem.name == "Rama 3") {
                tempPoints.rama3 = elem.totalRama;
            }
        });
        tempPoints.directo =  points.volumeTotal;

        // Next Range
        if(this.props.dash.puntsRamesCompuesto != null){
            let tempPointscomp = {};
            this.props.dash.puntsRamesCompuesto.forEach( elem => {
                if(elem.name == "Rama 1") {
                    tempPointscomp.rama1 = elem.totalRama;
                } else if(elem.name == "Rama 2") {
                    tempPointscomp.rama2 = elem.totalRama;
                } else if(elem.name == "Rama 3") {
                    tempPointscomp.rama3 = elem.totalRama;
                }
            });
            this.setState({
                pointsNextCom: this.state.pointsNextCom = tempPointscomp,
            });
        }
        if(this.props.dash.puntsRamesResidual != null){
            let tempPointsRes = {};
            this.props.dash.puntsRamesResidual.forEach( elem => {
                if(elem.name == "Rama 1") {
                    tempPointsRes.rama1 = elem.totalRama;
                    tempPointsRes.porc1 = 25;
                } else if(elem.name == "Rama 2") {
                    tempPointsRes.rama2 = elem.totalRama;
                    tempPointsRes.porc2 = 25;
                } else if(elem.name == "Rama 3") {
                    tempPointsRes.rama3 = elem.totalRama;
                    tempPointsRes.porc3 = 25;
                }
            });
            this.setState({
                pointsNextRes: this.state.pointsNextRes = tempPointsRes,
            });
        }
        this.setState({
            points: this.state.points = tempPoints,
            pointTotPending: this.state.pointTotPending = this.props.dash.puntsTotalesPendientes,
            pointDirPending: this.state.pointDirPending= this.props.dash.puntsDirectosPendientes
        });
    }
    render(){
        const {points, pointsNextCom, pointsNextRes, pointTotPending, pointDirPending} = this.state;
        return(
            <div>
                <Form >
                    <Form.Label className="content-title">Puntos Totales </Form.Label>
                    <Row>
                        <Col sm={3}>
                            <div className="box-container-range">
                                    <p className="box-title">Volumen</p>
                                    <p className="box-title">Rama 1</p>
                                    <p className="class-state"><b>{points.rama1}</b>&nbsp;pts</p>
                              
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="box-container-range">
                                <div>
                                    <p className="box-title">Volumen</p>
                                    <p className="box-title">Rama 2</p>
                                    <p className="class-state"><b>{points.rama2}</b>&nbsp;pts</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="box-container-range">
                                <div>
                                    <p className="box-title">Volumen</p>
                                    <p className="box-title">Rama 3</p>
                                    <p className="class-state"><b>{points.rama3}</b>&nbsp;pts</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="box-container-range">
                                <div>
                                    <p className="box-title">Volumen Directo</p>
                                
                                    <p className="class-state"><b>{points.directo}</b>&nbsp;pts</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
                <Form>
                    <Tabs className="custom-tabs-main" defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Rango Actual">
                            <Row>
                                <Col sm={3}>
                                    <div className="box-container-range">
                                        <div>
                                            <p className="box-title">Volumen</p>
                                            <p className="box-title">Rama 1</p>
                                            <p className="class-state"><b>{points.rama1}</b>&nbsp;pts</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={3}>
                                    <div className="box-container-range">
                                        <div>
                                            <p className="box-title">Volumen</p>
                                            <p className="box-title">Rama 2</p>
                                            <p className="class-state"><b>{points.rama2}</b>&nbsp;pts</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={3}>
                                    <div className="box-container-range">
                                        <div>
                                            <p className="box-title">Volumen</p>
                                            <p className="box-title">Rama 3</p>
                                            <p className="class-state"><b>{points.rama3}</b>pts</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={3}>
                                    <div className="box-container-range">
                                        <div>
                                            <p className="box-title">Volumen Directo</p>
                                        
                                            <p className="class-state"><b>{points.directo}</b>pts</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                
                        </Tab>
                        <Tab eventKey="profile" title="Próximo Rango">
                            <Tabs className="custom-tabs" defaultActiveKey="profile" id="uncontrolled-tab-example">
                                <Tab  className="titletabs" eventKey="home" title="Compuesto" >
                                    <Row>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Rama 1</p>
                                                
                                                    <p className="class-state"><b>{pointsNextCom.rama1}</b>&nbsp;pts</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Rama 2</p>
                                                
                                                    <p className="class-state"><b>{pointsNextCom.rama2}</b>&nbsp;pts</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Rama 3</p>
                                                
                                                    <p className="class-state"><b>{pointsNextCom.rama3}</b>&nbsp;pts</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Directo</p>
                                                
                                                    <p className="class-state"><b>vol</b>&nbsp;pts</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                
                                </Tab>
                                <Tab eventKey="profile" title="Residual">
                                    <Row>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Rama 1</p>
                                                
                                                    <p className="class-state"><b>{pointsNextRes.rama1}</b>&nbsp;pts</p>
                                                    <p className="class-progress">{pointsNextRes.porc1} %</p>
                                                    <progress max="100" value={pointsNextRes.porc1}></progress>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Rama 2</p>
                                                
                                                    <p className="class-state"><b>{pointsNextRes.rama2}</b>&nbsp;pts</p>
                                                        <p className="class-progress">{pointsNextRes.porc2} %</p>
                                                    <progress max="100" value={pointsNextRes.porc2}></progress>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Rama 3</p>
                                                
                                                    <p className="class-state"><b>{pointsNextRes.rama3}</b>&nbsp;pts</p>
                                                        <p className="class-progress">{pointsNextRes.porc3} %</p>
                                                    <progress max="100" value={pointsNextRes.porc3}></progress>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div className="box-container-range">
                                                <div>
                                                    <p className="box-title">Volumen Directo</p>
                                                
                                                    <p className="class-state"><b>Vol</b>&nbsp;pts</p>
                                                    
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                </Form>
                <br></br>
                <Form>
                    <Row>
                        <Form.Label className="content-footer">Puntos Totales Pendientes:&nbsp;</Form.Label>
                        <Form.Label className="content-footer"><b>{pointTotPending}</b></Form.Label>
                        <Form.Label className="content-footer">&nbsp;ptos</Form.Label>
                    </Row>
                    <Row>
                        <Form.Label className="content-footer">Puntos Directos Pendientes:&nbsp;</Form.Label>
                        <Form.Label className="content-footer"><b>{pointDirPending}</b></Form.Label>
                        <Form.Label className="content-footer">&nbsp;ptos</Form.Label>
                    </Row>

                </Form>
            </div>
        );
        
    }
}
