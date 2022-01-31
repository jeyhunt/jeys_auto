import React from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/user";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/Register.css";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    role: "",
  };

  inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });

    this.validateHandler(name);
  };

  validateHandler = (field) => {
    console.log("test");
    if (field === "email") {
      const email = document.getElementById("mail").value;
      const emailRGEX =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailResult = emailRGEX.test(email);

      if (emailResult === false) {
        console.log(`please input valid email address`);
        this.setState({ emailError: true });
      } else {
        this.setState({ emailError: false });
      }
    }

    if (field === "password") {
      // validation buat password
      const password = document.getElementById("pass").value;
      const passwordRGEX =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
      const passwordResult = passwordRGEX.test(password);

      if (passwordResult === false) {
        console.log(
          `Password must contain at least eight characters, at least one number and both lower and uppercase letters, and special characters`
        );
        this.setState({ passwordError: true });
      } else {
        this.setState({ passwordError: false });
      }
    }
  };

  registerHandler = () => {
    // cek validasi

    if (this.state.emailError === true) {
      return false;
    }
    if (this.state.passwordError === true) {
      return false;
    }

    // this.props.registeruser
    this.props.registerUser(this.state);
  };

  showPasswordHandler = () => {
    const show = document.getElementById("pass");

    if (show.type === "password") {
      show.type = "text";
    } else {
      show.type = "password";
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-5">
            <h1>Welcome to Jey's Auto</h1>
            <p className="lead">
              Sign up now and start looking for your rides!
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="signup font-weight-bold mb-3">Sign Up</h5>
                <input
                  onChange={this.inputHandler}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="shadow-none form-control my-2"
                  style={{ color: "#61892f" }}
                />
                <input
                  onChange={this.inputHandler}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="shadow-none form-control my-2"
                  style={{ color: "#61892f" }}
                />
                <input
                  onChange={this.inputHandler}
                  name="username"
                  id="user"
                  type="text"
                  placeholder="Username"
                  className="shadow-none form-control my-2"
                  style={{ color: "#61892f" }}
                />
                <input
                  onChange={this.inputHandler}
                  name="email"
                  id="mail"
                  type="email"
                  placeholder="Email"
                  className="shadow-none form-control my-2"
                  style={{ color: "#61892f" }}
                />
                {this.state.emailError ? (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    please input valid email address
                  </p>
                ) : null}
                <div className="input-group my-2">
                  <input
                    onChange={this.inputHandler}
                    name="password"
                    id="pass"
                    type="password"
                    placeholder="Password"
                    className="shadow-none form-control"
                    style={{ color: "#61892f" }}
                  />
                  <button
                    className="btn far fa-eye"
                    style={{
                      height: "38px",
                      backgroundColor: "transparent",
                      border: "1px solid #86c232",
                    }}
                    onClick={this.showPasswordHandler}
                  ></button>
                </div>

                {this.state.passwordError ? (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    Password must contain at least eight characters, at least
                    one number and both lower and uppercase letters, and special
                    characters
                  </p>
                ) : null}

                <div className="butt d-flex flex-row justify-content-between align-items-center">
                  <button
                    onClick={this.registerHandler}
                    className="btn btn-primary mt-2"
                  >
                    Sign Up
                  </button>
                </div>
                <p className="mt-3">
                  Already have an account?&nbsp;
                  <Link to="/login" className="butt">
                    Sign In
                  </Link>
                </p>
                <p>{() => this.registerHandler}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
