import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constants/api";
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
    password: "",
    role: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  registerHandler = () => {
    const { firstName, lastName, username, email, password } = this.state;

    Axios.post(`${API_URL}/users`, {
      firstName,
      lastName,
      username,
      email,
      password,
      role: "user",
    })
      .then(() => {
        alert(`berhasil mendaftarkan user`);
      })
      .catch(() => {
        alert(`gagal mendaftarkan user`);
      });
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
                  type="text"
                  placeholder="Username"
                  className="shadow-none form-control my-2"
                  style={{ color: "#61892f" }}
                />
                <input
                  onChange={this.inputHandler}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="shadow-none form-control my-2"
                  style={{ color: "#61892f" }}
                />
                <input
                  onChange={this.inputHandler}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="shadow-none form-control my-2"
                  style={{ color: "#61892f" }}
                />
                <div className="butt d-flex flex-row justify-content-between align-items-center">
                  <button
                    onClick={() => this.props.registerUser(this.state)}
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
