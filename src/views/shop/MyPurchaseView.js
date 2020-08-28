import React, { Component } from 'react';
import { Form, Table, Button, Modal, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from "react-table";

import Pagination from '../../components/utils/Pagination';
import { makeData } from "../../components/utils/utils";
export default class MyPurchaseView extends Component {

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
        }
    }

    getRegister = () => {
        // console.log("hola");
        // Get by id
        let packages = [
            {
                id: 1,
                period: "Upgrade EXPERIENCE",
                update: "15/06/2020",
                comission: 100
            },
            {
                id: 2,
                period: "Nuevo GOLDEN",
                update: "20/06/2020",
                comission: 200
            },
            {
                id: 3,
                period: "Servicio 1",
                update: "14/07/2020",
                comission: 300
            },
            {
                id: 4,
                period: "Servicio 2",
                update: "24/07/2020",
                comission: 400
            },
            {
                id: 5
                
                
                
                ,
                period: "Servicio 3",
                update: "29/07/2020",
                comission: 500
            }
        ]
        
        let tags = <tr></tr>;
        if(packages.length > 0) {
            tags = packages.map((item, idx) =>(
                <tr key={idx}>
                    <td>{item.period}</td>
                    <td>{item.update}</td>
                    <td>$ {item.comission}</td>
                    <td>
                        <Button variant="info" size="sm" onClick={e => this.onclickResumen(e, item.id)}>Resumen</Button>
                    </td>
                </tr>
            ));

        }
        
        return tags;
    }

    getResumen = () => {
        // console.log("hola");
        // Get by id
        let packages = [
            {
                id: 1,
                name: "Dana Carolina Rodriguez",
                typeComission: "Bono de Recomendación de Equipo",
                Level: 5,
                date: "15/07/2020",
                points: 85.00,
                percent: 3.00,
                mount: 2.55,
                perState: "SI",
                PerLevel: "SI"

            },
            {
                id: 1,
                name: "Dana Carolina Rodriguez",
                typeComission: "Bono de Recomendación de Equipo",
                Level: 5,
                date: "15/07/2020",
                points: 85.00,
                percent: 3.00,
                mount: 2.55,
                perState: "SI",
                PerLevel: "SI"
            },
            {
                id: 1,
                name: "Dana Carolina Rodriguez",
                typeComission: "Bono de Recomendación de Equipo",
                Level: 5,
                date: "15/07/2020",
                points: 85.00,
                percent: 3.00,
                mount: 2.55,
                perState: "SI",
                PerLevel: "SI"
            },
            {
                id: 1,
                name: "Dana Carolina Rodriguez",
                typeComission: "Bono de Recomendación de Equipo",
                Level: 5,
                date: "15/07/2020",
                points: 85.00,
                percent: 3.00,
                mount: 2.55,
                perState: "SI",
                PerLevel: "SI"
            },
            {
                id: 1,
                name: "Dana Carolina Rodriguez",
                typeComission: "Bono de Recomendación de Equipo",
                Level: 5,
                date: "15/07/2020",
                points: 85.00,
                percent: 3.00,
                mount: 2.55,
                perState: "SI",
                PerLevel: "SI"
            }
        ]
        
        let tags = <tr></tr>;
        if(packages.length > 0) {
            tags = packages.map((item, idx) =>
                <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.typeComission}</td>
                    <td>{item.Level}</td>
                    <td>{item.date}</td>
                    <td>{item.points}</td>
                    <td>{item.percent}</td>
                    <td>$ {item.mount}</td>
                    <td>{item.perState}</td>
                    <td>{item.PerLevel}</td>
                </tr>
            );

        }
        
        return tags;
    }
    // Handle modal 
    onclickResumen = (e, value) => {
        e.preventDefault();
        this.setState({
            showModal : true
        });
        console.log(value);
      }
    handleClose = () => {
        this.setState({
            showModal : false
        });
    }
    handleShow= () => {
        this.setState({
            showModal : true
        });
    }

    render() {
        return(
            <div style={{padding:30}}>
                <Table responsive>
                    <thead className="table-head">
                        <tr>
                            <th>Producto o Servicio</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRegister()}
                    </tbody>
                </Table>
                {/* Modal */}
                <Modal 
                    show={this.state.showModal} 
                    onHide={this.handleClose}
                    size="lg"
                    style={{fontSize:12}}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Table responsive>
                            <thead className="table-head">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Tipo de Comisión</th>
                                    <th>Nivel</th>
                                    <th>Fecha</th>
                                    <th>Puntos</th>
                                    <th>Porcentage</th>
                                    <th>Monto</th>
                                    <th>Por Estado</th>
                                    <th>Por Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getResumen()}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.handleClose}>
                        Cerrar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}