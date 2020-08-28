import React, { Component, useState } from 'react';
import { Container, Row, Col, Button, Form, Table, Spinner, Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Validation from '../utils/Validation';
import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';

//import '../../views/styles/ModalCustom.css';

const selectionPackageKey = "U"; // upgrade

export default class PackageSelected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            showRegister: 'none',

            package: [],
            packages: [],
            checkList: [],
            packageFamily: [],
            loading: true,
            noData: false,
            message: '',
            packageStatus:"",

            suscription: [],
            schedule: [],
            loadSuscription: false,
        
        }
        this.getPackageFamily = this.getPackageFamily.bind(this);
        this.getSuscription = this.getSuscription.bind(this);


    }
    componentDidMount() {
        this.getPackageFamily();
        this.getSuscription();
    }

    async getPackageFamily() {

        let data = await UtilService.getPackages();
        if (data !== undefined) {
            if (data.length > 0) {
                this.setState({
                    packageFamily: data,
                    loading: false,
                    noData: false
                });
            } else {
                this.setState({
                    packageFamily: [],
                    loading: false,
                    noData: true,
                    message: "No hay registros para mostrar."
                });
            }
        } else {
            this.setState({
                packageFamily: [],
                loading: false,
                noData: true,
                message: "Ocurrió un error al obtener los paquetes. Vuelva a intentarlo más tarde."
            });
        }

    }

    async getSuscription() {
        // console.log("my pay");
        let suscriptions = await UserService.getSuscription();
        if (suscriptions !== undefined && suscriptions !== null) {
            if (suscriptions.status !== 1) {
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


    handleSelection = (e, field) => {
        console.log(e.target.id);
        var idField = e.target.id;

        this.setState({ packages: [idField] }, () => {
            if (this.props.onChange) {
                this.props.onChange([idField], "packages");
            }
        })

        // console.log(this.state.checkList)

    };
    /**
     * Method to handle the change  of properties and send it to parent 
     * @param {*} e 
     * @param {*} field 
     */
    handleChange = (e, field) => {
        // console.log('step one');
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

    /**
     * Method to handle the selected item  send it to parent 
     * @param {*} e 
     * @param {*} field 
     */

    handleSelectUpgrade = (e, field) => {
        console.log(e.target.value, field);
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        });

    };
    /**
     * Method to handle the change  of properties and send it to parent 
     * @param {*} e 
     * @param {*} field 
     */
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

        if (value === selectionPackageKey) {
            this.setState({
                showRegister: this.state.showRegister = 'block'
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(true, 'show');
                }
            });
        } else {
            this.setState({
                showRegister: this.state.showRegister = 'none',
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(false, 'show');
                }
            });
        }


    };

    render() {

        const packageFamily = this.state.packageFamily;
        const loading = this.state.loading;
        const noData = this.state.noData;
        const message = this.state.message;


        const { suscription, loadSuscription } = this.state;

        return (
            <div>
                <Container>

                    {loading &&
                        <div style={{ textAlign: 'center' }}>
                            <Spinner animation="border" role="status" size="sm" >
                                <span className="sr-only">Loading...</span>
                            </Spinner> <Form.Label>Cargando información de paquetes...</Form.Label>

                        </div>
                    }
                    {!loading && !noData &&
                        <Form.Group controlId="formStepThree">
                            <Form.Label className="content-subtitle">¿Qué Deseas Hacer?</Form.Label>
                            <Row>
                                <Form.Group>
                                        <div key={'inline-radio'} className="mb-3">
                                            <Col sm={12}>
                                                <Row>

                                                    <Col sm={12}>
                                                        <Form.Check inline label="Comprar Nuevo Paquete" type='radio' id={`inline-radio`} value="N"
                                                            onChange={e => this.handleRadio(e, "packageStatus")}
                                                            checked={this.state.packageStatus === "N"} />
                                                    </Col>
                                                </Row>
                                                <br></br>
                                                <Row>

                                                    <Col sm={5}>
                                                        <Form.Check label="Upgrade mi Membresía" type='radio' id={`inline-radio2`} value="U"
                                                            onChange={e => this.handleRadio(e, "packageStatus")}
                                                            checked={this.state.packageStatus === "U"} />
                                                    </Col>
                                                    <Col sm={7}>
                                                        <Form.Group style={{ display: this.state.showRegister }}>
                                                            {/* <RegisterBeneficiary ></RegisterBeneficiary> */}

                                                            <Form.Group>
                                                                <Form.Control as="select" defaultValue={'DEFAULT'}
                                                                    onChange={e => this.handleSelectPackage(e, "upgradeExperience")}>
                                                                    {suscription.map(time => (
                                                                        <option key={time} value={time}>
                                                                            Experiencia adquirida en {Validation.convertDate(new Date(time.creationDate))}
                                                                        </option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </div>
                                </Form.Group>
                            </Row>
                            <Form.Label className="content-subtitle">LISTADO DE PAQUETES</Form.Label>
                            <Form.Group>
                                <Accordion>
                                    {packageFamily.map((item, i) => (
                                        <Card key={i}>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey={i} style={{ fontWeight: 'bold', fontSize: 14 }}>
                                                    {item.name}
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={i}>
                                                <Card.Body>
                                                    <Table className="tableCustom" striped bordered hover responsive="md" size="sm">
                                                        <thead>
                                                            <tr>
                                                                {/* <th></th>
                                                    {
                                                        item.headers.map((header, id) => (
                                                        <th>{header}</th>
                                                        ))
                                                    } */}
                                                                <th></th>
                                                                <th>Nombre</th>
                                                                <th>Descripción</th>
                                                                <th>Precio</th>
                                                                <th>Número de cuotas</th>
                                                                <th>Cuota  inicial</th>
                                                                {/* <th>Duración</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                item.packages.map((itempck) => (
                                                                    <tr key={itempck.id}>
                                                                        <td>
                                                                            <Form.Check inline type='radio'
                                                                                name="packages"
                                                                                id={itempck.id}
                                                                                onChange={e => this.handleSelection(e)} />

                                                                        </td>
                                                                        <td>{itempck.name}</td>
                                                                        <td>{itempck.description}<br></br>
                                                                Duración: {itempck.duration}
                                                                            {/* <ul>
                                                                    {
                                                                        itempck.descriptions.map((label, idxLabel) => (
                                                                        <li>{label}</li>
                                                                        ))
                                                                    }
                                                                </ul> */}
                                                                        </td>
                                                                        <td>{itempck.price}</td>
                                                                        <td>{itempck.quotes}</td>
                                                                        <td>{itempck.initialPrice}</td>
                                                                        {/* <td>{itempck.duration}</td> */}
                                                                    </tr>
                                                                ))

                                                            }
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))
                                    }
                                </Accordion>
                            </Form.Group>
                        </Form.Group>
                    }
                    {noData &&
                        <div>
                            <Form.Label>{message}</Form.Label>
                        </div>
                    }
                </Container>
            </div>
        );
    }
}