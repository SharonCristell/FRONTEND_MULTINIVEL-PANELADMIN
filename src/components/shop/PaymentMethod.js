import React, { Component } from 'react';
import { Form, Row, Col, Spinner, Button,
    InputGroup, FormControl, Image, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBinLine } from 'react-icons/ri';

import PayPalButton from '../payment/PaypalButton';
import PayVoucher from '../payment/PayVoucher';
// import { PayPalButton } from 'react-paypal-button-v2'
import logo from '../../images/paypal-logo.png';
import logoBcp from '../../images/bcp-logo.jpg';
import logoInter from '../../images/interbank-logo.png';
import UtilService from '../../services/utils.service';
import PayVoucherInter from '../payment/PayVoucherInter';

 /**
  * Class
  */
export default class Step extends Component {
    constructor(props){
        super(props);
        this.state = {
            idPackage : 0,
            total: "0",
            initial: "0",
            totalCuotas: "0",
            discount: 0,
            packages: [],
            name: "",
            description : "",
            price: "",
            quotes: 1,
            perQuotes: 0,
            initialPrice: "",
            duration: "",
            message :"",
            codeMessage:"",
            isOkQuote: true,
            showPayPal: false,
            showVoucher: false,
            isPaid: false,
            typePaidMethod: 0,
            method: '',
            bank: '',
            vouchers: [],
            typePay: 0
        }
    }
    //--- typePaidMethod 
    // 1 -> paypal, 2 --> vouchers , 3 ->after pay(send email)
    //--- voucher body
    // type
    // bank
    // code operation
    // titular cuenta
    // Comision
    // voucher64
    // name
    componentWillReceiveProps(props) {
        this.setState({ packages: props.packages });
        // console.log("Step 1 recevice");
        if(props.packages !== undefined && props.packages.length > 0){
            this.getPackages(props.packages[0]);
        }
    }
    /**
     * Method to get packages information
     */
    async getPackages(id) {
        if(this.state.idPackage !== id){
          
            let item = await UtilService.getPackageById(id);

            if(item !== undefined) {
                let initial =  Number(item.initialPrice);
                let priceAll =  Number (item.price);
                let quotesAll = priceAll - initial;
                let quotes = Number(item.quotes)
                let perQuotes = quotesAll / quotes;
                let temp = initial + perQuotes;

                this.setState({
                    idPackage : id,
                    name: item.name,
                    description : item.description,
                    price: item.price,
                    quotes: item.quotes,
                    initialPrice: item.initialPrice,
                    duration: item.duration,
                    total:  temp,
                    initial: initial,
                    totalCuotas:  perQuotes,
                    perQuotes: perQuotes,
                    quotes: item.quotes,
                    isLoaded: true,
                    code: ""
                });
            }

            // this.forceUpdate();
        }

    }

    onEventCode = (e) => {
        e.preventDefault();
        if(this.state.code.length > 0){
            this.validateCode(this.state.code);
        }
    }

    async validateCode(code){
        
        let codePromotion = await UtilService.verifyCode(code);
        
        if(codePromotion !== undefined && codePromotion.status > 0){
            this.setState({
                codeMessage: "" ,
                discount: 1
            });
        } else {
            this.setState({
                codeMessage: "El código no es válido o ya expiró." ,
                discount: 0
            });
        }

    }


    handleChange = (e) => {
        let value = Number(e.target.value);
        if(value <= this.state.quotes){

            let totalQuote = this.state.perQuotes * value;
            let total = this.state.initial + totalQuote - this.state.discount;

            this.setState({
                total: this.state.total = total,
                totalCuotas: this.state.totalCuotas = totalQuote,
                isOkQuote: true
            });
        } else {
            this.setState({
                isOkQuote: false
            });
        }

    }

    onChange = (e, field) => {
        console.log(e.target.value, field);
        this.setState({ [field]: e.target.value });
        // this.setState({ [field]: e.target.value }, () => {
        //     if (this.props.onChange) {
        //         this.props.onChange(e.target.value, field);
        //       }
        // });

    }


    /**
     * Event pay
     */
    eventPay = (value, field) => {
        // idMethodPayment: 0,
        // mountPaid : 0,
        // isPaid: false
        console.log("event pay ");
        this.setState({[field]: value});
        if(this.props.eventPay){
            this.props.eventPay(value, field);
        }
    }


    /**
     * Connect with paypal
     * @param {*} e
     */
    onEventPayPal = (e) => {
        if(this.state.idPackage > 0 ){
            if(this.state.isPaid) {
                alert("Su pago con PayPal ha registrado exitosamente.");
            } else {
                if(this.state.vouchers.length > 0){
                    alert("Usted ha subido comprobantes de pago.");
                } else {
                    this.handleShow();
                }
            }

        } else {
            alert("Debes seleccionar un paquete de suscripción.");
        }
    }

    // Handle modal
    handleClose = () => {
        this.setState({
            showPayPal : false
        });
    }
    handleShow = () => {
        this.setState({
            showPayPal : true
        });
    }

    handleRadio = (e, id) => {
        console.log(id)
        this.setState({
            typePay: this.state.typePay = id
        });
        // Send type selected vouchers - paypal or after
        this.props.eventPay(id, 'typePay');
    }

    // Load voucher
    addVoucher = (voucher) => {
        let vouchers = this.state.vouchers;
        let isAdded = false;
        let i = 0;
        for(i = 0; i < vouchers.length; i ++)
        {
            if(vouchers[i].code === voucher.code 
                && vouchers[i].bank === voucher.bank 
                && vouchers[i].type === voucher.type){
                isAdded = true;
            }
        }

        if(!isAdded){
            vouchers.push(voucher);
            this.setState({
                vouchers: this.state.vouchers = vouchers
            });
            this.props.eventPay(vouchers, 'vouchers');
        } else {
            alert("Ya exite un voucher con el código de operación: " + voucher.code)
        }
       
    }

    deleteVoucher = (e, code) => {
        let temp = [];
        let vouchers = this.state.vouchers;
        let i = 0;
        for(i = 0; i < vouchers.length; i ++)
        {
            if(!vouchers[i].code === code){
                temp.push(vouchers[i]);
            }
        }
        this.setState({
            vouchers: temp
        });
        this.props.eventPay(temp, 'vouchers');
    }
    // Change of voucher
    onchangePayVoucher = (value, field) => {
        console.log("event pay voucher");
        this.setState({[field]: value});
        if(this.props.onchangePayVoucher){
            this.props.onchangePayVoucher(value, field);
        }
    }

    handleSave = (e) => {
        if(Number(this.state.type) > 0 && this.state.voucher.length > 0){
            this.setState({isPaid: true});
            if(this.props.onchangePayVoucher){
                this.props.onchangePayVoucher('bcp', 'bank');
                this.props.onchangePayVoucher(true, 'isPaid');
            }
            this.handleCloseVoucher();
        } else {

        }

    }
    // Handle modal voucher
    handleShowVoucher = (e, bank) => {
        if(this.state.idPackage > 0 ){
            if(this.state.isPaid) {
                alert("Su pago ha sido registrado con PayPal.");
            } else {
                if(bank === 'BCP') {
                    this.setState({
                        showVoucher : true,
                        bank: 'BCP',
                        isBcp: true,
                        isInter: false
    
                    });
                } else if(bank === 'Interbank') {
                    this.setState({
                        showVoucher : true,
                        bank: 'Interbank',
                        isBcp: false,
                        isInter: true
    
                    });
                }
                
            }

        } else {
            alert("Debes seleccionar un paquete de suscripción");
        }
    }

    handleCloseVoucher = () => {
        this.setState({
            showVoucher : false
        });
    }
   
    render(){
        const { vouchers, typePay } = this.state;
        // console.log(typePay)
        return (
            <div>
                <Form.Label className="content-subtitle">Métodos de pagos</Form.Label>

                <Form>
                    <Form.Group>
                        <Row>
                            <Col sm={12}>
                                    <Form.Label>Paquete seleccionado</Form.Label>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <Row>
                                    <Form.Label column="sm">Descripción</Form.Label>
                                </Row>
                                <Row>
                                    <Col> 
                                        <Form.Text>{this.state.name} </Form.Text>
                                    </Col>
                                </Row>
                                <Row><Col>
                                    <Form.Text>{this.state.description} </Form.Text>
                                    </Col>
                                </Row>
                                <Row><Col>
                                    <Form.Text>Duración: {this.state.duration} </Form.Text>
                                    </Col>
                                </Row>
                                
                            </Col>
                           <Col sm={3}>
                               <Row>
                                    <Form.Label column="sm">Precio Total</Form.Label>
                               </Row>
                               <Row><Col>
                                    <Form.Text >{this.state.price}</Form.Text>
                                </Col>
                               </Row>
                           </Col>
                           {/* <Col>
                                <Form.Label>Nro. de cuotas</Form.Label>
                           </Col> */}
                           <Col sm={3}>
                               <Row>
                                    <Form.Label column="sm">Inicial</Form.Label>
                               </Row>
                               <Row><Col>
                                    <Form.Text>{this.state.initialPrice}</Form.Text>
                                    </Col>
                                </Row>
                           </Col>
                           <Col sm={3}>
                                <Row>
                                    <Form.Label column="sm">Nro. de cuotas</Form.Label>
                                </Row>
                                <Row><Col>
                                    <Form.Text>{this.state.quotes}</Form.Text>
                                    </Col>
                                </Row>
                           </Col>
                        </Row>
                        
                        <Row>
                            <Col sm={12}>
                        <Form.Text style={{color:'red', fontSize:'10'}}>{this.state.message}</Form.Text>
                            </Col>
                        </Row>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Row>
                            <Col sm={6}>
                            <Form.Label>Código promocional</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Ingresa un código"
                                aria-describedby="basic-addon2"
                                onChange={e => this.onChange(e, "code")}
                                />
                                <InputGroup.Append>
                                    <Button variant="secondary" size="sm" onClick={this.onEventCode}>
                                        <Spinner animation="border" role="status"  size="sm"
                                            style={{display: this.state.loading? 'inline-block': 'none'}}>
                                            <span className="sr-only">Validar</span>
                                        </Spinner> Validar
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <Form.Text className="textAlert">{this.state.codeMessage}</Form.Text>
                            </Col>
                        </Row>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group style={{width:'60%'}}>
                        <Row>
                            <Col>
                            <Form.Label>Detalle</Form.Label>
                            </Col>

                        </Row>
                        <Row>
                            {/* <Col>
                                <Form.Text style={{fontSize:'14px'}}>Inicial</Form.Text>
                            </Col> */}
                            <Col>
                            <Form inline>
                                <Form.Text style={{fontSize:'14px'}}>Inicial : &nbsp; </Form.Text>
                                <Form.Control size="sm" type="number" min="1" max="1" defaultValue="1"
                                    onChange={e => this.handleChange(e)}
                                    ></Form.Control>
                                </Form>
                            </Col>

                            <Col sm="4" style={{textAlign: 'right'}}>
                                <Form.Text style={{fontSize:'14px'}}>$ {this.state.initial}</Form.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form inline>
                                <Form.Text style={{fontSize:'14px'}}>Total de cuotas a pagar : &nbsp; </Form.Text>
                                <Form.Control size="sm" type="number" min="1" max={this.state.quotes} defaultValue="1"
                                    onChange={e => this.handleChange(e)}
                                    ></Form.Control>
                                </Form>
                            </Col>

                            <Col sm="4" style={{textAlign: 'right'}}>
                                <Form.Text style={{fontSize:'14px'}} id="totalCuota">$ {this.state.totalCuotas}</Form.Text>
                            </Col>
                        </Row>
                        <Row style={{display: this.state.isOkQuote? 'none': 'block'}}>
                            <Col>
                                <Form.Text className="textAlert">El número máximo de cuotas a pagar es : {this.state.quotes}</Form.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Text style={{fontSize:'14px'}}>Descuento : &nbsp; </Form.Text>
                            </Col>
                            <Col sm="4" style={{textAlign: 'right'}}>
                                <Form.Text style={{fontSize:'14px'}} id="idDiscount">$ {this.state.discount}</Form.Text>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col>
                                <Form.Label>Total: </Form.Label>
                            </Col>

                            <Col sm="4" style={{textAlign: 'right'}}>
                                <Form.Label id="total">$ {this.state.total}</Form.Label>
                            </Col>
                        </Row>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Row>
                            <Col>
                            <Form.Check
                                    type='radio'
                                    id='1'
                                    name="typePay"
                                    onChange={e => {this.handleRadio(e, 1)}}
                                    label='Seleccione un medio de pago.'
                                   
                                />
                            {/* <Form.Lab&&el>Seleccione un medio de pago</Form.Label> */}
                            </Col>
                        </Row>
                    
                        <Row style={(typePay===1 )? ({padding: 16}): ({padding: 16, pointerEvents: 'none', opacity: 0.5})}>
                            <Col sm={3}>
                                <Image src={logo} rounded style={{width:"100px"}}
                                onClick={this.onEventPayPal}></Image>
                            </Col>
                            <Col sm={3}>
                                <Image src={logoBcp} rounded style={{width:"100px"}}
                                onClick={(e) => {this.handleShowVoucher(e, 'BCP')}}></Image>
                            </Col>
                            <Col sm={3}>
                                <Image src={logoInter} rounded style={{width:"120px"}}
                                onClick={(e) => {this.handleShowVoucher(e, 'Interbank')}}></Image>
                            </Col> 
                        </Row>
                        {typePay == 1 && <div>
                            <Form.Label>Lista de voucher</Form.Label>
                            {vouchers.map((item, id) => (
                                <Row>
                                    <Col>{item.code}</Col>
                                    <Col>{item.bank}</Col>
                                    <Col>{item.name}</Col>
                                    <Col onClick={(e) => {this.delete(e, item.code)}}><RiDeleteBinLine ></RiDeleteBinLine></Col>
                                </Row>
                            ))}
                            </div>}
                        <Row>
                            <Col>
                            <Form.Check
                                    type='radio'
                                    id='2'
                                    name="typePay"
                                    onChange={e => {this.handleRadio(e, 2)}}
                                    label='Subir comprobante de pago despues.'
                                />
                                <div style={(typePay===2)? ({paddingLeft: 16}): ({paddingLeft: 16, opacity: 0.5})}>
                                    <Form.Label className="textAlert">Se le enviará un correo con el detalle de los medios de pago.</Form.Label>
                                </div>
                                </Col>
                        </Row>

                    </Form.Group>
                    <hr></hr>
                </Form>

                {/* Modal */}
                <Modal show={this.state.showPayPal} 
                    onHide={this.handleClose}
                    backdrop="static">
                    <Modal.Header closeButton>
                    <Modal.Title>PayPal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <PayPalButton mount={this.state.total}
                                description={this.state.name} 
                                eventPay={this.eventPay}></PayPalButton>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cerrar
                    </Button>
                    {/* <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button> */}
                    </Modal.Footer>
                </Modal>

                {/* Modal upload voucher*/}
                <Modal show={this.state.showVoucher} 
                    onHide={this.handleCloseVoucher} style={{fontSize: 10}}
                    backdrop="static">
                    <Modal.Header closeButton>
                    <Modal.Title>Pago en efectivo a tavés de {this.state.bank}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isBcp &&
                            <Form.Group>
                                <PayVoucher total={this.state.total}
                                    addVoucher={this.addVoucher} 
                                    close={this.handleCloseVoucher}></PayVoucher>
                                {/* <PayVoucher onChangePay= {this.onchangePayVoucher}></PayVoucher> */}
                            </Form.Group>
                        }
                        { this.state.isInter &&
                            <Form.Group>
                                <PayVoucherInter total={this.state.total}
                                    addVoucher={this.addVoucher} 
                                    close={this.handleCloseVoucher}></PayVoucherInter>
                            </Form.Group>
                        }
                       
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}