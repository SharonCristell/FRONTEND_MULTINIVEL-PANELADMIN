import React, { Component } from 'react';
import { Image, InputGroup, Card, Input, Form, Container, Table, Button, Row, Modal, Spinner, Col } from 'react-bootstrap';
import icon1 from '../../images/icons/blue-check.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../utils/Validation';
import UtilService from '../../services/utils.service';
import UserService from '../../services/user.service';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

import '../../views/styles/ModalCustom.css';

import '../../views/styles/ExcelStyle.css';

export default class UploadDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dataLoaded: false,
            isFormInvalid: false,
            rows: null,
            cols: null,
            messageDoc:"",



        }
        this.fileHandler = this.fileHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.openNewPage = this.openNewPage.bind(this);
        this.fileInput = React.createRef();
    }

    renderFile = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    dataLoaded: true,
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });
    }

    fileHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            let fileName = fileObj.name;


            //check for file extension and pass only if it is .xlsx and display error message otherwise
            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedFileName: fileName,
                    isFormInvalid: false,
                    messageDoc:"",
                    
                });
                this.renderFile(fileObj)
            }
            else {
                this.setState({
                    isFormInvalid: true,
                    uploadedFileName: "",                   
                    messageDoc:"El archivo ingresado no es válido. Por favor, ingrese un archivo xlsx."
                })
            }
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
    }

    openNewPage = (chosenItem) => {
        const url = chosenItem === "github" ? "https://github.com/ashishd751/react-excel-renderer" : "https://medium.com/@ashishd751/render-and-display-excel-sheets-on-webpage-using-react-js-af785a5db6a7";
        window.open(url, '_blank');
    }


    render() {
        
        return (
            <div className="panel-form">
                <Container>
                    <Form>

                        <Form.Label>Subir archivo bancario *</Form.Label>

                        <Col xs={4} sm={8} lg={10}>
                            <Form.Group>


                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Button color="info" style={{ color: "white", zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Subir Archivo&hellip;</Button>


                                        <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                                     
                                    </InputGroup.Prepend>
                                   
                                   
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={this.state.uploadedFileName}                                        
                                        isValid={!this.state.isFormInvalid} 
                                    />
                                   
                                </InputGroup>
                                <InputGroup>
                                    <Form.Text style={{ fontWeight: "bold", fontSize:"12px"}} className="textAlert">{this.state.messageDoc}</Form.Text>
                                    </InputGroup>
                            </Form.Group>
                        </Col>

                    </Form>

                    {this.state.dataLoaded &&
                        <div>
                            <Card body outline color="secondary" className="restrict-card">

                                <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />

                            </Card>
                        </div>}
                </Container>
            </div>
        );
    }

}