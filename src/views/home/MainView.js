import React, { Component } from 'react'
import { Button, Form, Carousel, Row, Col, Card, Table, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import State from '../../components/home/State';
import Range from '../../components/home/Range';
import RangeNext from '../../components/home/RangeNext';
import UserService from '../../services/user.service';

export default class MainView extends Component  {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            isLoaded : false,
            noData: false,
            objectDash: {}
        }

        this.getDashboard = this.getDashboard.bind(this);
    }

    componentDidMount(){
        this.getDashboard();
    }

    async getDashboard(){
        let dashboard = await UserService.getDashBoard();
        if(dashboard !== undefined && dashboard !== null){
            if(dashboard.status !== 1) {
                console.log(dashboard);
                this.setState({
                    objectDash: this.state.objectDash = {},
                    loading: this.state.loading = false,
                    isLoaded: this.state.isLoaded = false,
                    noData: this.state.noData = true
                });
            } else {
               if(dashboard.objModel.dashboard !== null){
                    this.setState({
                        objectDash: this.state.objectDash = dashboard.objModel.dashboard,
                        loading: this.state.loading = false,
                        isLoaded: this.state.isLoaded = true,
                        noData: this.state.noData = false
                    });
               } else{
                    this.setState({
                        objectDash: this.state.objectDash = {},
                        loading: this.state.loading = false,
                        isLoaded: this.state.isLoaded = false,
                        noData: this.state.noData = true
                    });
               }
                
            }
        }
    }

    render(){
        const{ loading,isLoaded, noData, objectDash} = this.state;
        return(

            <div>
                {loading && <div>
                    <Spinner animation="border" role="status">
                        {/* <span className="sr-only">Cargando...</span> */}
                    </Spinner><p>Cargando ...</p>
                    </div>}
                {isLoaded && 
                    <Row>
                        <Col sm={3}>
                            <State dash={objectDash}></State>
                        </Col>
                        <Col sm={6}>
                            <Range  dash={objectDash}></Range>
                        </Col>
                        <Col sm={3}>
                            <RangeNext  dash={objectDash}></RangeNext>
                        </Col>
                    </Row>
                }
                {noData && 
                <div>
                    <Form.Label>Ocurrió un problema al consultar información de Dashboard</Form.Label>
                
                    <Form.Label>Inténtelo más tarde.</Form.Label>
                    </div>
                }
                </div>
            
        );
    }
}