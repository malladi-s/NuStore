import React from "react";
import "./Compose.css";

export default class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.props.submitMessage(this.state.message);
      this.setState({ message: "" });
    }
  }

  render() {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.keyPressed}
        />
      </div>
    );
  }
}
