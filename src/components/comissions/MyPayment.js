import React, { Component } from 'react';
import { Form, Row, Button, Modal, Table, Spinner, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Validation from '../utils/Validation';
import UserService from '../../services/user.service';
import '../../views/styles/ModalCustom.css';

export default class MyPayment extends Component {
    constructor(props){
        super(props);
        this.state = {
            suscription: [],
            schedule: [],
            loadSuscription: false,
            message: false,
            showModal: false,
            
        }

        this.getSuscription = this.getSuscription.bind(this);
        
    }

    componentDidMount(){
        this.getSuscription();
    }

    async getSuscription () {
        // console.log("my pay");
        let suscriptions = await UserService.getSuscription();
        if(suscriptions !== undefined && suscriptions !== null){
            if(suscriptions.status !== 1) {
                console.log(suscriptions);
                this.setState({
                    suscription: this.state.suscription = [],
                    loadSuscription: this.state.loadSuscription = true
                });
            } else {
               
                this.setState({
                    suscription: this.state.suscription = suscriptions.objModel,
                    loadSuscription: this.state.loadSuscription = true
                });
            }
        }
        

    }

   
    
     // Handle modal 
     getSchedule = async(e, idSuscription) => {
        e.preventDefault();
        // this.setState({
        //     showModal : true,
        //     loadModal: true
        // });
        console.log(idSuscription);
        let schedule = await UserService.getSchedule(idSuscription);
        if(schedule !== undefined && schedule !== null){
            if(schedule.status == 1) {
                this.setState({
                    schedule : this.state.schedule = schedule.objModel,
                    showModal : true
                });
            } else {
                this.setState({
                    schedule : this.state.schedule = [],
                    showModal : false
                });
                alert("Tuvimos un error al obtener la información. Inténtelo más tarde.");
            }
        } else {
            this.setState({
                schedule : this.state.schedule = [],
                showModal : false
            });
            alert("Tuvimos un error al obtener la información. Inténtelo más tarde.")
        }
        
    }

    handleClose = () => {
        this.setState({
            showModal : false,
            schedule : this.state.schedule = [],
        });
    }
    handleShow= () => {
        this.setState({
            showModal : true
        });
    }

    render() {
        const { suscription, loadSuscription, message, loadModal } = this.state;
        console.log(suscription);
        return(
            <div>
                {loadSuscription && <div className="box-container-wrap">
                  {suscription.map((item, id) => (
                      <div key={id} className="box-suscription" onClick={e => this.getSchedule(e, item.id)}>
                        <p className="content-title">{item.observation}</p>
                        <p>Fecha de adquisición:  {Validation.convertDate(new Date(item.creationDate))}</p>
                    </div>
                  ))}
                </div>}
                {/* Modal */}
                <Modal 
                    size="lg"
                    show={this.state.showModal} 
                    onHide={this.handleClose}
                    style={{fontSize:12}}
                   >
                    <Modal.Header closeButton>
                        <Modal.Title>Detalle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={3}><Button size="sm" variant="secondary" block>Amortizar</Button></Col>
                            <Col sm={3}><Button size="sm" variant="secondary" block>Adelanto de pago de cuotas</Button></Col>
                            <Col sm={3}><Button size="sm" variant="secondary" block>Congelamiento de Deuda</Button></Col>
                        </Row>
                        <br></br>
                        <Row><Col>
                        <Table responsive>
                            <thead className="table-head">
                                <tr>
                                    <th>Descripción</th>
                                    <th>Fecha de vencimiento</th>
                                    <th>Capital</th>
                                    <th>Amortización</th>
                                    <th>Ínteres</th>
                                    <th>Cuota</th>
                                    <th>Observación</th>
                                    {/* <th>Fecha de Pago</th>
                                    <th>Estado</th>
                                    <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.schedule.map(function(item) {
                                        console.log(Validation.convertDate(new Date(item.initialDate)));
                                        return (
                                            <tr key={item.idCorrelativo}>
                                                <td>{item.descripcion}</td>
                                                <td>{Validation.convertDate(new Date(item.initialDate))}</td>
                                                <td>{item.capitalBalance} USD</td>
                                                <td>{item.amortizacion} USD</td>
                                                <td>{item.intereses} USD</td>
                                                <td>{item.cuota} USD</td>
                                                <td>{item.observacion}</td>
                                                {/* TODO <td>campo de fecha?</td>
                                                <td>estado?</td>
                                                <td>botón pagar?</td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        </Col></Row>
                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cerrar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}