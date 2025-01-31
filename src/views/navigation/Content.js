import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "../navigation/NavBar";

class Content extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />
      </Container>
    );
  }
}

export default Content;