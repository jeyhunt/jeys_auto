import React from "react";
import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";

import "../assets/styles/ProductCardBuy.css";
import "bootstrap/dist/css/bootstrap.min.css";

class ProductCardBuy extends React.Component {
  render() {
    return (
      <Link
        to={`/product-detail?${this.props.productData.id}`}
        style={{ textDecoration: "none" }}
      >
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
                <h5 class="card-title">{this.props.productData.productName}</h5>
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
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCardBuy;
