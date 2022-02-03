import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/api";
import { getCartData } from "../redux/actions/cartAction";

import "../assets/styles/Cart.css";
import { Navigate, useNavigate } from "react-router";

import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    isCheckoutMode: false,
    recipientName: "",
    address: "",
    payment: "",

    payBtn: true,
    payDone: false,
  };

  deleteCartHandler = (cartId) => {
    const confirmDelete = window.confirm(`Are you sure want to delete?`);

    if (confirmDelete) {
      Axios.delete(`${API_URL}/carts/${cartId}`)
        .then(() => {
          alert(`Berhasil delete item dari cart`);
          this.props.getCartData(this.props.userGlobal.id);
        })
        .catch(() => {
          alert(`terjadi kesalahan di server`);
        });
    } else {
      alert(`Delete Canceled`);
    }
  };

  deleteCartAfter = (cartId) => {
    Axios.delete(`${API_URL}/carts/${cartId}`)
      .then(() => {
        this.props.getCartData(this.props.userGlobal.id);
      })
      .catch(() => {
        alert(`terjadi kesalahan di server (Cart:39)`);
      });
  };

  renderCart = () => {
    if (this.props.cartGlobal.cartList === "0") {
      return <Navigate to="/history" />;
    }

    return this.props.cartGlobal.cartList.map((val) => {
      return (
        <tr>
          <td className="align-middle">{val.productName}</td>
          <td className="align-middle">IDR {val.price.toLocaleString()}</td>
          <td className="align-middle">
            <img
              src={val.productImage}
              style={{ height: "125px" }}
              alt="productimage"
            />
          </td>
          <td className="align-middle">{val.quantity}</td>
          <td className="align-middle">
            IDR {(val.quantity * val.price).toLocaleString()}
          </td>
          <td className="align-middle">
            <button
              onClick={() => {
                this.deleteCartHandler(val.id);
              }}
              className="btn"
              style={{ backgroundColor: "red" }}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  renderSubtotalPrice = () => {
    let subtotal = 0;

    for (let i = 0; i < this.props.cartGlobal.cartList.length; i++) {
      subtotal +=
        this.props.cartGlobal.cartList[i].price *
        this.props.cartGlobal.cartList[i].quantity;
    }
    return subtotal;
  };

  renderTaxFee = () => {
    return this.renderSubtotalPrice() * 0.1;
  };

  renderTotalPrice = () => {
    return this.renderSubtotalPrice() + this.renderTaxFee();
  };

  checkoutModeToggle = () => {
    this.setState({ isCheckoutMode: !this.state.isCheckoutMode });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

    this.disabledPayBtn();
    console.log(this.state);
  };

  payBtnHandler = () => {
    if (this.state.payment < this.renderTotalPrice()) {
      alert(
        `Uang anda kurang IDR ${(
          this.renderTotalPrice() - this.state.payment
        ).toLocaleString()}`
      );
      return;
    }

    if (this.state.payment > this.renderTotalPrice()) {
      alert(
        `Terima kasih, kembalian anda IDR ${(
          this.state.payment - this.renderTotalPrice()
        ).toLocaleString()}`
      );
    } else if (this.state.payment === this.renderTotalPrice()) {
      alert(`Terima kasih telah membayar dengan uang pas`);
    }

    const d = new Date();

    Axios.post(`${API_URL}/transactions`, {
      userId: this.props.userGlobal.id,
      address: this.state.address,
      recipientName: this.state.recipientName,
      totalPrice: this.renderTotalPrice(),
      totalPayment: +this.state.payment,
      transactionDate: `${d.getDate()}-${
        d.getMonth() + 1
      }-${d.getFullYear()} | ${d.getHours()}:${d.getMinutes()}`, // DD-MM-YYYY | HH:MM
      transactionItems: this.props.cartGlobal.cartList, //arr of obj -> cart
    })
      .then((result) => {
        alert(`pembayaran berhasil`);
        result.data.transactionItems.forEach((val) => {
          this.deleteCartAfter(val.id);
        });
        this.setState({ payDone: true });
      })
      .catch(() => {
        alert(`terjadi kesalahan di server (cart:110)`);
      });
  };

  disabledPayBtn = () => {
    if (
      this.state.recipientName !== "" &&
      this.state.address !== "" &&
      this.state.payment !== ""
    ) {
      this.setState({ payBtn: false });
      console.log(this.state.payBtn);
    }
  };

  render() {
    if (this.props.userGlobal.role !== "user") {
      swal({
        title: "Admin tidak memiliki akses halaman Cart",
        icon: "error",
      });
      return <Navigate to="/" />;
    }

    if (this.state.payDone) {
      return <Navigate to="/history" />;
    }
    return (
      <div className="p-5">
        <h1>Cart</h1>
        <div className="row mt-4">
          <div className="col-9 text-center">
            <table className="table table-borderless rounded">
              <thead
                className="thead card-header"
                style={{ backgroundColor: "#474b4f", color: "#86c232" }}
              >
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#474b4f", color: "#86c232" }}>
                {this.renderCart()}
              </tbody>
              <tfoot style={{ backgroundColor: "#474b4f", color: "#86c232" }}>
                <tr>
                  <td colSpan="6">
                    <button className="btn" onClick={this.checkoutModeToggle}>
                      Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {this.state.isCheckoutMode ? (
            <div className="card col-3">
              <div
                className="card-header"
                style={{ backgroundColor: "transparent" }}
              >
                <strong>Order Summary</strong>
              </div>
              <div className="card-body">
                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                  <span className="fw-bold">Subtotal Price</span>
                  <span>IDR {this.renderSubtotalPrice().toLocaleString()}</span>
                </div>
                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                  <span className="fw-bold">Tax Fee (10%)</span>
                  <span>IDR {this.renderTaxFee().toLocaleString()}</span>
                </div>
                <hr />
                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                  <span className="fw-bold">Total Price</span>
                  <span>IDR {this.renderTotalPrice().toLocaleString()}</span>
                </div>
              </div>
              <hr />
              <div className="card-body recipient">
                <label className="mb-1" htmlFor="recipientName">
                  Recipient Name
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="recipientName"
                  onInput={this.inputHandler}
                  id="needed"
                />
                <label className="mb-1" htmlFor="Address">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={this.inputHandler}
                  id="needed"
                />
              </div>
              <div
                className="card-footer"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <input
                    type="number"
                    className="form-control nomer"
                    name="payment"
                    onChange={this.inputHandler}
                    id="needed"
                  />
                  {this.state.payBtn === false ? (
                    <button
                      onClick={this.payBtnHandler}
                      className="btn ms-1"
                      id="pay"
                    >
                      Pay
                    </button>
                  ) : (
                    <button
                      onClick={this.payBtnHandler}
                      className="btn ms-1"
                      id="pay"
                      disabled
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartGlobal: state.cart,
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
