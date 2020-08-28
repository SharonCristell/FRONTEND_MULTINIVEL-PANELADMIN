import React, { Component } from 'react';
import { Image, Form, Carousel, Container, Table, Button, Row, Modal, Spinner, Col } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import icon1 from '../../images/icons/blue-check.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../utils/Validation';
import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';

import '../../views/styles/ModalCustom.css';


export default class Comission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingList: [],
            emptyList: true,
            message: "No hay registros para mostrar.",
            loading: false,
            date: "21 de agosto del 2020",
            loadSuscription: false,
            message2: false,
            allChecked: false,

            schedule: [],
            selections: [],
            idSuscription: 0,
            showModal: false,
            checkedListAll: [],
            ItemsChecked: false,
            statusText: "",
            showOthers: 'none',
            motivesList: [
                {
                    idMotive: 1,
                    description: "Datos errados",

                },
                {
                    idMotive: 2,
                    description: "Monto errado",

                },
                {
                    idMotive: 3,
                    description: "OTRO",

                }


            ],
            tempDocuments: [],
            showRechazar: false,
            showAceptar: false,
            showBoton: true,
            showModalPicture: false,
            imgModal : "",
            idTemp:0,
            isComplete: false,

        }

        this.getDebtRegister = this.getDebtRegister.bind(this);
        this.getPendingList = this.getPendingList.bind(this);
    }

    componentDidMount() {
        this.getDebtRegister();
        this.getPendingList();
        this.createItemTypes();

    }

    async getPendingList() {
        // console.log("my pay");
        let pendingLists = await UtilService.getAffiliationPendingList();
        if (pendingLists !== undefined && pendingLists !== null) {
            if (pendingLists.status !== 1) {

                this.setState({
                    pendingList: this.state.pendingList = [],
                    loadSuscription: this.state.loadSuscription = true
                });
            } else {

                this.setState({
                    pendingList: this.state.pendingList = pendingLists.objModel,
                    loadSuscription: this.state.loadSuscription = true
                });
            }
        }


    }

    async createItemTypes() {

        let response = this.state.motivesList;
        if (response !== null && response !== undefined) {

            let items = [];
            if (response.length > 0) {
                response.forEach(elem => {



                    items.push(<option key={elem.idMotive} value={elem.idMotive}>{elem.description}</option>);

                });
            } else {
                items = this.state.tempDocuments;
            }

            this.setState({ motivesList: items });
            this.forceUpdate();
        }



    }

    handleShowBoton = (e, bank) => {

        //this.sendData()

        if (bank === 'Aceptar') {
            this.setState({
                showAceptar: true,


            });
        } else if (bank === 'Rechazar') {
            this.setState({
                showRechazar: true,


            });
        }

    }

    // Show modal to confirm accept vouchers
    onShowModal = (e, item) => {
        console.log(item)
        this.setState({
            itemAccepted : this.state.itemAccepted = item
        })
        this.handleShowBoton(e, 'Aceptar')
    }

    getDebtRegister = () => {
        let tags = <tr></tr>;

        if (this.state.pendingList.length > 0) {
            tags = this.state.pendingList.map((item) => (

                <tr key={item.idSuscription}>

                    <td>{Validation.convertDate(new Date(item.creationDateSuscription))}</td>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.nroDocument}</td>
                    <td>{item.patrocinador}</td>
                    <td>{item.packageName}</td>
                    <td>
                        <Button variant="info" size="sm" onClick={e => this.getSchedule(e, item.idSuscription)}>Verificar</Button>
                    </td>

                </tr>
            ));
        }
        return tags;
    }

    getVerify = (i) => {
        let tags = <td></td>;

        if (i == 1) {
            tags =

                <td>
                    <p>Pagado</p>
                </td>


        }

        else if (i == 2) {
            tags =

                <td>
                    <p>Por verificar</p>
                </td>
        }

        else if (i == 3) {
            tags =

                <td>
                    <p>Rechazado</p>
                </td>


        }
        else if (i == 0) {
            tags =

                <td>
                    <p> Neutro</p>
                </td>

        }
        return tags;
    }

    showBotones = (i) => {

        console.log("event")
        let display = false;
     
        if (i == 2) {

                display= true


        }

        
        else if (i == 0) {

            display= true

        }
        return display;
    }

    handleShow = (e, bank) => {
        console.log("show modal")
        if (bank === 'BCP') {
            this.setState({
                showBigPicture: this.state.showBigPicture = true,


            });
        }


    }

    // Handle modal 
    getSchedule = async (e, idSuscription) => {
        //e.preventDefault();
        
        console.log(idSuscription);
        let schedule = await UtilService.getScheduleAffiliationPendingList(idSuscription);

        if (schedule !== undefined && schedule !== null) {
            if (schedule.status == 1) {
                this.setState({
                    schedule: this.state.schedule = schedule.objModel.objModel,
                    showModal: true,
                    idTemp:this.state.idTemp = schedule.objModel.idSuscription
                });
            } else {
                this.setState({
                    schedule: this.state.schedule = [],
                    showModal: false
                });
                alert("No se hallaron datos de dicho usuario. Inténtelo más tarde.");
            }
        } else {
            this.setState({
                schedule: this.state.schedule = [],
                showModal: false
            });
            alert("Tuvimos un error al obtener la información. Inténtelo más tarde.")
        }
        console.log(this.state.schedule);

    }

    handleChange = (e) => {
        let schedule = this.state.schedule;
        let allChecked = this.state.allChecked;
        if (e.target.value === "checkAll") {
            schedule.forEach(item => {
                item.ischecked = e.target.checked;
                allChecked = e.target.checked;
            });
        }
        else {
            schedule.find(item => item.quoteDescription === e.target.name).ischecked = e.target.checked;
        }
        this.setState({ schedule: schedule, allChecked: allChecked });
    }

    handleSelect = (e, field) => {
        // //console.log(e.target.value, field);
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        })



        if (field === "idMotive") {

            let text = e.target.options[e.target.selectedIndex].text.toUpperCase();
            if (text.includes("OTRO")) {
                this.setState({
                    showOthers: this.state.showOthers = 'inline'
                });
            } else {
                this.setState({
                    showOthers: this.state.showOthers = 'none'
                });
                if (this.props.onChange) {
                    this.props.onChange("", "desMotive");
                }
            }

            this.forceUpdate();
        }
    }

    handlehandleMotive = (e, field) => {
        // //console.log('step one');
        let value = e.target.value;
        if (this.props.onChange) {
            this.props.onChange(e.target.value, field);
            this.setState({
                [field]: this.state[field] = value,
                messageDoc: ""
            });
        }
        // })
    };
    
    sendData= async(e, idTemp, idmembershipdetail, newVerif)=> {
       
        e.preventDefault();
        
        this.setState({
            showAceptar: this.state.showAceptar = false
        });
       
            let data = {};
                     
            let  payment = {};
            
            payment.idSuscription =  idTemp;
            payment.idMembershipDetail = idmembershipdetail;
            payment.verif = newVerif;
            

            data.payment = payment;               
            
         
            let response = await UserService.updatePayment(data);
         
            if(response !== undefined) {
                if(response.status === 1){
                    // alert('Usuario registrado');
                    this.setState({
                        isComplete: this.state.isComplete = true
                    });
                    
                } else {
                    alert("Ocurrió un error al momento de realizar la validación.");
                }
            } else {
                alert('Tuvimos un problema en la validación. Inténtalo más tarde.');
            }

        
    };




    handleClose = () => {
        this.setState({
            showModal: false,
            schedule: this.state.schedule = [],
        });
    }
    handleShow = () => {
        this.setState({
            showModal: true
        });
    }

    //Handle close modal  image
    onClickImage = (e, bank, data) => {
        console.log("event modal")
        console.log(data)
        this.setState({
            imgModal: this.state.imgModal = data.imagenes
        });
        this.handleShowPicture();
    }

    handleShowPicture = () => {
        this.setState({
            showModalPicture: this.state.showModalPicture = true
        });
    }

    handleClosePicture = () => {
        this.setState({
            showModalPicture: this.state.showModalPicture = false
        });
    }

    render() {
        const { pendingList, loading, loadSuscription, message, message2, loadModal } = this.state;
        const { categories, checkedListAll, ItemsChecked, selectedItems, statusText, motivesList, showBoton, showBigPicture, idTemp} = this.state;
        return (
            <div style={{ padding: 30 }}>
                {loading &&
                    <div>
                        <Spinner animation="border" variant="dark">
                        </Spinner>
                        <p>Cargando la información de pagos</p>
                    </div>}

                <Form.Group>
                    <p>Información actualizada al: <b>{this.state.date}</b></p>
                </Form.Group>
                <Table responsive>
                    <thead className="table-head">
                        <tr>
                            <th>Marca Temporal</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Nro Documento</th>
                            <th>Patrocinador</th>
                            <th>Tipo de Membresía</th>
                            <th>Verificación</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.getDebtRegister()}

                    </tbody>
                </Table>
                <Modal
                    size="lg"
                    backdrop="static"
                    show={this.state.showModal}
                    onHide={this.handleClose}
                    style={{ fontSize: 12 }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Listado de Cronograma</Modal.Title>
                        <br></br>
                    </Modal.Header>
                    <Modal.Body className="show-grid">

                        <Row>
                            <Col sm={2}>
                                <Row>
                                    <Col sm={5}>
                                        <h6>Aplicar a  </h6>

                                    </Col>
                                    <Col sm={7}>
                                        <Image style={{ height: '20px', width: '20px' }} className="col-image" src={icon1} ></Image>

                                    </Col>

                                </Row>

                            </Col>
                            <Col sm={10}>
                                <Row>
                                    <Col sm={2}>
                                    <Button size="sm"  variant="danger"  onClick={(e) => { this.handleShowBoton(e, 'Aceptar') }}>Aceptar</Button>

                                    </Col>
                                    <Col sm={2}>
                                    <Button size="sm" variant="primary"onClick={(e) => { this.handleShowBoton(e, 'Rechazar') }}>Rechazar</Button>

                                    </Col>
                                    <Col sm={8}>

                                    </Col>
                                </Row>
                            </Col>



                        </Row>

                        <br></br>
                        <Row><Col sm={12}>
                            <Table responsive>
                                <thead className="table-head">
                                    <tr>
                                        <th>
                                            <input
                                                style={{ height: '20px', width: '20px' }}
                                                type="checkbox"
                                                value="checkAll"
                                                checked={this.state.allChecked}
                                                onChange={this.handleChange} />   Seleccionar todo
                                        </th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                        <th>Capital</th>
                                        <th>Amortización</th>
                                        <th>Interes</th>
                                        <th>Cuota</th>
                                        <th>Puntaje</th>
                                        <th>Nro. Operación</th>
                                        <th>Titular Cta. Origen</th>
                                        <th>Medio de Pago</th>
                                        <th>Estado</th>
                                        <th></th>
                                        <th></th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.schedule.map(function (item) {

                                            let run;
                                            return (
                                                <tr key={item.idMembershipDetail}>

                                                    <td>
                                                        <input style={{ height: '20px', width: '20px' }} key={item.idMembershipDetail} type="checkbox" name={item.quoteDescription} value={item.quoteDescription} checked={item.ischecked} onChange={this.handleChange} />

                                                    </td>
                                                    <td>{item.quoteDescription}</td>
                                                    <td>{Validation.convertDate(new Date(item.initialdate))}</td>
                                                    <td>{item.capitalBalance} USD</td>
                                                    <td>{item.amortization} USD</td>
                                                    <td>{item.interested} USD</td>
                                                    <td>{item.quote} USD</td>
                                                    <td>{item.score}</td>
                                                    <td>{item.nroOperacion}</td>
                                                    <td>{item.titularcuenta}</td>
                                                    <td>{item.idPayMethod}</td>

                                                    {this.getVerify(item.verif)}

                                                    <td>

                                                        {
                                                            item.objImagen.map((itemImg, idx) => {

                                                                return (

                                                                    <div >
                                                                    <Image width="50px" height="50px" key={idx} src={`data:image/jpeg;base64,${itemImg.imagenes}`}
                                                                     onClick={(e) => { this.onClickImage(e, 'BCP', itemImg) }}>
                                                                    
                                                                    </Image>    
                                                          
                                                                </div>
                                                                )
                                                            })

                                                        }


                                                    </td>

                                                                                                                  
                                                    <td>
                                                        {item.verif  === 2 && 
                                                            <div >
                                                                <Button size="sm"  variant="danger"  onClick={(e) => { this.onShowModal(e, item) }}>Aceptar</Button>
                                                            {/* <Button size="sm"  variant="danger"  onClick={(e) => { this.handleShowBoton(e, 'Aceptar') }}>Aceptar</Button> */}



                                                            <Button size="sm" variant="primary"onClick={(e) => { this.handleShowBoton(e, 'Rechazar') }}>Rechazar</Button>
                                                        </div>
                                                        
                                                        }        
                                                        
                                                    </td>
                                              

                                                    <Modal
                                                        size="lg"
                                                        show={this.state.showRechazar}
                                                        onHide={this.handleClose}
                                                        style={{ fontSize: 12 }}
                                                    >



                                                        <Modal.Body>
                                                            <Form.Group>

                                                                <Form.Control as="select" defaultValue={'DEFAULT'}
                                                                    onChange={e => this.handleSelect(e, "idMotive")}>
                                                                    <option value="DEFAULT" disabled>Seleccionar Motivo ...</option>

                                                                    {this.state.motivesList}
                                                                </Form.Control>
                                                                <br></br>
                                                                <Form.Control style={{ display: this.state.showOthers, paddingTop: 6 }} type="text" placeholder="Ingrese el nuevo motivo"
                                                                    onChange={e => this.handleMotive(e, "desMotive")}></Form.Control>
                                                            </Form.Group>

                                                            <Modal.Footer>
                                                            <Button variant="danger" onClick={(e) => { this.sendData(e, idTemp, item.idMembershipDetail, 3) }}>
                                                                    Confirmar
                                                          </Button>
                                                                <Button variant="primary" onClick={this.handleClose}>
                                                                    Cerrar
                                                          </Button>
                                                            </Modal.Footer>
                                                        </Modal.Body>
                                                    </Modal>
                                                    <td>{item.obs}</td>




                                                </tr>
                                            )
                                        }, this)
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
                
                {/* Modal to show images */}
                <Modal
                      dialogClassName="modal-90w"
                    backdrop="static"
                    show={this.state.showModalPicture}
                    onHide={this.handleClosePicture}
                    style={{ fontSize: 12 }} 
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                        <img  class="img-fluid" src={`data:image/jpeg;base64,${this.state.imgModal}`}
                                /> 
                        
                        </Form.Group>

                        <Modal.Footer>
                        
                            <Button variant="primary" onClick={this.handleClosePicture}>
                                Cerrar
                        </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>

                {/* Modal to confirm  */}
                <Modal
                    show={this.state.showRechazar}
                    onHide={this.handleClose}
                    style={{ fontSize: 12 }}
                >
                    <Modal.Body>
                        <Form.Group>

                            <Form.Control as="select" defaultValue={'DEFAULT'}
                                onChange={e => this.handleSelect(e, "idMotive")}>
                                <option value="DEFAULT" disabled>Seleccionar Motivo ...</option>

                                {this.state.motivesList}
                            </Form.Control>
                            <br></br>
                            <Form.Control style={{ display: this.state.showOthers, paddingTop: 6 }} type="text" placeholder="Ingrese el nuevo motivo"
                                onChange={e => this.handleMotive(e, "desMotive")}></Form.Control>
                        </Form.Group>

                        <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                                Confirmar
                        </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Cerrar
                        </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
                {/* Modal to confirm vouchers */}
                <Modal
                    backdrop="static"
                    show={this.state.showAceptar}
                    onHide={this.handleClose}
                    style={{ fontSize: 12 }}
                >
                    <Modal.Body>
                        <Form.Group>
                        <Form.Label className="content-subtitle">¿Desea confirmar la aceptación del voucher?</Form.Label>                                                            
                            
                        
                        </Form.Group>

                        <Modal.Footer>
                        <Button variant="danger" onClick={(e) => { this.sendData(e, idTemp, this.state.itemAccepted.idMembershipDetail, 1) }}>
                                Confirmar
                        </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Cerrar
                        </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>


            </div >
        );
    }
}