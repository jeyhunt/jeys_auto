import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/api";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cartAction";

import "../assets/styles/ProductDetail.css";

class ProductDetail extends React.Component {
  state = {
    productData: {},
    productNotFound: false,
    quantity: 1,
  };

  fetchProductData = () => {
    Axios.get(`${API_URL}/products`, {
      params: {
        id: window.location.search.slice(1),
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ productData: result.data[0] });
        } else {
          this.setState({ productNotFound: true });
        }
      })
      .catch(() => {
        alert(`terjadi kesalahan di server`);
      });
    // console.log(window.location.search.slice(1));
  };

  qtyBtnHandler = (action) => {
    if (action === "increment") {
      this.setState({ quantity: this.state.quantity + 1 });
    } else if (action === "decrement" && this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  addToCartHandler = () => {
    // cek user sudah ada barang tsb di cart
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.userGlobal.id,
        productId: this.state.productData.id,
      },
    }).then((result) => {
      if (result.data.length) {
        //sudah ada di cart user
        Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
          quantity: result.data[0].quantity + this.state.quantity,
        })
          .then(() => {
            alert(`Berhasil menambahkan barang`);
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert(`terjadi kesalahan di server`);
          });
      } else {
        //belum ada di cart user
        Axios.post(`${API_URL}/carts`, {
          userID: this.props.userGlobal.id,
          productId: this.state.productData.id,
          price: this.state.productData.price,
          productName: this.state.productData.productName,
          productImage: this.state.productData.productImage,
          quantity: this.state.quantity,
        })
          .then(() => {
            alert(`Berhasil menambahkan barang`);
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert(`terjadi kesalahan di server`);
          });
      }
    });
  };

  componentDidMount() {
    this.fetchProductData();
  }

  render() {
    // console.log(this.state);

    return (
      <div className="top-section d-flex flex-row justify-content-center mt-5">
        {this.state.productNotFound ? (
          <div className="alert alert-danger">
            product with ID: {window.location.search.slice(1)} not found
          </div>
        ) : (
          <div
            className="card d-flex flex-row align-items-center"
            style={{ width: "75vw", height: "75vh" }}
          >
            <div className="img-container text-center col bg-danger">
              <img
                className="img-fluid d-block"
                style={{ width: "100%", height: "70%" }}
                src={this.state.productData.productImage}
                alt=""
              />
            </div>
            <div
              className="mx-5"
              style={{
                width: "300px",
                height: "500px",
              }}
            >
              <h2 className="card-title fw-bold mb-4">
                {this.state.productData.productName}
              </h2>
              <h4 className="mb-4">{this.state.productData.condition}</h4>
              <h4 className="price mb-4">
                IDR{" "}
                {this.state.productData.price
                  ? this.state.productData.price.toLocaleString()
                  : null}
              </h4>
              <p>{this.state.productData.description}</p>

              <div className="d-flex flex-row input-group">
                <button
                  className="btn"
                  onClick={() => {
                    this.qtyBtnHandler("decrement");
                  }}
                >
                  <i class="far fa-minus-square fs-5 input-group-button"></i>
                </button>
                <input
                  type="number"
                  className="form-control nomer"
                  placeholder={this.state.quantity}
                  style={{ textAlign: "center" }}
                />
                <button
                  className="btn"
                  onClick={() => {
                    this.qtyBtnHandler("increment");
                  }}
                >
                  <i class="far fa-plus-square fs-5 input-group-button"></i>
                </button>
              </div>

              <button
                className="btn mt-2"
                style={{ paddingLeft: "47%", paddingRight: "46%" }}
                onClick={this.addToCartHandler}
              >
                <i class="fas fa-cart-plus fs-5"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToprops = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToprops)(ProductDetail);
