import React, { Component } from "react";
import { Message } from "semantic-ui-react";

class NotProvider extends Component {
  constructor() {
    super();
  }

  render() {
    const textErr = 'Para poder jugar el juego debes tener una billetera instalada y una cuenta activa!';
    return (
      <div>
        <Message icon="thumbs down" error header="Atención!" content={textErr} />
      </div>
    );
  }
}

export default NotProvider;
