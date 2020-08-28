import React, { Component } from 'react';
import { Form, Table, Button, Row, Modal, Spinner, Col  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../utils/Validation';
import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';
import '../../views/styles/ModalCustom.css';


export default class Comission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            debtors: [],
            emptyList: true,
            message: "No hay registros para mostrar.",
            loading: false,
            date: "21 de agosto del 2020",
            loadSuscription: false,
            message2: false,

            
            suscription: [],
            schedule: [],
            idSuscription: 0,
            showModal: false,
        }

        this.getRegister = this.getRegister.bind(this);
        this.getSuscription = this.getSuscription.bind(this);
    }

    componentDidMount() {
        this.getRegister();
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

    async getRegister() {
        let response = await UtilService.getAffiliationPendingList();
        if (response !== undefined && response !== null) {
            if (response.status !== 1) {
                console.log(response);
                this.setState({
                    debtors: this.state.debtors = [],
                    emptyList: this.state.emptyList = true,
                    message: this.state.message = "Se ha producido un error. Inténte más tarde."
                });
            } else {
                if (response.objModel.length > 0) {
                    this.setState({
                        debtors: this.state.debtors = response.objModel,
                        emptyList: this.state.emptyList = false,
                        message: this.state.mesagge = ""
                    });
                } else {
                    this.setState({
                        debtors: this.state.debtors = [],
                        emptyList: this.state.emptyList = true,
                        message: this.state.mesagge = "No hay registros para mostrar."
                    });
                }

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
        //console.log(idSuscription);
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

    getResumen = async (e, idSuscription) => {
        console.log(idSuscription);
        let schedule = await UserService.getSchedule(idSuscription);
        if (schedule !== undefined && schedule !== null) {
            if (schedule.status == 1) {
                this.setState({
                    schedule: this.state.schedule = schedule.objModel,
                    showModal: true
                });
            } else {
                this.setState({
                    schedule: this.state.schedule = [],
                    showModal: false
                });
                alert("Tuvimos un error al obtener la información. Inténtelo más tarde.");
            }
        } else {
            this.setState({
                schedule: this.state.schedule = [],
                showModal: false
            });
            alert("Tuvimos un error al obtener la información. Inténtelo más tarde.")
        }

        {
            this.state.suscription.map((item, idx) => {
                if (item.id === idSuscription) {
                    this.setState({
                        userPackage:  this.userPackage = item.package.name,
                        packageQuote: this.packageQuote=item.package.quotes,
                        creationDate: this.packagecreationDate=Validation.convertDate(new Date(item.creationDate)),
                        initialQuote: this.initialQuote=item.package.initialPrice,

                    });


                }
            }

            );

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
        const { suscription, loadSuscription, message2, loadModal } = this.state;

        return (
            <div style={{ padding: 30 }}>
                <Form.Group>
                    <p>Información actualizada al: <b>{this.state.date}</b></p>
                </Form.Group>
                <Table responsive>
                    <thead className="table-head">
                        <tr>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Celular</th>
                            <th>Nro Documento</th>
                            <th>Patrocinador</th>
                            <th>Verificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.emptyList && <tr>
                            <td colSpan="6"><Form.Label>{this.state.message}</Form.Label></td>
                        </tr>}
                        {!this.state.emptyList && this.state.debtors.map(function (item) {
                            let date = "";
                            return (
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.nroTelf}</td>
                                    <td>{item.nroDocument}</td>
                                    <td>{item.patrocinador}</td>
                                    <td>
                                        <Button variant="info" size="sm" onClick={e => this.getSchedule(e, item.id)}>Verificar</Button>
                                    </td>

                                </tr>
                            )
                        })

                        }
                    </tbody>
                </Table>
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
                                    <th>Fecha de Pago</th>
                                    <th>Estado</th>
                                    <th></th>
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
                                            <td>fecha de pago</td>
                                            <td>estado</td>
                                            <td>
                                                <Button size="sm">Aceptar</Button>
                                                <Button size="sm">Denegar</Button>
                                            </td>
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