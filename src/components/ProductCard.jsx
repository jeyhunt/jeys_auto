import React from "react";
import Button from "@restart/ui/esm/Button";
import { Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/ProductCard.css";

class ProductCard extends React.Component {
  render() {
    return (
      <Card className="kartu mt-4">
        <Card.Img
          variant="top"
          src={this.props.productData.productImage}
          className="gambar"
        />

        <Card.Body>
          <Card.Title className="fw-bold fs-5" style={{ color: "#86c232" }}>
            {this.props.productData.productName}
          </Card.Title>
          <Card.Text style={{ color: "#86c232" }}>
            IDR {this.props.productData.price.toLocaleString()}
          </Card.Text>
          <Card.Text className="fst-italic text-muted">
            {this.props.productData.description}
          </Card.Text>
          <Button
            className="btn"
            style={{ backgroundColor: "#86c232", color: "#222629" }}
          >
            Buy
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCard;
