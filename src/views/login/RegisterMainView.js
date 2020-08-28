import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import  RegisterMain  from '../../components/register/RegisterMain';
import RegisterEndView from './RegisterEndView';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

export default class RegisterMainView extends Component {
    constructor(props){
        super(props);
        this.state = { 
            user: {
                name:'',
                lastname:'',
                birthdate: '',
                gender:'',
                idNationality: -1,
                nroDocument : '',
                civilState : '',
                email:'',
                idResidenceCountry : -1,
                idDocumentTypeCountry: -1,
                districtAddress : "",
                address : "",
                username : "",
                password : "",
                coafiliate : false,
                coname:'',
                colastname:'',
                cobirthdate: '',
                conroDocument : '',
                coidDocumentTypeCountry: -1,
                packages :[]
            },
            tempuser:{},
            displayFooter: 'none',
            currentTab:'',
            isComplete: false,
            payment:{
                scheduleJSON: "",
                idMethodPayment: 0,
                mountPaid : 0,
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
    eventFooter = (value, field) =>  {
        console.log(field, ": ", value);
        this.setState({[field]: value });
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
        if(this.state.user.name.length === 0) {
            alert("Ingrese sus nombres.");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        if(this.state.user.lastname.length === 0) {
            alert("Ingrese sus apellidos.");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        if(this.state.user.birthdate.length === 0){
            alert("Ingrese su fecha de nacimiento");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        if(this.state.user.gender.length === 0) {
            alert("Seleccione su sexo.");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        if(this.state.user.idNationality <= 0){
            alert("Seleccione su nacionalidad.");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        
        if(this.state.user.idDocumentTypeCountry <= 0){
            alert("Seleccione un tipo de documento.");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        if(this.state.user.nroDocument.length === 0){
            alert("Ingrese su número de documento.");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        if(this.state.user.civilState.length === 0){
            alert("Seleccione su estado civil.");
            this.setState({
                currentTab: this.state.currentTab ="Step1"
            });
            return false;
        }
        if(this.state.user.email.length === 0){
            alert("Ingrese su correo electrónico.");
            this.setState({
                currentTab: this.state.currentTab ="Step2"
            });
            return false;
        }
        if(this.state.user.idResidenceCountry <= 0){
            alert("Seleccione su país de residencia.");
            this.setState({
                currentTab: this.state.currentTab ="Step2"
            });
            return false;
        }
        if(this.state.user.districtAddress.length === 0){
            alert("Ingrese su distrito/estado.");
            this.setState({
                currentTab: this.state.currentTab ="Step2"
            });
            return false;
        }
        if(this.state.user.address.length === 0){
            alert("Ingrese su dirección.");
            this.setState({
                currentTab: this.state.currentTab ="Step2"
            });
            return false;
        }
        if(this.state.user.phone.length === 0){
            alert("Ingrese su número de celular.");
            this.setState({
                currentTab: this.state.currentTab ="Step2"
            });
            return false;
        }
        if(this.state.user.packages.length === 0){
            alert("Selecione un paquete.");
            this.setState({
                currentTab: this.state.currentTab ="Step3"
            });
            return false;
        }
        if(this.state.user.coafiliate){
            
            
            if(this.state.user.coname.length === 0) {
                alert("Ingrese los nombres de su coafiliado.");
                this.setState({
                    currentTab: this.state.currentTab ="Step1"
                });
                return false;
            }
            if(this.state.user.colastname.length === 0) {
                alert("Ingrese los apellidos de su coafiliado.");
                this.setState({
                    currentTab: this.state.currentTab ="Step1"
                });
                return false;
            }
            if(this.state.user.coidDocumentTypeCountry <= 0){
                alert("Seleccione el tipo de documento de su coafiliado.");
                this.setState({
                    currentTab: this.state.currentTab ="Step1"
                });
                return false;
            }
            if(this.state.user.conroDocument.length === 0){
                alert("Ingrese el numero de documento de su coafiliado.");
                this.setState({
                    currentTab: this.state.currentTab ="Step1"
                });
                return false;
            }
            if(this.state.user.cobirthdate.length === 0){
                alert("Ingrese la fecha de nacimiento  de su coafiliado.");
                this.setState({
                    currentTab: this.state.currentTab ="Step1"
                });
                return false;
            }
        }
        
        if(this.state.payment.typePay == 1 ){
            if(!this.state.payment.isPaid){
                if(!this.state.payment.vouchers.length < 0) {
                    alert("Tiene que registrar el pago de su membresía.");
                    return false;
                }
            }
        } else if (this.state.payment.typePay == 0){
            alert("Seleccione un método de pago.");
            return false;
        }
        
        
        return true;
    }

    sendData = async(e)=> {
       
        e.preventDefault();
       
        if(this.validation()){
            let data = {};
            let user = {};
            user.name = this.state.user.name;
            user.lastname = this.state.user.lastname;
            user.birthdate = this.state.user.birthdate;
            user.gender = this.state.user.gender;
            user.idNationality = Number(this.state.user.idNationality);
            user.idDocument = Number(this.state.user.idDocumentTypeCountry);
            user.nroDocument = this.state.user.nroDocument;
            user.civilState = this.state.user.civilState;
            user.email = this.state.user.email;
            user.idResidenceCountry = Number(this.state.user.idResidenceCountry);
            user.districtAddress = this.state.user.districtAddress;
            user.address = this.state.user.address;
            user.nroTelf = this.state.user.phone;
            user.username = "";
            user.password = "";
            user.boolDelete = 0;
            let  suscription = {};
            suscription.idUser = 0;
            suscription.idPackage = Number(this.state.user.packages[0]);
            let date = new Date();
            let datString = "2020-07-14T00:00:00";// date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
            suscription.creationDate = datString;
            suscription.observation = "";
            suscription.status =  0; 

            data.user = user;
            data.suscription = suscription;
            let coafiliate = {};
            // Coafiliate
            if(this.state.user.coafiliate){
                coafiliate.name = this.state.user.coname;
                coafiliate.lastname = this.state.user.colastname;
                coafiliate.idDocument = Number(this.state.user.coidDocumentTypeCountry);
                coafiliate.birthdate = this.state.user.cobirthdate;
                coafiliate.nroDocument = this.state.user.conroDocument;
                coafiliate.idUser = 1;
            }
            data.CoAffiliate = coafiliate;

            //if voucher is paid is true the payment was pay by voucher
            // membDetail :payments
            // TypePay == the pay was by paypal or vouchers
            if(this.state.payment.typePay == 1){
                let payment = {};
                // was with vouchers
                if(!this.state.payment.isPaid){
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
                    for(i=0; i < images.length ; i++){
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

            if(response !== undefined) {
                if(response.status === 1){
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
        return(
        
        // <div className="auth-wrapper">
        <div>
            <Form.Label className="content-title">Registro de Nuevo socio</Form.Label>
                
            <div className="register-inner" style={{display: this.state.isComplete? 'none':'block'}}>
                {/* <Form.Label className="content-title">Registro de nuevo socio</Form.Label> */}

                <RegisterMain onChange={this.eventhandler} 
                    eventFooter={this.eventFooter}
                    eventPay={this.eventPayment}
                    eventVoucher={this.eventVoucher}
                    packages={this.state.user.packages}
                    currentTab={this.state.currentTab}></RegisterMain>
                <hr></hr>
                {/* <div className="row justify-content-between" style={{display:this.state.displayFooter}}>
                    <Col ms={4}>
                        <Button variant="danger"
                            >Cancelar</Button>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button variant="primary"
                            onClick={this.sendData}>Registrar</Button>
                    </Col>
                </div> */}
               
            </div>
            <div style={{display: this.state.isComplete? 'block':'none'}}>
                <RegisterEndView></RegisterEndView>
            </div>
        </div>  
        );
    }
}


