import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
// import Car from "../assets/img/car.jpg";
// import Spinner from "./Spinner";

 const CLIENT = {
   sandbox:
     'AXqwjkzSY3CvBS6XQmsKRw-d3wQRY-2MT_9GAFyP8K3W8-WAD2Fzpnm0TjVQQFMHmvKj0sZMOHFt2Vw_',
   production:
     "your_production_key"
 };

 const CLIENT_ID = CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
      error: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {

    let objItem = {
        purchase_units: [
          {
            description: this.props.description,
            amount: {
              currency_code: "USD",
              value: Number(this.props.mount)
            }
          }
        ]
      };
    // console.log(objItem);
    return actions.order.create(objItem);
  };

  onApprove = (data, actions) => {
    // console.log(actions.order);
    actions.order.capture().then(details => {
      if(details.error !== undefined) {
        this.setState({ showButtons: false, paid: false, error: true });
        if(this.props.eventPay) {
          this.props.eventPay(false, "isPaid");
        }
      } else {
        

        const paymentData = {
          payerID: data.payerID,
          orderID: data.orderID,
          details: details
        };
        // console.log("Payment Approved: ", paymentData);
        this.setState({ showButtons: false, paid: true, error: false });
        if(this.props.eventPay) {
          this.props.eventPay(true, "isPaid");
          this.props.eventPay(this.props.mount, "mountPaid");
          this.props.eventPay(paymentData.details.create_time, "creationDate");
          this.props.eventPay(paymentData.details.update_time, "modificationDate");
          this.props.eventPay(paymentData.details.id, "idTransaction");
          this.props.eventPay(paymentData.details.intent, "intent");
          this.props.eventPay(paymentData.details.status, "status");
        }
      }
      
    });
  };

  onCancel = (data) => {
    console.log(data);
    if(this.props.eventPay) {
      this.props.eventPay(false, "isPaid");
    }
    
  };

  render() {
    const { showButtons, loading, paid, error } = this.state;

    return (
      <div className="main">
        {/* {loading && <Spinner />} */}

        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
              onCancel={(data) => this.onCancel(data)}
            />
          </div>
        )}

        {paid && (
          <div className="main">
              Su pago ha sido registrado con éxito.
          </div>
        )}

        {error && (
          <div className="main">
              Su pago no ha sido procesado. Inténtelo más tarde.
          </div>
        )}
      </div>
    );
  }
}


 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
