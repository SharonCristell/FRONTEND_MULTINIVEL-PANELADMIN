import  React, { Component } from 'react';
import { Button, Form, Spinner, 
        Table, Accordion, Card, 
        InputGroup, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import UtilService from '../../services/utils.service';

export default class StepThree extends Component {
    constructor(props){
        super(props);
        this.state = {
            package: [],
            packages: [],
            checkList: [],
            packageFamily: [],
            loading: true,
            noData: false,
            message: ''
        }
        
        this.getPackageFamily = this.getPackageFamily.bind(this);
    }

    /**
     * Execute befores renderer 
     * Get packages
     */
    componentDidMount(){
        this.getPackageFamily();
    }

    async getPackageFamily(){
        
        let data = await UtilService.getPackages();
        if(data !== undefined){
            if(data.length > 0){
                this.setState({
                    packageFamily: data,
                    loading: false,
                    noData: false
                });
            } else {
                this.setState({
                    packageFamily: [],
                    loading: false,
                    noData: true,
                    message: "No hay registros para mostrar."
                });
            }
        } else {
            this.setState({
                packageFamily: [],
                loading: false,
                noData: true,
                message: "Ocurrió un error al obtener los paquetes. Vuelva a intentarlo más tarde."
            });
        }
       
    }

    // Handle teh selection of radio butoon bys package family
    // The selection by package is unique
    // Id of family represent the position in the array
    handleSelection = (e, field) => {
        console.log(e.target.id);
        var idField = e.target.id;
        
        this.setState({ packages: [idField] }, () => {
            if (this.props.onChange) {
                this.props.onChange([idField], "packages");
            }
        })
        
        // console.log(this.state.checkList)
        
    };


    render() {
       
        const packageFamily =  this.state.packageFamily;
        const loading = this.state.loading;
        const noData = this.state.noData;
        const message = this.state.message;

        return (
            <div>
                <Form.Label className="content-subtitle">Paquetes de inscripción</Form.Label>
                {loading &&
                    <div style={{textAlign: 'center'}}>
                        <Spinner animation="border" role="status"  size="sm" >
                            <span className="sr-only">Loading...</span>
                        </Spinner> <Form.Label>Cargando información de paquetes...</Form.Label>
             
                    </div>
                }
                {!loading && !noData &&
                    <Form.Group controlId="formStepThree">
                        <Form.Group>
                            <Accordion>
                            {packageFamily.map((item , i) => (
                                <Card key={i}>
                                    <Card.Header>
                                    <Accordion.Toggle  as={Button} variant="link" eventKey={i} style={{fontWeight:'bold', fontSize: 14}}>
                                    {item.name}
                                    </Accordion.Toggle> 
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={i}>
                                    <Card.Body>
                                        <Table className="tableCustom" striped bordered hover responsive="md" size="sm">
                                            <thead>
                                                <tr>
                                                    {/* <th></th>
                                                    {
                                                        item.headers.map((header, id) => (
                                                        <th>{header}</th>
                                                        ))
                                                    } */}
                                                    <th></th>
                                                    <th>Nombre</th>
                                                    <th>Descripción</th>
                                                    <th>Precio</th>
                                                    <th>Número de cuotas</th>
                                                    <th>Cuota  inicial</th>
                                                    {/* <th>Duración</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.packages.map((itempck)  =>(
                                                        <tr key={itempck.id}>
                                                            <td>
                                                                <Form.Check inline type='radio' 
                                                                    name="packages"
                                                                    id={itempck.id}
                                                                    onChange={e => this.handleSelection(e)} />
                                                                
                                                            </td>
                                                            <td>{itempck.name}</td>
                                                            <td>{itempck.description}<br></br>
                                                                Duración: {itempck.duration}
                                                                {/* <ul>
                                                                    {
                                                                        itempck.descriptions.map((label, idxLabel) => (
                                                                        <li>{label}</li>
                                                                        ))
                                                                    }
                                                                </ul> */}
                                                            </td>
                                                            <td>{itempck.price}</td>
                                                            <td>{itempck.quotes}</td>
                                                            <td>{itempck.initialPrice}</td>
                                                            {/* <td>{itempck.duration}</td> */}
                                                        </tr>
                                                    ))
                                                    
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            ))
                            }
                            </Accordion>
                        </Form.Group>
                    </Form.Group>
                }
                {noData && 
                    <div>
                        <Form.Label>{message}</Form.Label>
                    </div>
                }
                
            </div>
        );
    }
}