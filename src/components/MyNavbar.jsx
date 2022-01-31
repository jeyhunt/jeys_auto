import Button from "@restart/ui/esm/Button";
import React from "react";
import logo from "../assets/images/logojey.png";

import { Navbar, NavbarBrand, NavItem, Nav, Dropdown } from "react-bootstrap";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/user";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/MyNavbar.css";

class MyNavbar extends React.Component {
  render() {
    return (
      <Navbar
        bg="custom-nav"
        variant="dark"
        className="custom-nav d-flex flex-row justify-content-between"
      >
        <NavbarBrand className="ms-3 mt-1">
          <img
            src={logo}
            width="70"
            height="70"
            className="d-inline-block align-center"
            alt="jey's auto logo"
          />
        </NavbarBrand>
        <Nav>
          <NavItem className="d-flex flex-row mt-2">
            <Nav.Link href="/">
              <div className="tautan">Home</div>
            </Nav.Link>
            <Nav.Link href="/buy">
              <p className="tautan">Collections</p>
            </Nav.Link>
            <Nav.Link href="/contact">
              <p className="tautan">About Us</p>
            </Nav.Link>
          </NavItem>
        </Nav>
        <Nav>
          {this.props.userGlobal.username ? (
            <Nav>
              <NavItem className="align-center mt-1 me-3">
                <Navbar.Text style={{ color: "#86c232" }} classname="">
                  Signed In as {this.props.userGlobal.username}
                </Navbar.Text>
              </NavItem>
              <NavItem>
                <Dropdown className="me-3" align="end">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown"
                    className=" animate slideIn"
                  >
                    <i class="fas fa-bars"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item className="dropdown-isi" href="/cart">
                      Cart ({this.props.cartGlobal.cartList.length})
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-isi" href="#/action-2">
                      History
                    </Dropdown.Item>
                    {this.props.userGlobal.role === "admin" ? (
                      <Dropdown.Item className="dropdown-isi" href="/admin">
                        Admin
                      </Dropdown.Item>
                    ) : null}

                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="dropdown-isi"
                      onClick={this.props.logoutUser}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </NavItem>
            </Nav>
          ) : (
            <>
              <NavItem className="me-3 mt-2">
                {/* <Button className="custom-btn-login btn me-2" href="/login">
                  Sign In
                </Button> */}
                <Button className="custom-btn-regis btn " href="/login">
                  Sign In
                </Button>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
