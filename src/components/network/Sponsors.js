import React, { Component } from 'react';
import { Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../utils/Validation';
import UserService from '../../services/user.service';


export default class Sponsor extends Component {

    constructor(props){
        super(props);
        this.state = {
            sponsors: [],
            emptyList: true,
            message: "No hay registros para mostrar.",
            loading: false,
            date: "04 de agosto del 2020"
        }

        this.getRegister = this.getRegister.bind(this);
    }

    componentDidMount() {
        this.getRegister();
    }

    async getRegister() {
        let response = await UserService.getSponsors();
        if(response !== undefined && response !== null){
            if(response.status !== 1) {
                console.log(response);
                this.setState({
                    sponsors: this.state.sponsors = [],
                    emptyList: this.state.emptyList = true,
                    message: this.state.message = "Se ha producido un error. Inténte más tarde."
                });
            } else {
                if(response.objModel.length > 0){
                    this.setState({
                        sponsors: this.state.sponsors = response.objModel,
                        emptyList: this.state.emptyList = false,
                        message: this.state.mesagge = ""
                    });
                } else {
                    this.setState({
                        sponsors: this.state.sponsors = [],
                        emptyList: this.state.emptyList = true,
                        message: this.state.mesagge = "No hay registros para mostrar."
                    });
                }
               
            }
        }
        

    }

    render(){

        return(
            <div style={{padding: 30}}>
                <Form.Group>
                    <p>Información actualizada al: <b>{this.state.date}</b></p>
                </Form.Group>
                <Table responsive>
                    <thead className="table-head">
                        <tr>
                            <th>N° Socio</th>
                            <th>F. Afiliación</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Rango</th>
                            <th>Estado</th>
                            <th>Nivel Patrocinio</th>
                            <th>Nivel Residual</th>
                            <th>Rama</th>
                            <th>Patrocinador</th>
                            <th>Monto cuota</th>
                            <th>Puntos de Equipo</th>
                            <th>Activo hasta</th>
                            <th>Punto individuales</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {   this.state.emptyList && <tr>
                            <td colSpan="6"><Form.Label>{this.state.message}</Form.Label></td>
                            </tr>}
                        {   !this.state.emptyList && this.state.sponsors.map(function(item) {
                                let date = "";
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id} </td>
                                            <td>{Validation.convertDate(new Date(item.affiliateDate))}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.name} {item.lastname}</td>
                                            <td>{item.nroDocument}</td>
                                            <td>rango</td>
                                            <td>{item.stateText}</td>
                                            <td>nivel</td>
                                            <td>{item.nivelResidual}</td>
                                            <td>{item.rama}</td>
                                            <td>{item.nameSponsor}</td>
                                            <td>S./ {item.cuotaSoles}</td>
                                            <td>{item.nameSponsor} {item.lastnameSponsor}</td>
                                            <td>equipo</td>
                                            <td>{Validation.convertDate(new Date(item.activoHasta))}</td>
                                            <td>puntos</td>
                                        </tr>
                                    )
                                })

                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}