import Button from "@restart/ui/esm/Button";
import React from "react";

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
            src="https://document-export.canva.com/5Aybg/DAE1xM5Aybg/33/preview/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20220119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220119T203147Z&X-Amz-Expires=60260&X-Amz-Signature=886a0ff01c056a04f5011691c3d7dbd1b9f954bbad4435a41d8bf2afcc9dcd69&X-Amz-SignedHeaders=host&response-expires=Thu%2C%2020%20Jan%202022%2013%3A16%3A07%20GMT"
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
                    <Dropdown.Item className="dropdown-isi" href="#/action-1">
                      Cart
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
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
