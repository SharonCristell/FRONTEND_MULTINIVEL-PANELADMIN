import React, { Component } from 'react';
import { Form, Row , Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserService from '../../services/user.service';

export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            account: {
                accountSoles: "2323",
                accountInterSoles: "",
                accountDolars: "",
                accountInterDolars: "",
            },
            exchange: ""
        }
    }

    componentDidMount(){
        this.getInformationAccount();
    }

    async getInformationAccount(){
        let account = await UserService.getInformationAccount();
        if(account != null){
            this.setState({account: account});
        }
    }

    render() {
        const { account, exchange} = this.state;
        return(
            <div className="modal-custom">
                <Form>
                    <Form.Group >
                        <Form.Label>Cuenta bancaria en soles: </Form.Label>
                        <Form.Text>{account.accountSoles}</Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Cuenta interbancaria en soles: </Form.Label>
                        <Form.Text>{account.accountInterSoles}</Form.Text>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group >
                        <Form.Label>Cuenta bancaria en dólares: </Form.Label>
                        <Form.Text>{account.accountDolars}</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cuenta interbancaria en dólares: </Form.Label>
                        <Form.Text>{account.accountInterDolars}</Form.Text>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Form.Label>Tipo de cambio: </Form.Label>
                        <Form.Text>{exchange}</Form.Text>
                    </Form.Group>
                    
                </Form>
            </div>
        );
    }
}