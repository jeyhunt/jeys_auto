import React from "react";
import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/api";
import { getCartData } from "../redux/actions/cartAction";

import "../assets/styles/ProductCardBuy.css";
import "bootstrap/dist/css/bootstrap.min.css";

class ProductCardBuy extends React.Component {
  addToCartHandler = () => {
    // cek user sudah ada barang tsb di cart
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.userGlobal.id,
        productId: this.props.productData.id,
      },
    }).then((result) => {
      if (result.data.length) {
        //sudah ada di cart user
        Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
          quantity: result.data[0].quantity + 1,
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
          productId: this.props.productData.id,
          price: this.props.productData.price,
          productName: this.props.productData.productName,
          productImage: this.props.productData.productImage,
          quantity: 1,
        })
          .then(() => {
            alert(`Berhasil menambahkan barang`);
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert(`terjadi kesalahan di server (ProductCardBuy:48)`);
          });
      }
    });
  };

  render() {
    return (
      <div class="kartu2 card mb-3" style={{ maxWidth: "640px" }}>
        <div class="row g-0">
          <div class="col-md-4 d-flex align-items-center">
            <img
              src={this.props.productData.productImage}
              class="img-fluid rounded-start gambar2 align-items-center"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <Link
                to={`/product-detail?${this.props.productData.id}`}
                style={{ textDecoration: "none" }}
              >
                <h5 class="card-title">{this.props.productData.productName}</h5>
              </Link>
              <p class="card-text">
                IDR {this.props.productData.price.toLocaleString()}
              </p>
              <p class="card-text">
                <small class="text-muted">
                  {this.props.productData.description}
                </small>
              </p>
              <Button
                className="btn"
                style={{ backgroundColor: "#86c232", color: "#222629" }}
                onClick={this.addToCartHandler}
              >
                Buy
              </Button>
            </div>
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
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardBuy);
