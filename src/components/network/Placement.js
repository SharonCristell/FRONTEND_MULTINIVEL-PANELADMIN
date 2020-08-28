import React, { Component } from 'react';
import { Form, Table, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Autosuggest from 'react-autosuggest';

import Validation from '../utils/Validation';
import UserService from '../../services/user.service';


export default class Placement extends Component {

    constructor(props){
        super(props);
        this.state = {
            registers: [],
            suggestions: [],
            value: '',
            loadRegisters: false,
            loading: true,
            noData: false,
            noDataMesssage: false,
            
        }

        this.getRegister = this.getRegister.bind(this);
        
    }

    componentDidMount() {
        this.getRegister();
    }

    async getRegister() {
        let response = await UserService.getRegPlacement();
        if(response !== undefined && response !== null){
            if(response.status !== 1) {
                console.log(response);
                this.setState({
                    registers: this.state.registers = [],
                    loading: this.state.loading = false,
                    loadRegisters: this.state.loadRegisters = true,
                    noData: this.state.noData = true,
                    noDataMesssage : this.state.noDataMessage = "Ocurrió un problema mientras obteniamos los registros. Inténtelo más tarde.",
                });
            } else {
                if(response.objModel.length > 0) {
                    this.setState({
                        registers: this.state.registers = response.objModel,
                        loading: this.state.loading = false,
                        loadRegisters: this.state.loadRegisters = true,
                        noData: this.state.noData = false,
                        noDataMesssage : this.state.noDataMessage = "",
                    });
                } else {
                    this.setState({
                        registers: this.state.registers = response.objModel,
                        loading: this.state.loading = false,
                        loadRegisters: this.state.loadRegisters = false,
                        noData: this.state.noData = true,
                        noDataMesssage : this.state.noDataMessage = "No hay registros para mostrar.",
                    });
                }
               
            }
        }
        

    }

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

    onSuggestionsFetchRequested = async({ value }) => {
        let response = await UserService.getUpLiner(1);

        if(response.status === 1) {
            this.setState({
                suggestions: this.getSuggestions(value, response.objModel)
                });
        } else {
            this.setState({
                suggestions: []
                });
        }
        
    };

    
    renderSuggestion = suggestion => (
        <div>
          {suggestion.name}
        </div>
      );

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };
    
    getSuggestionValue = (suggestion) => {
        console.log(suggestion)
    }

    getSuggestions = (value, listReponse) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : listReponse.filter(lang =>
          lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
      };

    render() {
        const {  registers, suggestions, value, loadRegisters, loading, noData, noDataMesssage} = this.state;
       
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
        placeholder: 'Type a programming language',
        value,
        onChange: this.onChange
        };
        return(
            <div style={{padding:30}}>
                <Table responsive>
                    <thead className="table-head">
                        <tr>
                            <th>Nombres</th>
                            <th>Fecha</th>
                            <th>Tipo de Membresía</th>
                            <th>Estado</th>
                            <th>Upliner</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { loading &&
                            <tr>
                                <td>
                                    <div>
                                        <Spinner animation="border" variant="dark">
                                        </Spinner>
                                        <p>Cargando registros...</p>
                                    </div>
                                </td>
                            </tr>
                        }
                        { loadRegisters &&
                            (this.state.registers.map(function(item) {
                                let date = "";
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>text</td>
                                            <td>text</td>
                                            <td>text</td>
                                            <td>
                                                <Autosuggest
                                                    suggestions={suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                    getSuggestionValue={this.getSuggestionValue}
                                                    renderSuggestion={this.renderSuggestion}
                                                    inputProps={this.inputProps}
                                                />
                                            </td>
                                            <td>
                                               <Button variant="info" size="sm">Posicionar</Button>
                                            </td>
                                        </tr>
                                    )
                                }))
                        }
                        {noData && 
                        <tr>
                            <td colSpan="6">
                                    <Form.Label>{noDataMesssage}</Form.Label>
                            </td>
                        </tr>
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}