import React, { Component } from 'react';
import MailUser from '../../components/mailing/MailUser';

export default class BasicOperationView extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="panel-form">
                <MailUser></MailUser>
            </div>
            
        );
    }
}