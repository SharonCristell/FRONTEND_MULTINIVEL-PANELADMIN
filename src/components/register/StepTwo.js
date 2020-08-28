import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import UtilService from '../../services/utils.service';

// Step 2: Datos de contacto
export default class StepTwo extends Component {

    constructor(props){
        super(props);
        this.state =  {
            idResidenceCountry: -1,
            residenceList: [],
            typeDocuments: []
        }

        this.getResidences = this.getResidences.bind(this);
        
    }

    componentDidMount(){
        
        this.getResidences();
    }

    async getResidences () {
        console.log("Load data");
        let response = await UtilService.getResidences();
        if(response !== null && response !== undefined){
            
            let  objs = response.objModel
                let residences = [];
                objs.forEach( elem => {
                    residences.push(<option key={elem.idCountry} value={elem.idCountry}>{elem.name}</option>);
                });
                this.setState({ 
                    residenceList: this.state.residenceList =  residences});
        }
      
    }

    handleChange = (e, field) => {
        // console.log('step one');
        // console.log(field, ": ",  e.target.value);
        // this.setState({ [field]: e.target.value }, () => {
        var value = e.target.value;
        if (this.props.onChange) {
            this.props.onChange(value, field);
        }
        // })
    };

    handleSelect = (e, field) => {
        // console.log(e.target.value, field);
        // this.setState({ [field]: e.target.value }, console.log(e.target.value));
        // if (this.props.onChange) {
        //     this.props.onChange(e.target.value, field);
        //   }
        var value = e.target.value;
        this.setState({ [field]: value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value, field);
            }
        })

    };
    /**
     *TODO Evlate if it is applicated from parent component
     * To control if the fields are completed.
     * @param {*} event 
     */
    handleSummit = (event) => {
        console.log(event);
    }

    render () {
        
        const { residenceList } = this.state;

        return (
            <div >
                <Form.Label className="content-subtitle">Datos del contacto</Form.Label>
                
                <Form.Group controlId="formStepTwo">
                    <Form.Group>
                        <Form.Label>Correo electrónico *</Form.Label>
                        <Form.Control required type="email" placeholder="Correo electrónico" 
                                       onChange={e => this.handleChange(e, "email")}></Form.Control>
                        <Form.Control.Feedback type="invalid">Ingrese un correo eletrónico válido.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>País de residencia *</Form.Label>
                        <Form.Control as="select" defaultValue={'DEFAULT'}
                            onChange={e => this.handleSelect(e, "idResidenceCountry")}>
                            <option value="DEFAULT" disabled>Seleccione una opción</option>
                            {residenceList}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Distrito / Estado *</Form.Label>
                        <Form.Control required type="text" placeholder="Distrito"
                                        onChange={e => this.handleChange(e, "districtAddress")}></Form.Control>
                        <Form.Control.Feedback type="invalid">Ingrese su distrito.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control required type="text" placeholder="Dirección"
                                        onChange={e => this.handleChange(e, "address")}></Form.Control>
                        <Form.Control.Feedback type="invalid">Ingrese su dirección.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nro. Celular *</Form.Label>
                        <Form.Control required type="text" placeholder="Nro. celular"
                                        onChange={e => this.handleChange(e, "phone")}></Form.Control>
                        <Form.Control.Feedback type="invalid">Ingrese un número de celular válido.</Form.Control.Feedback>
                    </Form.Group>
                    
                </Form.Group>
            </div>
        );
    }
}