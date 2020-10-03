import React, { Component } from 'react';
import { Image, Form, Carousel, Container, Table, Button, Row, Modal, Spinner, Col } from 'react-bootstrap';
import icon1 from '../../images/icons/blue-check.png';
import like from '../../images/like.png';
import dislike from '../../images/dislike.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../utils/Validation';
import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';
//import CheckBox from '../comissions/CheckBox'
import { Checkbox } from "semantic-ui-react";

import '../../views/styles/ModalCustom.css';
export default class Quote extends Component {

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

            selected: [],
            selections: [],
            selectedSuscription: [],
            selectedAll: [],

            idSuscription: 0,
            idMembership: 0,
            showModal: false,
            checkedListAll: [],
            ItemsChecked: false,
            statusText: "",
            showOthers: 'none',
            motivesList: [],
            motivesDetailsList: [],
            tempDocuments: [],
            showRechazar: false,
            showAceptar: false,
            showRechazarVarios: false,
            showAceptarVarios: false,
            showBoton: true,
            showModalPicture: false,
            imgModal: "",
            idTemp: 0,
            isComplete: false,
            paymentList: [],
            description: "",
            idMotive: -1,
            desMotive: "",
            checkedItems: new Map(),
            event: "",
            checkboxArr: [],
            count: 0,
            suirChecked: false,


        }
        this.selected = {};
        this.handleCheck = this.handleCheck.bind(this);


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
        this.getTipoPago();
        this.getMotiveItemTypes();
        //this.detailItemTypes();



    }

    async getPendingList() {
        // console.log("my pay");
        let pendingLists = await UtilService.getAffiliationPendingList();
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

    async getMotiveItemTypes() {

        let response = await UtilService.getDenialMotives();
        if (response !== null && response !== undefined) {

            let objs = response.objModel
            let residences = [];
            objs.forEach(elem => {
                residences.push(<option key={elem.id} value={elem.id}>{elem.motivoDeRechazo}</option>);
            });
            this.setState({
                motivesList: this.state.motivesList = residences
            });
        }

    }



    async detailItemTypes() {
        var id = this.state.idMotive;
        let response = await UtilService.getDenialDetailMotives(id);
        if (response !== null && response !== undefined) {
            if (response.status !== 1) {

                this.setState({
                    motivesDetailsList: this.state.motivesDetailsList = [],

                });
            } else {

                this.setState({
                    motivesDetailsList: this.state.motivesDetailsList = response.objModel,

                });
            }
        }
    }

    handleShowBoton = (e, tipo) => {
        if (tipo === 'Aceptar') {
            this.setState({
                showAceptar: true,


            });
        } else if (tipo === 'Rechazar') {
            this.setState({
                showRechazar: true,


            });
        } else if (tipo === 'AceptarVarios') {

            if (this.state.selections.length <= 0) {

                alert('Seleccione por lo menos un item.');
            }
            else {

                this.setState({
                    showAceptarVarios: true,


                });
            }
        }
        else if (tipo === 'RechazarVarios') {

            if (this.state.selections.length <= 0) {

                alert('Seleccione por lo menos un item.');
            }
            else {

                this.setState({
                    showRechazarVarios: true,


                });
            }
        }
        else if (tipo === 'Refresh') {

            window.location.reload();
            this.setState({
                showModal: true,


            });


        }

    }

    // Show modal to confirm accept vouchers
    onShowModal = (e, item, tipo) => {
        //console.log(item)
        this.setState({
            itemAccepted: this.state.itemAccepted = item
        })
        this.handleShowBoton(e, tipo)

    }

    onShowModale = (e, tipo) => {
        //console.log(item)

        this.handleShowBoton(e, tipo)

    }



    getDebtRegister = () => {
        let tags = <tr></tr>;
        let checked=false;

        if (this.state.pendingList.length > 0) {
            tags = this.state.pendingList.map((item, idx) => (

                <tr key={item.idSuscription}>
                    <td>{/*<Checkbox key={idx} value={item} onChange={this.handleCheckSuscription} />*/}</td>
                    <td>{idx + 1}</td>
                    <td>{Validation.convertExtendedDate(new Date(item.creationDateSuscription))}</td>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.nroDocument}</td>
                    <td>{item.patrocinador}</td>
                    <td>{item.packageName}</td>
                    <td>
                        <Button variant="info" size="sm" onClick={e => this.getSchedule(e, item.idSuscription)}>Verificar</Button>
                    </td>
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
        console.log(idSuscription)
        //e.preventDefault();
        let schedule = await UtilService.getScheduleQuotePendingList(idSuscription);

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
        //console.log(this.state.schedule);


    }



    handleChangeAll = (e) => {

        let schedule = this.state.schedule;

        let checked = e.target.checked;

        this.state.schedule.map(data => {

            data.ischecked = checked;

            return data;
        });
    }

    handleSelect = (e, field) => {
        // //console.log(e.target.value, field);
        var value = e.target.value;
        this.setState({ [field]: value }
        )

        let des = "";
        if (field === "idMotive") {
            this.setState({
                idMotive: this.state.idMotive = value
            });
            this.detailItemTypes()

        }
        this.setState({
            showOthers: this.state.showOthers = true,
        });
    }


    getDescriptionType = (idSubtipo) => {
        // console.log(idSubtipo)
        let tempList = this.state.paymentList;
        //console.log(tempList)
        let des = '';

        tempList.forEach(element => {
            if (element.idSubTipoPago === idSubtipo) {
                des = element.descripcion
            }
        });

        return des;
    }

    handleMotive = (e, field) => {

        let value = e.target.value;

        this.setState({
            [field]: this.state[field] = value,
            messageDoc: ""
        });

        // })
    };

    acceptData = async (e, idTemp, idmembershipdetail, newVerif) => {


        e.preventDefault();
        this.setState({
            showAceptar: this.state.showAceptar = false,
            showRechazar: this.state.showRechazar = false,
            //showModal: this.state.showModal = false,


        });
        let data = {};

        let payment = {};


        payment.idSuscription = idTemp;
        payment.idMembershipDetail = idmembershipdetail;
        //payment.verif = newVerif;

        data.payment = payment;


        let response = await UserService.acceptPayment(payment);

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

    rejectData = async (e, idTemp, idmembershipdetail, idMotive, desMotive, quoteDescription) => {
        console.log(idTemp)
        e.preventDefault();
        this.setState({
            showAceptar: this.state.showAceptar = false,
            showRechazar: this.state.showRechazar = false,
            showModal: this.state.showModal = false,


        });
        let data = {};

        let payment = {};

        payment.IdSuscription = idTemp;
        payment.IdMembershipDetail = idmembershipdetail;
        //payment.verif = newVerif;
        payment.idMotivo = Number(this.state.idMotive);
        payment.detalle = this.state.desMotive;
        payment.voucher = quoteDescription;



        data.payment = payment;
        console.log("Envio")

        console.log(payment)



        let response = await UserService.rejectPayment(payment);

        if (response !== undefined) {
            if (response.status === 1) {
                // alert('Usuario registrado');
                this.setState({
                    isComplete: this.state.isComplete = true
                });

            } else {
                alert("Ocurrió un horror al momento de realizar la validación.");
            }
        } else {
            alert('Tuvimos un problema en la validación. Inténtalo más tarde.');
        }

        window.location.reload();


    };

    acceptListData = async (e) => {



        e.preventDefault();
        this.setState({
            showAceptarVarios: this.state.showAceptarVarios = false,
            showRechazarVarios: this.state.showRechazarVarios = false,
            showModal: this.state.showModal = false,
        });

        console.log("Envio")

        console.log(this.state.selections)

        let response = await UserService.acceptListPayment(this.state.selections);

        if (response !== undefined) {
            if (response.status === 1) {
                // alert('Usuario registrado');
                this.setState({
                    isComplete: this.state.isComplete = true
                });

            } else {
                //alert("Aqui un error al momento de realizar la validación.");
            }
        } else {
            alert('Tuvimos un problema en la validación. Inténtalo más tarde.');
        }

        window.location.reload();




    };


    rejectListData = async (e, idMotive, desMotive) => {


        e.preventDefault();
        this.setState({
            showAceptarVarios: this.state.showAceptarVarios = false,
            showRechazarVarios: this.state.showRechazarVarios = false,
            showModal: this.state.showModal = false,


        });
        let data = this.state.selections;

        data.map(d => {

            d.idMotivo = Number(this.state.idMotive);
            d.detalle = this.state.desMotive;
            return d;
        });
        console.log("Envio")

        console.log(data)

        let response = await UserService.rejectListPayment(data);

        if (response !== undefined) {
            if (response.status === 1) {
                // alert('Usuario registrado');
                this.setState({
                    isComplete: this.state.isComplete = true
                });

            } else {
                //alert("Ocurrió un error al momento de realizar la validación.");
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
            showAceptarVarios: this.state.showAceptarVarios = false,
            showRechazarVarios: this.state.showRechazarVarios = false,
            showOthers: this.state.showOthers = false,
            idMotive: this.state.idMotive = -1,
            selections: this.state.selections = [],

        });
    }
    handleShow = () => {
        this.setState({
            showModal: true
        });
    }

    //Handle close modal  image
    onClickImage = (e, bank, data) => {
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

    /*
   handleAllChecked = (event) => {

       let list = this.state.selections;

       let register = {};

       
       list.forEach(fruite =>

           register.idSuscription=this.state.idTemp,
           register.idMembershipDetail=Number(fruite.idMembershipDetail),
           register.idMotivo= Number(this.state.idMotive),
           register.detalle= this.state.desMotive,
        

           list.push(register),
           this.setState({
               selections: this.state.selections = list
           }),
       )
       console.log("Aqui todo")

       console.log(this.state.selections)
   }

   */
    handleCheckAll = (e) => {
        console.log(e.target.value);

        const newArr = { selectedVal: Object.keys(this.selected) };
        console.log(newArr.selectedVal);
        let list = this.state.pendingList;
        let allChecked = this.state.allChecked;


        list.forEach(item => {

            allChecked = e.target.checked;
            let register = {
                idSuscription: item.idSuscription,

            };
            let listed = this.state.selectedAll;
            listed.push(register);
            this.setState({
                selectedAll: this.state.selectedAll = listed
            });

        });


        this.setState({ allChecked: allChecked });
        console.log(this.state.selectedAll)
    }

    toggle = () =>
        this.setState(({ suirChecked }) => ({ suirChecked: !suirChecked }))


    handleCheckSuscription = (event, data) => {

        let list = this.state.pendingList;
        let allChecked = this.state.allChecked;
        if (event.target.value === "checkAll") {
            list.forEach(item => {
                allChecked = event.target.checked;

                let register = {
                    idSuscription: item.idSuscription,
    
                };
                let listed = this.state.selectedAll;
                listed.push(register);
                this.setState({
                    selectedAll: this.state.selectedAll = listed
                });
            });
            console.log(this.state.selectedAll)
            
            
        } else {

            let register = {
                idSuscription: data.value.idSuscription,

            };
            let list = this.state.selectedSuscription;
            list.push(register);
            this.setState({
                selectedSuscription: this.state.selectedSuscription = list
            });
            console.log("Aqui")

            console.log(this.state.selectedSuscription)

        }
        this.setState({ list: list, allChecked: allChecked });

    };
    handleCheck = (event, data) => {
        console.log(data.checked);
        if (data.checked) {
            this.selected[data.value] = true;
        } else {
            delete this.selected[data.value];
        }
        const newArr = { selectedVal: Object.keys(this.selected) };
        console.log(newArr.selectedVal);

        let register = {
            idSuscription: this.state.idTemp,
            idMembershipDetail: Number(data.value.idMembershipDetail),
            idMotivo: Number(this.state.idMotive),
            detalle: this.state.desMotive,
            voucher: data.value.quoteDescription,

        };
        let list = this.state.selections;
        list.push(register);
        this.setState({
            selections: this.state.selections = list
        });
        console.log("Aqui")

        console.log(this.state.selections)

    };




    render() {
        const { description, count, idMotive, pendingList, loading, isLoaded, loadSuscription, message, message2, loadModal, paymentList, date, motivesDetailsList } = this.state;
        const { categories, checkedListAll, ItemsChecked, selectedItems, statusText, motivesList, showBoton, showBigPicture, idTemp, desMotive, } = this.state;

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
                            <h5>Información actualizada al: {this.state.date}</h5>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col sm={2}>

                                    <Button variant="danger">
                                        Pre Validar
</Button>
                                </Col>
                                <Col sm={2}>
                                    <Button variant="primary">
                                        Validar
</Button>
                                </Col>
                                <Col sm={4}>
                                    <p>Última carga de archivos realizada el: <b>{this.state.date}</b></p>

                                </Col>
                            </Row>
                        </Form.Group>

                        <Table responsive>
                            <thead className="table-head">
                                <tr>
                                    <th>Selecciona
                                    {/* <input type="checkbox"
                                            value={this.state.pendingList}

                                            onChange={this.handleCheckAll} />Check all
                                            
                                        <Checkbox value="checkAll" checked={this.state.allChecked} onChange={this.handleCheckSuscription} />
                                    */}
                                        </th>
                                    <th>N° registro</th>
                                    <th>Marca Temporal</th>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Nro Documento</th>
                                    <th>Patrocinador</th>
                                    <th>Tipo de Membresía</th>
                                    <th>Verificación</th>
                                    <th>Pre-Estado</th>
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
                                <Modal.Title>Cronograma de Pagos</Modal.Title>
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
                                                <Button size="sm" variant="danger" onClick={(e) => { this.onShowModale(e, 'AceptarVarios') }}>Aceptar</Button>

                                            </Col>
                                            <Col sm={2}>
                                                <Button size="sm" variant="primary" onClick={(e) => { this.onShowModale(e, 'RechazarVarios') }}>Rechazar</Button>

                                            </Col>
                                            <Col sm={8}>
                                                <Col sm={2}>
                                                    <Button size="sm" variant="primary" onClick={(e) => { this.onShowModale(e, 'Refresh') }}>Refrescar Data</Button>

                                                </Col>

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
                                                    <Row>
                                                        <Col sm={12}>
                                                            Aplicar
                                                         </Col>
                                                    </Row>
                                                    <Row>
                                                        {/*}
                                                        <Col sm={12}>
                                                            <input name="checkall" type="checkbox" onChange={this.handleAllChecked} />
                                                        </Col>
                */}


                                                    </Row>
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
                                                this.state.schedule.map((item, idx) => {


                                                    return (
                                                        <tr key={item.idMembershipDetail}>

                                                            <td>
                                                                {item.verif === 2 &&

                                                                    <Checkbox key={idx} value={item} onChange={this.handleCheck} />

                                                                }

                                                                {item.verif === 1 &&

                                                                    <Image style={{ height: '20px', width: '20px' }} className="col-image" src={like} ></Image>

                                                                }
                                                                {item.verif === 3 &&

                                                                    <Image style={{ height: '20px', width: '20px' }} className="col-image" src={dislike} ></Image>

                                                                }

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
                                                                        //console.log("hola")
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
                            size="lg"
                            show={this.state.showRechazar}
                            onHide={this.handleClose}
                            style={{ fontSize: 12 }}
                        >
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Seleccione un motivo *</Form.Label>
                                    <Form.Control as="select" defaultValue={'DEFAULT'}
                                        onChange={e => this.handleSelect(e, "idMotive")}>
                                        <option value="DEFAULT" disabled>Seleccionar Motivo ...</option>

                                        {this.state.motivesList}
                                    </Form.Control>

                                    {

                                        motivesDetailsList.map((item, idx) => {

                                            return (

                                                <Container>

                                                    <Row>
                                                        <Row>


                                                        </Row>
                                                        <hr></hr>
                                                        <br></br>
                                                        <br></br>

                                                        <Row>
                                                            {console.log(idMotive),
                                                                item.tipoDeMotivo == 2 && idMotive !== -1 &&

                                                                <div >
                                                                    <Form.Group>
                                                                        <Form.Label style={{ display: this.state.showOthers }} className="content-subtitle">{item.detalle}</Form.Label>
                                                                        <Form.Control style={{ display: this.state.showOthers, paddingTop: 6 }} type="text" placeholder="Ingrese el dato"
                                                                            onChange={e => this.handleMotive(e, "desMotive")}></Form.Control>
                                                                    </Form.Group>
                                                                </div>
                                                            }
                                                        </Row>

                                                    </Row>
                                                </Container>

                                            )
                                        })


                                    }


                                </Form.Group>



                                <Modal.Footer>

                                    <Button variant="danger" onClick={(e) => { this.rejectData(e, idTemp, this.state.itemAccepted.idMembershipDetail, idMotive, desMotive, this.state.itemAccepted.quoteDescription) }}>
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
                                    <Button variant="danger" onClick={(e) => { this.acceptData(e, idTemp, this.state.itemAccepted.idMembershipDetail, 1) }}>
                                        Confirmar
                        </Button>

                                    <Button variant="primary" onClick={this.handleClose}>
                                        Cerrar
                        </Button>
                                </Modal.Footer>
                            </Modal.Body>
                        </Modal>

                        <Modal
                            backdrop="static"
                            show={this.state.showAceptarVarios}
                            onHide={this.handleClose}
                            style={{ fontSize: 12 }}
                        >
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label className="content-subtitle">¿Desea confirmar la aceptación de los vouchers seleccionados?</Form.Label>


                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="danger" onClick={(e) => { this.acceptListData(e) }}>
                                        Confirmar
                        </Button>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Cerrar
                        </Button>
                                </Modal.Footer>
                            </Modal.Body>
                        </Modal>

                        <Modal
                            size="lg"
                            show={this.state.showRechazarVarios}
                            onHide={this.handleClose}
                            style={{ fontSize: 12 }}

                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Seleccione el motivo general de rechazo</Modal.Title>
                                <br></br>
                            </Modal.Header>
                            <Modal.Body className="show-grid">

                                <Form.Group>
                                    <Form.Label>Seleccione un motivo *</Form.Label>
                                    <Form.Control as="select" defaultValue={'DEFAULT'}
                                        onChange={e => this.handleSelect(e, "idMotive")}>
                                        <option value="DEFAULT" disabled>Seleccionar Motivo ...</option>

                                        {this.state.motivesList}
                                    </Form.Control>

                                    {

                                        motivesDetailsList.map((item, idx) => {

                                            return (

                                                <Container>

                                                    <Row>
                                                        <Row>


                                                        </Row>
                                                        <hr></hr>
                                                        <br></br>
                                                        <br></br>

                                                        <Row>
                                                            {item.tipoDeMotivo == 2 && idMotive !== -1 &&

                                                                <div >
                                                                    <Form.Group>
                                                                        <Form.Label style={{ display: this.state.showOthers }} className="content-subtitle">{item.detalle}</Form.Label>
                                                                        <Form.Control style={{ display: this.state.showOthers, paddingTop: 6 }} type="text" placeholder="Ingrese el dato"
                                                                            onChange={e => this.handleMotive(e, "desMotive")}></Form.Control>
                                                                    </Form.Group>
                                                                </div>
                                                            }
                                                        </Row>

                                                    </Row>
                                                </Container>

                                            )
                                        })


                                    }


                                </Form.Group>



                                <Modal.Footer>

                                    <Button variant="danger" onClick={(e) => { this.rejectListData(e, idMotive, desMotive) }}>
                                        Confirmar
                                 </Button>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Cerrar
                                 </Button>
                                </Modal.Footer>
                            </Modal.Body>
                        </Modal>
                        {/* Modal to confirm vouchers */}

                    </div>
                }


            </div >
        );
    }
}