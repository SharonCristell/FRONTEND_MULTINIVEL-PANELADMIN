import React, { Component } from 'react';
import { Form, Tabs, Tab, Row, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movement from './wallet/Movement';
import Transfer from './wallet/Transfer';
import TransferWallet from './wallet/TransferWallet';
import ReportProblem from './wallet/ReportProblem';
import TransferPayPal from './wallet/TransferPayPal';

import { IoMdAlert } from 'react-icons/io'

export default class Wallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showReport: false
        }
      }
    // Handle modal report problem
    handleClose = (e) => {
        this.setState({
            showReport : false
        });
    }
    handleShow = (e) => {
        e.preventDefault();
        this.setState({
            showReport : true
        });
    }
    sendReport = (e) => {
        alert("reportar problema");
    }
   

    render() {
        return(
            <div style={{padding: 30}}>
                <div className="card-wallet">
                    <p className="title-wallet">Saldo disponible: $ 346.62 | Saldo contable: $ 346.62</p>
                    <p style={{color:'green', fontSize: 12}}>Nota: Los montos están en dólares.</p>
                    <div>
                        <a onClick={(e) => { this.handleShow(e)}}>
                            <p className="text-problem">
                                <IoMdAlert size={16} color={"#d62323"} />
                                Reportar problema</p>
                        </a>
                    
                    </div>
                    
                </div>
                
                
                <Form.Group>
                <Tabs className="custom-tabs-main" defaultActiveKey="comission" >
                        <Tab eventKey="movement" title="Movimientos">
                            <Movement></Movement>
                        </Tab>
                        <Tab eventKey="tranferAccount" title="Transferencia a cuenta">
                            <Transfer></Transfer>
                        </Tab>
                        <Tab eventKey="tranferWalltet" title="Transferencia entre Wallet">
                            <TransferWallet></TransferWallet>
                        </Tab>
                        {/* <Tab eventKey="problem" title="Reportar problemas de Wallet">
                            <ReportProblem></ReportProblem>
                        </Tab> */}
                        <Tab eventKey="transferPayPal" title="Transferencia a Mi PayPal">
                            <TransferPayPal></TransferPayPal>
                        </Tab>
                </Tabs>
                </Form.Group>
                {/* Modal report problem */}
                <Modal show={this.state.showReport} 
                    onHide={this.handleClose}
                    style={{fontSize: 12}}>
                    <Modal.Header closeButton>
                    <Modal.Title>Reportar problema</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReportProblem></ReportProblem>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" size="sm" onClick={(e) => this.sendReport(e)}>
                        Reportar
                    </Button>
                    <Button variant="secondary" size="sm" onClick={(e) => this.handleClose(e)}>
                        Cancelar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}