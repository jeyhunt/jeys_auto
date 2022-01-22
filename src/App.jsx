import React from "react";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Container } from "react-bootstrap";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Admin from "./pages/Admin";

import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <Container
          style={{
            background: "#222629",
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        >
          <div>
            <MyNavbar />
            <div className="content">
              <BrowserRouter>
                <Routes>
                  <Route element={<Buy />} path="/buy" />
                  <Route element={<Sell />} path="/sell" />
                  <Route element={<Contact />} path="/contact" />
                  <Route element={<ProductDetail />} path="/product-detail" />
                  <Route element={<Login />} path="/login" />
                  <Route element={<Register />} path="/register" />

                  <Route element={<Cart />} path="/cart" />
                  <Route element={<History />} path="/history" />
                  <Route element={<Admin />} path="/admin" />
                  <Route element={<Home />} path="/" />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </Container>
      );
    }
    return <div>Loading ...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
