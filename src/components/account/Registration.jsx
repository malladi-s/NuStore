import React from "react";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField
} from "availity-reactstrap-validation";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      img: "",
      phone: "",
      username: "",
      about: ""
    };
  }

  // Put everything together and send it up to the register function
  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { registerFunction } = this.props;
    const formData = this.state;
    registerFunction(formData);
  }

  handleInputChange(e) {
    if (e.target.type == "file") {
      this.setState({ [e.currentTarget.id]: e.target.files[0].name });
    } else {
      this.setState({ [e.currentTarget.id]: e.target.value });
    }
  }

  render() {
    return (
      <div className="row justify-content-center mt-3">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <AvForm className="Reg" onValidSubmit={this.handleValidSubmit}>
            <AvGroup>
              <Label for="email">Email</Label>
              <AvInput
                id="email"
                name="email"
                onChange={this.handleInputChange}
                placeholder="user@domain.com"
                required
                type="email"
                value={this.state.email}
              />
              <AvFeedback>A valid email is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="password">Password</Label>
              <AvInput
                id="password"
                minLength="8"
                name="password"
                onChange={this.handleInputChange}
                placeholder="password"
                required
                type="password"
                value={this.state.password}
              />
              <AvFeedback>
                Passwords must be at least eight characters in length
              </AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="username">Username</Label>
              <AvInput
                id="username"
                name="username"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="CaptainCode"
                required
                type="text"
                value={this.state.username}
              />
              <AvFeedback>A username is required to register</AvFeedback>
            </AvGroup>

            <AvField
              id="phone"
              name="telephone"
              label="Phone"
              type="tel"
              required
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />

            <AvGroup>
              <Label for="firstName">First Name</Label>
              <AvInput
                id="firstName"
                name="firstName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Jamie"
                required
                type="text"
                value={this.state.firstName}
              />
              <AvFeedback>A first name is required to register</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="lastName">Last Name</Label>
              <AvInput
                id="lastName"
                name="lastName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Smith"
                required
                type="text"
                value={this.state.lastName}
              />
              <AvFeedback>A last name is required to register</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="about">About</Label>
              <AvInput
                id="about"
                name="about"
                onChange={this.handleInputChange}
                placeholder="Tell us about yourself"
                type="textarea"
                value={this.state.about}
              />
            </AvGroup>

            <FormGroup>
              <Label for="img">Profile Picture</Label>
              <Input
                type="file"
                name="file"
                id="img"
                onChange={this.handleInputChange}
              />
              <FormText color="muted">
                This will be shown to all users.
              </FormText>
            </FormGroup>
            <div className="but">
              <Button color="primary">Register</Button>
            </div>
          </AvForm>
        </div>
      </div>
    );
  }
}
