import React, { Component } from 'react';
import { Form, Tabs, Tab, Row, Col, Table, Button, Spinner, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaEdit } from 'react-icons/fa';
import { AiFillNotification } from 'react-icons/ai';
import DatePicker from 'react-date-picker';

import Validation from '../utils/Validation';
import PeriodService from '../../services/period.service';

export default class Period extends Component {

    constructor(props) {
        super(props);

        this.state = {
            registers: [],
            emptyList: false,
            message: "No hay registros para mostrar.",
            loading: true,
            initialDate: "",
            endDate: "",
            payDate: "",
            initialDateMsg: "",
            endDateMsg: "",
            payDateMsg: ""
        }

        this.getPeriods = this.getPeriods.bind(this);
    }

    componentDidMount(){
        this.getPeriods();
    }

    async getPeriods(){

        let response = await PeriodService.getPeriod();

        if(response !== undefined){
            if(response.status === 1) {
                this.setState({
                    registers: response.objModel,
                    emptyList: false,
                    message: "",
                    loading: false
                });
            } else {
                this.setState({
                    registers: [],
                    emptyList: true,
                    message: "No hay registros para mostrar.",
                    loading: false
                }); 
            }
        } else {
            this.setState({
                registers: [],
                emptyList: true,
                message: "Ocurrió un problema mientras obteniamos los registros. Inténtelo más tarde.",
                loading: false
            });
        }
    }

    // Handle Period
    handleClose = (e) => {
        this.setState({
            showModal: false,
            initialDate: "",
            endDate: "",
            payDate: "",
            initialDateMsg: "",
            endDateMsg: "",
            payDateMsg: ""
        });
    }
    handleShow = (e) => {
      
        this.setState({
            showModal: true
        });
    }

    verifyData(){
        // Validate date
        if(this.state.initialDate.length === 0) {
            alert("Seleccione un Fecha de Inicio")
            return false;
        }
        if(this.state.endDate.length === 0) {
            alert("Seleccione un Fecha de Fin")
            return false;
        }
        if(this.state.payDate.length === 0) {
            alert("Seleccione un Fecha de Pago")
            return false;
        }

        return true;

    }
    
    createPeriod = async(e) => {

        
        if(this.verifyData()){
            let data = { 
                id :0,
                initialDate: this.state.initialDate,
                endDate: this.state.endDate,
                payDate: this.state.payDate,
                status: 1,
                boolDelete: 0
            };

            let response = await PeriodService.createPeriod(data);

            this.setState({
                showModal: false,
                initialDate: "",
                endDate: "",
                payDate: "",
                initialDateMsg: "",
                endDateMsg: "",
                payDateMsg: ""
            });

            if(response !== undefined){
               
                if(response.status === 1) {
                    alert("Periodo creado con éxito.");
                    this.getPeriods();
                } else {
                    alert("Ocurrió un problema al registrar nuevo periodo.")
                }
            } else {
                alert("Ocurrió un problema al registrar nuevo periodo. Inténtelo más tarde.")
            }
        }
        
    }

    /**
     * Method to handle the change  of properties and send it to parent 
     * @param {*} e 
     * @param {*} field 
     */
    handleChange = (e, field) => {
        let value = e.target.value;
        this.setState({
                [field]: this.state[field] = value,
            });
       
    }

    onBlurDate = (e, field, fieldMessage) => {
        // Validate date
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        let date = e.target.value;
        let correct = date.match(regEx);
        if (correct) {
            this.setState({
                [fieldMessage]: this.state[fieldMessage] = ""
            });
        } else {
            this.setState({
                [fieldMessage]: this.state[fieldMessage] = "Ingrese una fecha válida."
            });
            if (this.props.onChange) {
                this.props.onChange("", field);
            }
        }

    }

    /**
     * Desactivate item period
     * @param {*} item 
     */
    deactivatePeriod = async(item) => {
        
        if(item !== undefined) {
            item.status = 0;

            let response = await PeriodService.updatePeriod(item);

            if(response !== undefined){
           
                if(response.status === 1) {
                    alert("Periodo actualizado con éxito.");
                    this.getPeriods();
                } else {
                    alert("Ocurrió un problema al actualizar periodo.")
                }
            } else {
                alert("Ocurrió un problema al actualizar periodo. Inténtelo más tarde.")
            }
        }
      
    }


    render() {
        const { registers, emptyList, message, loading } = this.state;
      
      
        return(
            <div style={{padding: 30}}>
                <Form>
                <Row style={{textAlign: 'left'}}>
                <Col sm={12}>
                    <Button variant="outline-secondary" onClick={e => this.handleShow(e)}>Nuevo Periodo</Button>
                </Col>
            </Row>
            <hr></hr>
      
            { loading && 
                <div>
                    <Spinner animation="border" variant="dark">
                    </Spinner>
                    <p><Form.Label>Cargando información ...</Form.Label></p>
                </div>
            }
            {   this.state.emptyList && !this.state.loading && 
                <Form.Label>{this.state.message}</Form.Label>
            }
            {  !emptyList && 
            <div>
                <Row>
                    <Col sm={12}>
                        <Table responsive>
                            <thead className="table-head">
                                <tr>
                                    <th>N°</th>
                                    <th>Fecha de Inicio</th>
                                    <th>Fecha de Fin</th>
                                    <th>Fecha de Pago</th>
                                    <th>Estado</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { registers.map((item, idx) => {
                                    let date = "";
                                        return (
                                            <tr key={idx}>
                                                <td>{idx+1}</td>
                                                <td>{Validation.convertDateToString(item.initialDate)}</td> 
                                                <td>{Validation.convertDateToString(item.endDate)}</td> 
                                                <td>{Validation.convertDateToString(item.payDate)}</td> 
                                                { item.status === 1 && 
                                                    <td>Activo</td> 
                                                }
                                                { item.status !== 1 && 
                                                    <td>Inactivo</td> 
                                                }
                                                { item.status === 1 && 
                                                    <td>
                                                        <Button size="sm" variant="danger" 
                                                        onClick={e => this.deactivatePeriod(item)}>Desactivar</Button>
                                                    </td>
                                                }
                                                { item.status !== 1 && 
                                                    <td>
                                                    </td>
                                                }
                                                
                                                <td>
                                                    {/* <Button className="ml-2 mt-2" size="sm" variant="info">Pagar Bonus</Button>
                                                    <Button className="ml-2 mt-2" size="sm" variant="success">Calcular Rangos Compuestos</Button>
                                                    <Button className="ml-2 mt-2" size="sm" variant="warning">Calcular Rango Residual</Button> */}
                                                </td>
                                            </tr>
                                        )
                                    })

                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                </div>
                }
                </Form>

                {/* Modal to create period */}
                <Modal show={this.state.showModal} 
                        onHide={this.handleClose}
                        backdrop="static">
                    <Modal.Header closeButton>
                    <Modal.Title>Nuevo periodo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Form.Group>
                                    <Form.Label>Fecha de Inicio *</Form.Label>
                                    <Form.Control type="date"
                                        onChange={e => this.handleChange(e, "initialDate")}
                                        onBlur={e => this.onBlurDate(e, "initialDate", "initialDateMsg")}></Form.Control>
                                    <Form.Text className="textAlert">{this.state.initialDateMsg}</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                            <Form.Group>
                                    <Form.Label>Fecha de Fin *</Form.Label>
                                    <Form.Control type="date"
                                        onChange={e => this.handleChange(e, "endDate")}
                                        onBlur={e => this.onBlurDate(e, "endDate", "endDateMsg")}></Form.Control>
                                    <Form.Text className="textAlert">{this.state.endDateMsg}</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                            <Form.Group>
                                    <Form.Label>Fecha de Pago *</Form.Label>
                                    <Form.Control type="date"
                                        onChange={e => this.handleChange(e, "payDate")}
                                        onBlur={e => this.onBlurDate(e, "payDate", "payDateMsg")}></Form.Control>
                                    <Form.Text className="textAlert">{this.state.payDateMsg}</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm"
                            onClick={e => this.handleClose(e)} >
                            Cancelar
                        </Button>
                        <Button variant="primary" size="sm"
                            onClick={e => this.createPeriod(e)}>
                            Guardar cambios
                        </Button>
                   
                    </Modal.Footer>
                </Modal>
        </div>
        
        );
    }
}