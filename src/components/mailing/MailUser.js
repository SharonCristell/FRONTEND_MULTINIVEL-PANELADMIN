import React, { Component } from 'react';
import { Image, Form, Container, Table, Button, Row, Modal, Spinner, Col } from 'react-bootstrap';
import { Checkbox } from "semantic-ui-react";
import icon1 from '../../images/icons/blue-check.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../utils/Validation';
import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';

import '../../views/styles/ModalCustom.css';


export default class MailUser extends Component {

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
            packageStatus: "",

            schedule: [],
            selections: [],
            idSuscription: -1,
            showModal: false,
            checkedListAll: [],
            ItemsChecked: false,
            statusText: "",


            loaded: false,
            txtSearch: "",
            emptyList: true,
            mailType: "0",
            username: "",
            userDetail: [],
            sponsorDetail: [],
            masterDetail: [],
            email: "",
            idRowSuscription: 0,
            otherEmail: "",
            selections: [],
            tempPackage: [],
            sponsoremail: null,
            masteremail: null,
            optionalemail: null,
            idTemp: 0,



        }
        this.selected = {};
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck = (event, data) => {

        console.log(data.checked);
        if (data.checked) {
            console.log(data.value)

            this.selected[data.value] = true;
        } else {
            delete this.selected[data.value];
        }
        if (data.value == "0") {

            this.getSponsorEmail();

            this.selected[data.value] = true;
        } else if (data.value == "1") {
            this.getMasterEmail();

        }


        const newArr = { selectedVal: Object.keys(this.selected) };

        console.log("Aqui")

        console.log(newArr.selectedVal);

        console.log(this.state.selections)

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

    handleRadio = (e, field) => {
        console.log(e.target.value);
        // if (this.props.onChange) {
        //     this.props.onChange(e.target.value, field);
        //   }
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        })
    }
    handleSelections = (e, field) => {
        console.log("Aqui");
        console.log(e.target.value);
        // if (this.props.onChange) {
        //     this.props.onChange(e.target.value, field);
        //   }
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        })
    }

   
    handleRadioSuscription = (e, field) => {
        console.log(e.target.value);
        // if (this.props.onChange) {
        //     this.props.onChange(e.target.value, field);
        //   }
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        })
    }
    search = (e) => {
        // console.log(this.state)
        this.setState({
            loading: true,
            userDetail: [],
            emptyList: true,
        });
        let parameter = this.getParameter();
        if (parameter !== undefined) {
            this.getSearchResults(parameter);
        }

    }
    getParameter = () => {
        let data = {};

        //Add search by name and type
        if (this.state.txtSearch.trim().length > 0) {

            data.username = this.state.txtSearch;

        } else {

            data.username = "";

        }

        return data;
    }
    getSearchResults = async (parameter) => {

        console.log(parameter)
        let response = await UtilService.getUsernameSearch(parameter);
        if (response !== undefined && response !== null) {
            if (response.status !== 1) {
                //console.log(response);
                this.setState({
                    userDetail: this.state.userDetail = [],
                    sponsorDetail: this.state.sponsorDetail = [],
                    masterDetail: this.state.masterDetail = [],
                    emptyList: this.state.emptyList = true,
                    loading: this.state.loading = false,
                    message: this.state.message = "Se ha producido un error. Inténtelo más tarde."
                });
            } else {
                let objectUser = response.userDetail;
                let objectSponsor = response.sponsorDetail;
                let objectMaster = response.masterDetail;

                if (objectUser.length > 0) {
                    this.setState({
                        userDetail: this.state.userDetail = objectUser,
                        sponsorDetail: this.state.sponsorDetail = objectSponsor,
                        masterDetail: this.state.masterDetail = objectMaster,

                        emptyList: this.state.emptyList = false,
                        loading: this.state.loading = false,
                        message: this.state.mesagge = "",


                    });

                } else {
                    this.setState({
                        userDetail: this.state.userDetail = [],
                        sponsorDetail: this.state.sponsorDetail = [],
                        masterDetail: this.state.masterDetail = [],
                        emptyList: this.state.emptyList = true,
                        loading: this.state.loading = false,
                        message: this.state.mesagge = "No hay registros para mostrar.",

                    });
                }

            }
        } else {
            this.setState({
                userDetail: this.state.userDetail = [],
                sponsorDetail: this.state.sponsorDetail = [],
                masterDetail: this.state.masterDetail = [],
                emptyList: this.state.emptyList = true,
                loading: this.state.loading = false,
                message: this.state.message = "Se ha producido un error. Inténtelo más tarde."
            });
        }
    }
    handleChange = (e, field) => {
        console.log(e)
        let value = e.target.value;
        console.log(value)
        this.setState({
            [field]: this.state[field] = value,

            userDetail: this.state.userDetail = [],
            sponsorDetail: this.state.sponsorDetail = [],
            masterDetail: this.state.masterDetail = [],
        })


    }
    validation = () => {
            
        if (this.state.idSuscription === -1) {
            if (this.state.txtSearch.length === 0) {
                alert("Ingrese un username antes de enviar");
               return false;
            }
            else {
            alert("Seleccione una suscripción");

           return false;
        }
        }
            
      
         
         


        return true;
    }

    sendData = async (e) => {

        e.preventDefault();

        if(this.validation()){


        let sentEmail = {};

        sentEmail.username = this.state.txtSearch;
        sentEmail.typeMail = this.state.mailType;
        sentEmail.idsuscription = Number(this.state.idSuscription);
        sentEmail.sponsoremail = this.state.sponsoremail;
        sentEmail.masteremail = this.state.masteremail;
        sentEmail.optionalemail = this.state.optionalemail;

        console.log(this.state.sentEmail);

        let response = await UtilService.sendEmailUsernameSearch(sentEmail);

        if (response !== undefined) {
            if (response.status === 1) {
                alert('Envío de correo exitoso');


            } else {
                alert("Aquiun error al momento de realizar el envio de datos");
            }
        } else {
            alert('Tuvimos un problema en el envio de correo. Inténtalo más tarde.');
        }

    }

        window.location.reload();


    };
    async getSponsorEmail() {

        this.state.sponsorDetail.map((item, idx) => {

            return (

                this.setState({
                    sponsoremail: this.state.sponsoremail = item.email
                })


            )
        })

    }
    async getMasterEmail() {

        this.state.masterDetail.map((item, idx) => {

            return (

                this.setState({
                    masteremail: this.state.masteremail = item.email
                })


            )
        })

    }

    handleSelection = (e, field) => {
        //console.log(e.target.id);
        var idField = Number(e.target.id); // id package
        var selectedPackage = {};
        let tempPackages = this.state.userDetail;
        let i;
        for (i = 0; i < tempPackages.length; i++) {

            if (tempPackages[i].id === idField) {
                this.setState({
                    idSuscription: this.state.idSuscription = tempPackages.id
                })

            }

        }
        console.log(this.state.idSuscription)

    };
    handleMotive = (e, field) => {

        let value = e.target.value;


        this.setState({
            [field]: this.state[field] = value,
            messageDoc: ""
        });
        console.log(this.state.optionalemail)
    };


    render() {
        const { userDetail, sponsorDetail, masterDetail, pendingList, message2, loadModal, email } = this.state;
        const { categories, checkedListAll, ItemsChecked, selectedItems, statusText } = this.state;
        const loading = this.state.loading;
        const noData = this.state.noData;
        const message = this.state.message;


        const { suscription, loadSuscription } = this.state;
        return (
            <div>

                {loading &&
                    <div style={{ textAlign: 'center' }}>
                        <Spinner animation="border" role="status" size="sm" >
                            <span className="sr-only">Loading...</span>
                        </Spinner> <Form.Label>Cargando información de Usuario...</Form.Label>

                    </div>
                }
                {!loading && !noData &&
                    <Form>


                        <Form.Group>
                            <h4>Envio de Email</h4>
                        </Form.Group>
                        <br></br>

                        <Row>
                            <Col sm={12}>
                                <Form.Group>
                                    <Form.Row className="align-items-center">
                                        <Col sm={4}>

                                            <Form.Label> Username:</Form.Label>
                                            <Form.Control required type="text" placeholder="Buscar por username"
                                                onChange={e => this.handleChange(e, "txtSearch")} />
                                        </Col>
                                        <Col sm={8}>
                                            <br></br>
                                            <Button variant="primary"
                                                size="sm"
                                                onClick={e => { this.search(e) }}>Buscar</Button>
                                        </Col>
                                    </Form.Row>

                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>


                            <Col sm={12}>

                                {this.state.loading &&
                                    <div>
                                        <Spinner animation="border" variant="dark">
                                        </Spinner>
                                        <p><Form.Label>Cargando información de socios.</Form.Label></p>
                                    </div>
                                }
                                {this.state.emptyList && !this.state.loading &&
                                    <Form.Label>{this.state.message}</Form.Label>
                                }
                                {!this.state.emptyList &&
                                    <div>
                                        <Row>
                                            <Col sm={12}>
                                                <Table responsive>
                                                    <thead className="table-head">
                                                        <tr>

                                                            <th></th>
                                                            <th>Nombres</th>
                                                            <th>Apellidos</th>
                                                            <th>Tipo Contrato</th>
                                                            <th>Fecha Suscripción</th>
                                                            <th>Correo Electrónico</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userDetail.map(function (item, idx) {

                                                            return (
                                                                <tr key={idx}>

                                                                    <td>
                                                                      <Form.Check inline type='radio'
                                                                            name="suscriptions"
                                                                            id={idx}
                                                                            value={item.id}
                                                                            onChange={e => this.handleSelections(e, "idSuscription")}


                                                                        />
                                                                       


                                                                    </td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.lastname}</td>
                                                                    <td>{item.package}</td>
                                                                    <td>{Validation.convertDate(new Date(item.date))}</td>
                                                                    <td>{item.email}</td>


                                                                </tr>
                                                            )
                                                        }, this)

                                                        }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col sm={12}>


                                                {sponsorDetail.map(function (item, idx) {
                                                    return (

                                                        <Form.Group>
                                                            <Row>
                                                                <Checkbox key={idx} value="0" onChange={this.handleCheck} />

                                                                <Col sm={2}>
                                                                    <Form.Label>Patrocinador:</Form.Label>
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <Form.Group>{item.name}</Form.Group>
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <Form.Group>{item.lastname}</Form.Group>
                                                                </Col>
                                                                <Col sm={3}>
                                                                    <Form.Group>{item.email}</Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <br></br>

                                                        </Form.Group>

                                                    )
                                                }, this)
                                                }
                                            </Col>
                                            <Col sm={12}>


                                                {masterDetail.map(function (item, idx) {
                                                    return (

                                                        <Form.Group>


                                                            <Row>
                                                                <Checkbox key={idx} value="1" onChange={this.handleCheck} />

                                                                <Col sm={2}>
                                                                    <Form.Label>Master:</Form.Label>
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <Form.Group>{item.name}</Form.Group>
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <Form.Group>{item.lastname}</Form.Group>
                                                                </Col>
                                                                <Col sm={3}>
                                                                    <Form.Group>{item.email}</Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <br></br>

                                                            <Row>

                                                                <Col sm={6}>

                                                                    <Form.Label>Otro:</Form.Label>

                                                                    <Form.Group>
                                                                        <Form.Control style={{ paddingTop: 6 }} type="text" placeholder="Ingrese otro correo"
                                                                            onChange={e => this.handleMotive(e, "optionalemail")}></Form.Control>

                                                                    </Form.Group>


                                                                </Col>
                                                            </Row>

                                                        </Form.Group>

                                                    )
                                                }, this)
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                }


                            </Col>


                        </Row>
                        <Row>
                            <Col sm={12}>

                                <Form.Group>
                                    <Row>

                                        <Col sm={12}>
                                            <Form.Check inline
                                                id={0}
                                                value="0"
                                                label="Correo Documentos"
                                                type='radio'
                                                onChange={e => this.handleRadio(e, "mailType")}
                                                checked={this.state.mailType === "0"} />

                                            <Form.Group>Se envía correo de bienvenida con sus documentos (contrato, certificado, beneficios, etc).

                                                       </Form.Group>


                                        </Col>
                                    </Row>
                                    <br></br>

                                    <Row>



                                        <Col sm={12}>
                                            <Form.Check inline
                                                id={1}
                                                value="1"
                                                label="Correo Subir Recibo"
                                                type='radio'
                                                onChange={e => this.handleRadio(e, "mailType")}
                                                checked={this.state.mailType === "1"} />

                                            <Form.Group>Correo con un link para subir recibo faltante del Registro.
                                                    </Form.Group>

                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row>

                                        <Col sm={12}>

                                            <Form.Check inline
                                                id={2}
                                                value="2"
                                                label="Cuota Faltante"
                                                type='radio'
                                                onChange={e => this.handleRadio(e, "mailType")}
                                                checked={this.state.mailType === "2"} />

                                            <Form.Group>Correo para que pague la cuota faltante.
                                                    </Form.Group>

                                        </Col>

                                    </Row>
                                    <br></br>
                                    <Row>

                                        <Col sm={12}>

                                            <Form.Check inline
                                                id={3}
                                                value="3"
                                                label="Correo Pago Exitoso"
                                                type='radio'
                                                onChange={e => this.handleRadio(e, "mailType")}
                                                checked={this.state.mailType === "3"} />

                                            <Form.Group>Correo para notificar al usuario el pago de su cuota fue exitoso.
                                                    </Form.Group>

                                        </Col>

                                    </Row>
                                </Form.Group>
                            </Col>


                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Group>
                                    <Form.Row className="align-items-center">
                                        {console.log("correo")};
                                    {console.log(this.state.email)}
                                        {console.log("tipo email")}
                                        {console.log(this.state.mailType)}

                                        <Col sm={8}>
                                            <br></br>
                                            <Button variant="primary"
                                                onClick={this.sendData}>Enviar Correo</Button>

                                        </Col>
                                    </Form.Row>

                                </Form.Group>
                            </Col>

                        </Row>

                    </Form>
                }
            </div>
        );
    }

}