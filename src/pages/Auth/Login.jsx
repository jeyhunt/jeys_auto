import React from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/user";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/Login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: "",

    toggleEyePassword: false,
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  showPasswordHandler = () => {
    const show = document.getElementById("pass");

    if (show.type === "password") {
      show.type = "text";
    } else {
      show.type = "password";
    }

    this.setState({ toggleEyePassword: !this.state.toggleEyePassword });
  };

  render() {
    if (this.props.userGlobal.id) {
      return <Navigate to="/" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Sign in Now!</h1>
            <p className="lead">Sign in now and start searching your rides</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Sign in</h5>
                <input
                  onChange={this.inputHandler}
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control my-2"
                />
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
                    className={
                      this.state.toggleEyePassword
                        ? "btn far fa-eye"
                        : "btn far fa-eye-slash"
                    }
                    style={{
                      height: "38px",
                      backgroundColor: "transparent",
                      border: "1px solid #86c232",
                      color: "#86c232",
                    }}
                    onClick={this.showPasswordHandler}
                  ></button>
                </div>
                <div className="butt d-flex flex-row justify-content-between align-items-end">
                  <button
                    onClick={() => this.props.loginUser(this.state)}
                    className="btn btn-primary mt-2"
                  >
                    Login
                  </button>
                </div>
                <p className="mt-3">
                  Don't have an account?&nbsp;
                  <Link to="/register" className="butt">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
            {this.props.userGlobal.errMsg ? (
              <div className="alert">{this.props.userGlobal.errMsg}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
