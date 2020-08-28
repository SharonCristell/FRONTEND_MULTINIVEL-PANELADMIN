import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PackageMain from '../../components/shop/PackageMain';
import PackageEndView from './PackageEndView';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import history from  '../navigation/history';


export default class PackageMainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                lastname: '',
                username: "",
                password: "",
                packageStatus:"",
                packages: []
            },
            tempuser: {},
            displayFooter: 'none',
            currentTab: '',
            isComplete: false,
            payment: {
                scheduleJSON: "",
                idMethodPayment: 0,
                mountPaid: 0,
                isPaid: false,
                typePay: 0,
                vouchers: []
            },
            voucher: {
                bank: '',
                isPaid: false
            }
        }
    }

    OnClicked = (e, path) => {
        history.push(path);
    }

    eventhandler = (data, field) => {
        // console.log('register view');
        // console.log(field, ": ", data);
        // this.state.tempuser = data;
        var temp = this.state.user;
        temp[field] = data;
        // console.log(temp);
        this.setState({ user: temp });
    };
    /**
     * Event to handle if the footer is shown or hidden
     * @param {*} value 
     * @param {*} field 
     */
    eventFooter = (value, field) => {
        console.log(field, ": ", value);
        this.setState({ [field]: value });
    }

    /**
     * To handle the event  on payment step
     */
    eventPayment = (value, field) => {
        // payment:{
        //     scheduleJSON: "",
        //     idMethodPayment: 0,
        //     mountPaid : 0,
        //     isPaid: false

        // }
        var temp = this.state.payment;
        temp[field] = value;
        this.setState({ payment: temp });
        console.log("Event pay");
        console.log(this.state.payment);
    }

    eventVoucher = (value, field) => {
        var temp = this.state.voucher;
        temp[field] = value;
        this.setState({ voucher: temp });
        console.log("Event voucher");
        console.log(this.state.voucher);
    }

    validation = () => {
        
        if (this.state.user.packageStatus.length === 0) {
            alert("Seleccione una modalidad de compra.");
            this.setState({
                currentTab: this.state.currentTab = "Step1"
            });
            return false;
        }
        
        
        if (this.state.user.packages.length === 0) {
            alert("Selecione un paquete.");
            this.setState({
                currentTab: this.state.currentTab = "Step3"
            });
            return false;
        }

        if (this.state.payment.typePay == 1) {
            if (!this.state.payment.isPaid) {
                if (!this.state.payment.vouchers.length < 0) {
                    alert("Tiene que registrar el pago de su compra.");
                    return false;
                }
            }
        } else if (this.state.payment.typePay == 0) {
            alert("Seleccione un método de pago.");
            return false;
        }


        return true;
    }

    sendData = async (e) => {

        e.preventDefault();

        if (this.validation()) {
            let data = {};
            let user = {};
            user.name = this.state.user.name;
            user.lastname = this.state.user.lastname;
            user.username = "";
            user.password = "";
            user.boolDelete = 0;
            let suscription = {};
            suscription.idUser = 0;
            suscription.idPackage = Number(this.state.user.packages[0]);
            let date = new Date();
            let datString = "2020-07-14T00:00:00";// date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
            suscription.creationDate = datString;
            suscription.observation = "";
            suscription.status = 0;

            data.user = user;
            data.suscription = suscription;
            
            //if voucher is paid is true the payment was pay by voucher
            // membDetail :payments
            // TypePay == the pay was by paypal or vouchers
            if (this.state.payment.typePay == 1) {
                let payment = {};
                // was with vouchers
                if (!this.state.payment.isPaid) {
                    payment.scheduleJSON = "";
                    payment.idMethodPayment = 1; // TODO what are method of payments preguntar
                    payment.creationDate = new Date();
                    payment.modificationDate = new Date();
                    payment.idSuscription = suscription.idPackage;
                    payment.idTransaction = this.state.payment.vouchers[0].code; // TODO is unique field what is the value when is vouchers
                    payment.intent = this.state.voucher.bank;
                    payment.status = "ACCEPTED";
                    //add voucher
                    let voucher = {};
                    let userVoucher = {
                        name: this.state.user.name,
                        lastname: this.state.user.lastname,
                        nroDocument: this.state.user.nroDocument
                    };
                    let images = this.state.payment.vouchers;
                    voucher.User = userVoucher;
                    voucher.Caption = '';
                    let vouchers = [];
                    let i;
                    for (i = 0; i < images.length; i++) {
                        // vouchers.push(images[i]);
                        vouchers.push(images[i].voucherbase);
                    }
                    voucher.Base64Images = vouchers;
                    data.vouchers = voucher;
                } else {
                    // was by paypal
                    payment.scheduleJSON = "";
                    payment.idMethodPayment = 1;
                    payment.creationDate = this.state.payment.creationDate;
                    payment.modificationDate = this.state.payment.modificationDate;
                    payment.idSuscription = suscription.idPackage;
                    payment.idTransaction = this.state.payment.idTransaction;
                    payment.intent = this.state.payment.intent;
                    payment.status = this.state.payment.status;
                }

                data.membDetail = payment;
            } else {
                // The pay was without payment
                let payment = {}
            }


            // Add user affiliate
            let affiliate = {};
            affiliate.idSponsor = Number(AuthService.getCurrentIdUser());
            affiliate.idSon = 0;
            data.affiliate = affiliate;

            console.log("Insert usuario")
            console.log(data);

            let response = await UserService.registerUser(data);

            if (response !== undefined) {
                if (response.status === 1) {
                    // alert('Usuario registrado');
                    this.setState({
                        isComplete: this.state.isComplete = true
                    });

                } else {
                    alert("Ocurrió un error al momento de registrarte.");
                }
            } else {
                alert('Tuvimos un problema en registrarte. Inténtalo más tarde.');
            }

        }
    };

    render() {
        return (

            // <div className="auth-wrapper">
            <div>

                <div className="register-inner" style={{ display: this.state.isComplete ? 'none' : 'block' }}>
                    {/* <Form.Label className="content-title">Registro de nuevo socio</Form.Label> */}

                    <PackageMain onChange={this.eventhandler}
                        eventFooter={this.eventFooter}
                        eventPay={this.eventPayment}
                        packages={this.state.user.packages}
                        currentTab={this.state.currentTab}></PackageMain>
                    <hr></hr>
                    <div className="row justify-content-between" style={{ display: this.state.displayFooter }}>
                        <Col ms={4}>
                            <Button variant="danger"
                            onClick={e => this.OnClicked(e, "/home")}
                            >Cancelar</Button>
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                            <Button variant="primary"
                                onClick={this.sendData}>Finalizar</Button>
                        </Col>
                    </div>

                </div>
                <div style={{ display: this.state.isComplete ? 'block' : 'none' }}>
                    <PackageEndView></PackageEndView>
                </div>
            </div>
        );
    }
}


