import React, { Component } from 'react';
import OrganizationChart from "@dabeng/react-orgchart";
import {Form, Row, Col, Card, Table, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../views/styles/Custom.css';
import  { BsFillSquareFill } from 'react-icons/bs';

import  UserService from '../../services/user.service';

export default class NetResidual extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      tree: {},
      stateTree: false,
      loading: true,
      noDataTree: false
    };
  }

  componentDidMount(){
    this.getTree();
  }

  async getTree() {
    if(this.props.type === 'residual') {
      let treeResponse = await UserService.getResidualTree();
      if(treeResponse !== null && treeResponse !== undefined){
        if(treeResponse.status === 1){
          this.setState({
            tree: treeResponse.objModel,
            stateTree: true,
            loading: false,
            noDataTree: false  
          });
        } else {
          this.setState({
            tree: {},
            stateTree: false,
            loading: false,
            noDataTree: true
          });
        }
      } else {
        this.setState({
          tree: {},
          stateTree: false,
          loading: false,
          noDataTree: true
        });
      }
    }
  }


  render() {
    const { tree, stateTree, noDataTree, loading } = this.state;
    // console.log(tree, stateTree, noDataTree, loading);
    return (
      <div>
        {loading && <div>
          <Spinner animation="border" variant="dark">
          </Spinner>
          <p>Cargando árbol residual.</p>
          </div>
        }
        {stateTree && <div>
            <Row>
                <Col>
                    <Form className="box-legend">
                        <BsFillSquareFill color="#9e9e9e"></BsFillSquareFill> <Form.Label>Patrocinados directos</Form.Label><br/>
                        <BsFillSquareFill color="#2c43c3"></BsFillSquareFill> <Form.Label>Socios activos(Pagando la primera cuota en adelate)</Form.Label><br/>
                        <BsFillSquareFill color="#8bc34a"></BsFillSquareFill> <Form.Label>Activo nuevo(A partir de Experience y solo pago cuota inicial)</Form.Label><br/>
                        <BsFillSquareFill color="#f7e123"></BsFillSquareFill> <Form.Label>Stand By y Promotor</Form.Label><br/>
                        <BsFillSquareFill color="#f11e45"></BsFillSquareFill> <Form.Label>Socios con deuda</Form.Label>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <OrganizationChart
                    datasource={tree}
                    options={{direction: "r2l" }}
                    style={{background: 'white'}}
                    />
                </Col>
            </Row>
        </div>
        }
        
        {noDataTree && <Form.Label>No podemos mostrar su red. Consulte acerca de su red.</Form.Label>}
      </div>
      
    );
  }
}
