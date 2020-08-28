import React, { Component } from 'react';
import OrganizationChart from "@dabeng/react-orgchart";
import {Form, Carousel, Row, Col, Card, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Custom.css';

export default class TreeView extends Component {
    
  constructor() {
    super();
    this.state = {
      ds: {
        id: "1",
        name: "Lao Lao",
        title: "general manager",
        children: [
          { id: "2", name: "Bo Miao", title: "department manager" },
          {
            id: "3",
            name: "Su Miao",
            title: "department manager",
            children: [
              { id: "4", name: "Tie Hua", title: "senior engineer" },
              {
                id: "5",
                name: "Hei Hei",
                title: "senior engineer",
                children: [
                  { id: "6", name: "Dan Dan", title: "engineer" },
                  { id: "7", name: "Xiang Xiang", title: "engineer" }
                ]
              },
              { id: "8", name: "Pang Pang", title: "senior engineer" }
            ]
          },
          {
            id: "10",
            name: "Chun Miao",
            title: "department manager",
            children: [{ id: "11", name: "Yue Yue", title: "senior engineer" }]
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
          <OrganizationChart
          datasource={this.state.ds}
          options={{direction: "r2l" }}
          style={{background: 'white'}}
        />
          </Col>
        </Row>
      </div>
      
    );
  }
}
