import React, { Component } from 'react';
import { Image, Form, Carousel, Container, Table, Button, Row, Modal, Spinner, Col } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import icon1 from '../../images/icons/blue-check.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../utils/Validation';
import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';

import '../../views/styles/ModalCustom.css';


export default class Pending extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingList: [],
            emptyList: true,
            message: "No hay registros para mostrar.",
            loading: true,
            isLoaded: false,

            date: "",
            loadSuscription: false,
            message2: false,
            allChecked: false,

            schedule: [],
            selections: [],
            idSuscription: 0,
            idMembership: 0,
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
            imgModal: "",
            idTemp: 0,
            isComplete: false,
            paymentList: [],

        }

        this.getDebtRegister = this.getDebtRegister.bind(this);
        this.getPendingList = this.getPendingList.bind(this);
    }

    componentDidMount() {

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        this.setState({

            date:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });


        this.getDebtRegister();
        this.getPendingList()
        this.createItemTypes();
        this.getTipoPago();



    }

    async getPendingList() {
        // console.log("my pay");
        let pendingLists = await UtilService.getAffiliationPendingLaterList();
        if (pendingLists !== undefined && pendingLists !== null) {
            if (pendingLists.status !== 1) {

                this.setState({
                    pendingList: this.state.pendingList = [],
                    loadSuscription: this.state.loadSuscription = true,
                    loading: this.state.loading = false,
                    isLoaded: this.state.isLoaded = false,
                });
            } else {

                this.setState({
                    pendingList: this.state.pendingList = pendingLists.objModel,
                    loadSuscription: this.state.loadSuscription = true,
                    loading: this.state.loading = false,
                    isLoaded: this.state.isLoaded = true,
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

    handleShowBoton = (e, tipo) => {

        //this.sendData()

        if (tipo === 'Aceptar') {
            this.setState({
                showAceptar: true,


            });
        } else if (tipo === 'Rechazar') {
            this.setState({
                showRechazar: true,


            });
        }

    }

    // Show modal to confirm accept vouchers
    onShowModal = (e, item, tipo) => {
        console.log(item)
        this.setState({
            itemAccepted: this.state.itemAccepted = item
        })
        this.handleShowBoton(e, tipo)

    }



    getDebtRegister = () => {
        let tags = <tr></tr>;

        if (this.state.pendingList.length > 0) {
            tags = this.state.pendingList.map((item, idx) => (

                <tr key={item.idSuscription}>
                     <td>{idx+1}</td>
                    <td>{Validation.convertExtendedDate(new Date(item.creationDateSuscription))}</td>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.nroDocument}</td>
                    <td>{item.nroTelf}</td>
                    <td>{item.patrocinador}</td>
                    <td>{item.packageName}</td>


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
                    <p> No Pagado</p>
                </td>

        }
        return tags;
    }

    async getTipoPago() {

        let pendingLists = await UtilService.getTypePayment();
        if (pendingLists !== undefined && pendingLists !== null) {
            if (pendingLists.status !== 1) {

                this.setState({
                    paymentList: this.state.paymentList = [],
                });
            } else {
                let tempList = pendingLists.objModel;
                let temp = []
                // console.log(tempList)
                tempList.forEach(element => {
                    temp = temp.concat(element.subTipoPagos);
                });

                this.setState({
                    paymentList: this.state.paymentList = temp,

                });
            }
        }

    }

    getDescriptionType = (idSubtipo) => {
        // console.log(idSubtipo)
        let tempList = this.state.paymentList;
        // console.log(tempList)
        let des = '';

        tempList.forEach(element => {
            if (element.idSubTipoPago === idSubtipo) {
                des = element.descripcion
            }
        });

        return des;
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
                    idTemp: this.state.idTemp = schedule.objModel.idSuscription,

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
        this.setState({ [field]: value }
        )



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

    handleMotive = (e, field) => {

        var value = e.target.value;
        this.setState({ [field]: value }
        )
    };

    sendData = async (e, idTemp, idmembershipdetail, newVerif) => {

        e.preventDefault();
        this.setState({
            showAceptar: this.state.showAceptar = false,
            showRechazar: this.state.showRechazar = false,
            showModal: this.state.showModal = false,


        });
        let data = {};

        let payment = {};

        payment.idSuscription = idTemp;
        payment.idMembershipDetail = idmembershipdetail;
        payment.verif = newVerif;

        if (newVerif == 3) {
            payment.idMotivo = this.state.idMotive;
            payment.motivoDescription = this.state.desMotive;

        }
        console.log(payment)

        data.payment = payment;


        let response = await UserService.updatePayment(payment);

        if (response !== undefined) {
            if (response.status === 1) {
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

        window.location.reload();


    };




    handleClose = () => {
        this.setState({
            showModal: this.state.showModal = false,
            schedule: this.state.schedule = [],
            showAceptar: this.state.showAceptar = false,
            showRechazar: this.state.showRechazar = false,
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
        const { pendingList, loading, isLoaded, loadSuscription, message, message2, loadModal, paymentList, date } = this.state;
        const { categories, checkedListAll, ItemsChecked, selectedItems, statusText, motivesList, showBoton, showBigPicture, idTemp } = this.state;
        return (
            <div style={{ padding: 30 }}>
                {loading &&
                    <div>
                        <Spinner animation="border" variant="dark">
                        </Spinner>
                        <p>Cargando la información de pagos</p>
                    </div>}
                {isLoaded &&

                    <div>

                        <Form.Group>
                            <p>Información actualizada al: <b>{this.state.date}</b></p>
                        </Form.Group>
                        <Table responsive>
                            <thead className="table-head">
                                <tr>
                                     <th>N° registro</th>
                                    <th>Marca Temporal</th>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Nro Documento</th>
                                    <th>Nro Celular</th>
                                    <th>Patrocinador</th>
                                    <th>Tipo de Membresía</th>
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
                                                <Button size="sm" variant="danger" onClick={(e) => { this.onShowModal(e, 'Aceptar') }}>Aceptar</Button>

                                            </Col>
                                            <Col sm={2}>
                                                <Button size="sm" variant="primary" onClick={(e) => { this.onShowModal(e, 'Rechazar') }}>Rechazar</Button>

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
                                                    Seleccionar todo
                                            <input
                                                        style={{ height: '20px', width: '20px' }}
                                                        type="checkbox"
                                                        value="checkAll"
                                                        checked={this.state.allChecked}
                                                        onChange={this.handleChange} />
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
                                                            <td>{Validation.convertDate(new Date(item.nextExpiration))}</td>

                                                            <td>{Math.round(((item.capitalBalance) / (item.dollarExchange)) * 100) / 100} USD</td>
                                                            <td>{Math.round(((item.amortization) / (item.dollarExchange)) * 100) / 100} USD</td>
                                                            <td>{item.interested} USD</td>


                                                            <td>
                                                                {item.quoteUsd == 0 &&
                                                                    Math.round(((item.quote) / (item.dollarExchange)) * 100) / 100

                                                                }

                                                                {item.quoteUsd !== 0 &&
                                                                    item.quoteUsd
                                                                }
                                                         USD


                                                    </td>



                                                            <td>{item.puntaje}</td>
                                                            <td>
                                                                {
                                                                    item.objImagen.map((itemImg, idx) => {

                                                                        return (

                                                                            (<Row>
                                                                                {itemImg.nroOperacion}
                                                                                <hr></hr>
                                                                            </Row>)


                                                                        )
                                                                    })

                                                                }

                                                            </td>
                                                            <td>{item.titularcuenta}</td>
                                                            <td>
                                                                {
                                                                    item.objImagen.map((itemImg, idx) => {
                                                                        console.log("hola")
                                                                        let description = this.getDescriptionType(Number(itemImg.idPayMethod));
                                                                        return (
                                                                            (<Row>
                                                                                {description}
                                                                                <hr></hr>
                                                                            </Row>)
                                                                        )
                                                                    })
                                                                }

                                                            </td>

                                                            {this.getVerify(item.verif)}

                                                            <td>

                                                                {
                                                                    item.objImagen.map((itemImg, idx) => {

                                                                        return (

                                                                            <Row>
                                                                                <Image width="50px" height="50px" key={idx} src={`data:image/jpeg;base64,${itemImg.imagenes}`}
                                                                                    onClick={(e) => { this.onClickImage(e, 'BCP', itemImg) }}>

                                                                                </Image>


                                                                            </Row>
                                                                        )
                                                                    })

                                                                }


                                                            </td>


                                                            <td>
                                                                {item.verif === 2 &&
                                                                    <div >
                                                                        <Button size="sm" variant="danger" onClick={(e) => { this.onShowModal(e, item, 'Aceptar') }}>Aceptar</Button>

                                                                        <Button size="sm" variant="primary" onClick={(e) => { this.onShowModal(e, item, 'Rechazar') }}>Rechazar</Button>
                                                                    </div>

                                                                }

                                                            </td>


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
                                    <img class="img-fluid" src={`data:image/jpeg;base64,${this.state.imgModal}`}
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
                                    <Button variant="danger" onClick={(e) => { this.sendData(e, idTemp, this.state.itemAccepted.idMembershipDetail, 3) }}>
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
                        </div>
                }


            </div >
        );
    }
}