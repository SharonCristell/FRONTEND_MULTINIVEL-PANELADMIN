import React, { PureComponent } from 'react';
import { Form, Table, Button, Modal, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from "react-table";
import logo from '../../images/navologo.png';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import documentsData from "./Documents.json"


import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

const documentList=documentData.documentTypes;


export default class PDFGenerator extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            user: {
                name : "",
                lastname : "",
                gender : "",
                nroDocument : "",
                districtAddress : "",
                address : "",
                username : "",
            },
        }
    }
    componentDidMount() {
        let user = AuthService.getCurrentUserInfo();
        if(user !== undefined){
            let userInfo = {
                name : user.name,
                lastname : user.lastname,
                gender : user.gender,
                nroDocument : user.nroDocument,
                districtAddress : user.districtAddress,
                address : user.address,
                username : user.username
            }
            this.setState({ 
                user: this.state.user = userInfo,
                id: this.state.id = user.id,
                loaded: true
            });
        } else {
            this.setState({ 
                user: this.state.user = {},
                id: this.state.id = 0,
                loaded: false
            });
        }
       
    }

    jsPdfGenerator = () => {

        var doc = new jsPDF();        
      
        var img = new Image;
        img.onload = function () {
            doc.addImage(this, 0, 0);
            doc.save("generated.pdf")
          
        };
        img.crossOrigin = "";
        img.src = logo;

        documentList.map((hotel) => { 
            
            var txt=hotel[1].title
            doc.text(txt, 90, 280)
            doc.setFont('Arial');

        
        })

        doc.save("generated.pdf")      

    }

    getRegister = () => {
        // console.log("hola");
        // Get by id
        let packages = [
            {
                id: 1,
                period: "Certificado",
                update: "24/07/2020",
                comission: 44.25
            },
            {
                id: 2,
                period: "Contrato",
                update: "24/07/2020",
                comission: 44.25
            },
            
        ]

        let tags = <tr></tr>;
        if (packages.length > 0) {
            tags = packages.map((item, idx) => (
                <tr key={idx}>
                    <td>{item.period}</td>
                    <td>
                        <Button variant="info" size="sm" onClick={this.jsPdfGenerator}>Ver Documento</Button>
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
        if (packages.length > 0) {
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
            showModal: true
        });
        console.log(value);
    }
    handleClose = () => {
        this.setState({
            showModal: false
        });
    }
    handleShow = () => {
        this.setState({
            showModal: true
        });
    }

    render() {


        return (
            <div style={{ padding: 30 }}>
                <Table>
                    <thead className="table-head">
                        <tr>
                            <th>Tipo de Documento</th>
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
                    style={{ fontSize: 12 }}>
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