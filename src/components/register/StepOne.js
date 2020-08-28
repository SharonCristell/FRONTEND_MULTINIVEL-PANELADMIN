import React, { Component, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import DatePicker from 'react-bootstrap-date-picker

import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';

const civilStateKey = "Casado"; // casado

// Datos personales
export default class StepOne extends Component {
    
    constructor(props){
        super(props);
        this.state =  {
            gender:'',
            idNationality: -1,
            idDocumentType: -1,
            nroDocument : '',
            conroDocument : '',
            civilState : '',
            nationalities: [],
            typeDocuments: [],
            showRegister: 'none',
            messageDoc: "",
            messageDocCo:"",
        }

        this.getCountries = this.getCountries.bind(this);
    }
    
    componentDidMount(){
        console.log("Load data");
        this.getCountries();
    }

    // Get list of countries
    async getCountries() {
        
        let response = await UtilService.getResidences();
        if(response !== null && response !== undefined){
            
            let  objs = response.objModel
                let residences = [];
                objs.forEach( elem => {
                    residences.push(<option key={elem.idCountry} value={elem.idCountry}>{elem.name}</option>);
                });
                this.setState({ 
                    nationalities: this.state.nationalities =  residences});
        }

    }
    

    async createItemTypes() {
        var id = this.state.idNationality;
        
        if(id > 0) {
            let response = await UtilService.getTypeDocByNat(id);
            if(response !== null && response !== undefined){
                
                let data = response.objModel;
                let items = [];
                data.forEach( elem => {
                    
                    items.push(<option key={elem.id} value={elem.id}>{elem.name}</option>);
                        
                });
                
                this.setState({ typeDocuments: items });
                this.forceUpdate();
                    
            }
            
        }

    }

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
    handleSelect = (e, field) => {
        // console.log(e.target.value, field);
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        })
        
        if(field == "idNationality") {
            this.setState({
                idNationality: this.state.idNationality = value
            });
            this.createItemTypes();
        }

    };
    
    handleCivilState = (e, field) => {
        console.log(e.target.value, field);
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        });
        if(value === civilStateKey) {
            this.setState({  
                showRegister: this.state.showRegister = 'block'
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(true, 'coafiliate');
                }
            });
        } else {
            this.setState({
                showRegister: this.state.showRegister = 'none',
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(false, 'coafiliate');
                }
            });
        }
        
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
        // this.setState({ [field]: e.target.value }, console.log(e.target.value))
    };

    /**
     * Method to handle the change  of properties and send it to parent 
     * @param {*} e 
     * @param {*} field 
     */
    handledate = (e, field) => {
        // console.log(e.target.value);
        if (this.props.onChange) {
            this.props.onChange(e.target.value, field);
          }
        
    };
    
    // Verify nro Document
    onBlurDocument = (e, field, fieldMessage) => {
        console.log(e);
        this.verifyDocument(field, fieldMessage);
        
    }

    async verifyDocument(field, fieldMessage){

        let data = {};
        data.nroDocument =  this.state[field];

        let isRegister = await UserService.isDocumentRegistered(data);

        if(!isRegister) {
            this.setState({ [fieldMessage]: "" });
            this.forceUpdate();
        } else {
            this.setState({ [fieldMessage]: "Este documento ya ha sido registrado." });
            this.props.onChange('', field);
            this.forceUpdate();
        }
    }
    render() {
       
        return (
            <div>
                <Form.Label className="content-subtitle">Datos personales</Form.Label>
                
                <Form.Group controlId='formStepOne'>
                    <Form.Group>
                        <Form.Label>Nombres *</Form.Label>
                        <Form.Control required type="text" placeholder="Nombres"
                            onChange={e => this.handleChange(e, "name")} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellidos *</Form.Label>
                        <Form.Control required type="text" placeholder="Apellidos" 
                            onChange={e => this.handleChange(e, "lastname")}/>
                    </Form.Group>
                    <Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Fecha de nacimiento *</Form.Label>
                        <Form.Control type="date" 
                            onChange={e => this.handledate(e, "birthdate")}></Form.Control>
                    </Form.Group>
                        
                    <Form.Group>
                        <Form.Label>Sexo *</Form.Label>
                        <div key={'inline-radio'} className="mb-3">
                            <Form.Check inline label="Masculino" type='radio' id={`inline-radio`} value="M"
                                onChange={e => this.handleRadio(e, "gender")}
                                checked={this.state.gender === "M"}/>
                            <Form.Check inline label="Femenino" type='radio' id={`inline-radio2`} value="F"
                                onChange={e => this.handleRadio(e, "gender")}
                                checked={this.state.gender === "F"}/>
                        </div>
                    </Form.Group>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nacionalidad *</Form.Label>
                        <Form.Control as="select" defaultValue={'DEFAULT'}
                            onChange={e => this.handleSelect(e, "idNationality")}>
                            <option value="DEFAULT" disabled>Seleccione una opción</option>
                            {this.state.nationalities}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipo de documento *</Form.Label>
                        <Form.Control as="select" defaultValue={'DEFAULT'}
                            onChange={e => this.handleSelect(e, "idDocumentTypeCountry")}>
                            <option value="DEFAULT" disabled>Seleccione una opción</option>
                            {this.state.typeDocuments}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nro. de documento *</Form.Label>
                        <Form.Control required type="text" placeholder="Nro. documento"
                            onChange={e => this.handleChange(e, "nroDocument")}
                            onBlur={e => this.onBlurDocument(e, "nroDocument", "messageDoc")}></Form.Control>
                        <Form.Text className="textAlert">{this.state.messageDoc}</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Estado Civil *</Form.Label>
                        <Form.Text></Form.Text>
                        <Form.Control as="select" defaultValue={'DEFAULT'}
                            onChange={e => this.handleCivilState(e, "civilState")}>
                            <option value="DEFAULT" disabled>Seleccione una opción</option>
                            <option value="Soltero" >Soltero</option>
                            <option value="Casado">Casado</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group style={{display:this.state.showRegister}}>
                        {/* <RegisterBeneficiary ></RegisterBeneficiary> */}
                        <hr></hr>
                        <Form.Label className="content-subtitle">Co-Solicitante</Form.Label>
                
                        <Form.Group>
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control placeholder="Nombres"
                                onChange={e => this.handleChange(e, "coname")}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control placeholder="Apellidos"
                                onChange={e => this.handleChange(e, "colastname")}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo de documento *</Form.Label>
                            <Form.Control as="select" defaultValue={'DEFAULT'}
                                onChange={e => this.handleSelect(e, "coidDocumentTypeCountry")}>
                                <option value="DEFAULT" disabled>Seleccione una opción</option>
                                {this.state.typeDocuments}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nro. de documento</Form.Label>
                            <Form.Control placeholder="Nro. de documento"
                                onChange={e => this.handleChange(e, "conroDocument")}
                                onBlur={e => this.onBlurDocument(e, "conroDocument", "messageDocCo")}></Form.Control>
                                <Form.Text className="textAlert">{this.state.messageDocCo}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de nacimiento *</Form.Label>
                            <Form.Control type="date"
                                onChange={e => this.handledate(e, "cobirthdate")}></Form.Control>
                        </Form.Group>
                    </Form.Group>
                </Form.Group>
            </div>
        );
    }
}