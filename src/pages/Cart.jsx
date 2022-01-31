import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/api";
import { getCartData } from "../redux/actions/cartAction";

class Cart extends React.Component {
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

  renderCart = () => {
    return this.props.cartGlobal.cartList.map((val) => {
      return (
        <tr>
          <td className="align-middle">{val.productName}</td>
          <td className="align-middle">IDR {val.price.toLocaleString()}</td>
          <td className="align-middle">
            <img src={val.productImage} style={{ height: "125px" }} />
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

  render() {
    return (
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Cart</h1>
            <table className="table mt-4">
              <thead className="thead" style={{ backgroundColor: "#86c232" }}>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ color: "#86c232" }}>{this.renderCart()}</tbody>
              <tfoot>
                <tr>
                  <td colSpan="6">
                    <button className="btn">Checkout</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
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
