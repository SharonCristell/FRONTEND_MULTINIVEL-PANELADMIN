import React, { Component } from 'react';
import OrganizationChart from "@dabeng/react-orgchart";
import {Form, Carousel, Row, Col, Card, Table, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../views/styles/Custom.css';

import  UserService from '../../services/user.service';

export default class NetComponent extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      tree: {},
      stateTree: false,
      loading: true,
      noDataTree: false,
      noDataMessage: ''
    };
  }

  componentDidMount(){
    this.getTree();
  }

  async getTree() {
    let treeResponse = await UserService.getPatrocinioTree();
    if(treeResponse !== null && treeResponse !== undefined){
      if(treeResponse.status === 1){
        this.setState({
          tree: this.state.tree = treeResponse.objModel,
          stateTree: this.state.stateTree = true,
          loading: this.state.loading = false,
          noDataTree: this.state.noDataTree = false,
          noDataMessage: this.state.noDataMessage = ''
        });
      } else {
        this.setState({
          tree: {},
          stateTree: this.state.stateTree = false,
          loading: this.state.loading = false,
          noDataTree: this.state.noDataTree = true,
          noDataMessage: this.state.noDataMessage = 'No podemos mostrar su red. Consulte acerca de su red.'
        });
      }
    } else {
      this.setState({
        tree: {},
        stateTree: this.state.stateTree = false,
        loading: this.state.loading = false,
        noDataTree: this.state.noDataTree = true,
        noDataMessage: this.state.noDataMessage = 'No podemos mostrar su red. Consulte acerca de su red.'
      });
    }
    
  }
 

  render() {
    const { tree, stateTree, loading, noDataTree, noDataMessage } = this.state;
    
    return (
      <div>
        {loading &&
           <div>
           <Spinner animation="border" variant="dark">
           </Spinner>
           <p>Cargando árbol de patrocinio.</p>
           </div>}
        {stateTree && <Row>
          <Col sm={12}>
          <OrganizationChart
          datasource={tree}
          options={{direction: "r2l" }}
          style={{background: 'white'}}
          />
            </Col>
          </Row>}
        {noDataTree && <Form.Label>{noDataMessage}</Form.Label>}
      </div>
      
    );
  }
}
