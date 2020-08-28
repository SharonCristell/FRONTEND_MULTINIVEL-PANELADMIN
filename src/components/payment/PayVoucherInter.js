import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
import logoInter from '../../images/interbank-logo.jpg';

export default class PayVoucherInter extends Component {
    constructor(props){
        super(props);
        this.state = {
            type:0,
            code: '',
            titular:'',
            comission:0,
            name:'',
            voucherbase: '',
            bank:'Interbank',
            mount: this.props.total,
            total: 0,
            pictures: [] ,
        }
        this.onDrop = this.onDrop.bind(this);
    }

    validation() {
        if(this.state.code.length <= 0) {
            return false;
        }  
        if(Number(this.state.type) < 0) {
            return false;
        }
        if(this.state.name.length  <= 0) {
            return false;
        }

        return true;
    }
    onSave = (e) => {
        // Verify 
        if(this.validation()) {
            let voucher = {
                type: this.state.type,
                code: this.state.code,
                titular: this.state.titular,
                comission: this.state.comission,
                name: this.state.name,
                voucherbase: this.state.voucherbase,
                bank: this.state.bank,
            };
            this.props.addVoucher(voucher)
            this.props.close();
        }
    }
    handleChange = (e, field) => {
        // console.log(e.target.value);
        this.setState({
            [field]: this.state[field] = e.target.value });
        
    };

    getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

    onDrop(picture) {
        console.log(picture)
        let idCardBase64 = '';
        this.getBase64(picture[0], (result) => {
            idCardBase64 = result;
            this.setState({
                voucherbase: this.state.voucherbase = result,
                name: this.state.name = picture[0].name,
                pictures: this.state.pictures = picture
            });
        });
       
    }

    
 

    render() {
        
        return(
            <div>
                <Row>
                    <Col sm={4}>
                        <Image src={logoInter} rounded style={{width:60}}></Image>
                
                    </Col>
                    <Col sm={8}>
                    </Col>
                </Row>
                <Row>
                       <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Seleccion tipo de operación: </Form.Label>
                                <Form.Control as="select" style={{fontSize: 12}} defaultValue={'0'}
                                    onChange={e => this.handleChange(e, "type")}>
                                    <option value="0" disabled>Seleccione una opción</option>
                                    <option value="1" >Transferencia bancaria</option>
                                    <option value="2" >Depósito en agente Interbank</option>
                                    <option value="3" >Pago a través de TUNKI</option>
                                </Form.Control>
                            </Form.Group>
                       </Col>
                       <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Ingrese codigo de operación *</Form.Label>
                                <Form.Control onChange={e => this.handleChange(e, "code")} style={{fontSize: 12}}></Form.Control>

                            </Form.Group>
                       </Col>
                   </Row>
                   <Row>
                       <Col>
                            <Form.Group>
                                <Form.Label>Titular: </Form.Label>
                                <Form.Control onChange={e => this.handleChange(e, "titular")} style={{fontSize: 12}}></Form.Control>

                            </Form.Group>
                       </Col>
                   </Row>
                   <Row>
                        <Col sm={3}>
                           <Form.Label>Monto: {this.state.mount}
                           </Form.Label>
                       </Col>
                       <Col sm={3}>
                           <Form.Label>Comisión: {this.state.comission}
                           </Form.Label>
                       </Col>
                       {/* <Col sm={3}>
                           <Form.Label> TOTAL: {this.state.total}
                           </Form.Label>
                       </Col> */}
                   </Row>
                   <Row>
                       <Col sm={12}>
                       <ImageUploader
                            withIcon={false}
                            buttonText='Seleccione una imagen'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.png', '.jpeg']}
                            maxFileSize={5242880}
                        />
                       </Col>
                   </Row>
                   
                   <Row className="row justify-content-between">
                        <Col ms={4}>
                            <Button variant="primary" size="sm" onClick={this.onSave}>
                                Aceptar
                            </Button>
                        </Col>
                        <Col  style={{textAlign: 'right'}}>
                            <Button variant="secondary" size="sm" onClick={this.props.close}>
                                Cancelar
                            </Button>
                        </Col>
                    </Row>
            </div>



        );
    }   
}
