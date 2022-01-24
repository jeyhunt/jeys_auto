import React from "react";
import Button from "@restart/ui/esm/Button";
import Axios from "axios";
import { API_URL } from "../constants/api";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import "../assets/styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends React.Component {
  state = {
    productList: [],
  };

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        console.log(`berhasil`);
        this.setState({ productList: result.data });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  renderProducts = () => {
    const itemPerPage = -4;
    const currentData = this.state.productList.slice(itemPerPage);
    return currentData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    return (
      <>
        <div className="home-background">
          <div className="layer">
            <p className="judul " style={{ color: "#86c232" }}>
              JEY'S AUTO
            </p>
            <p className="title-content">Selling cars with good standard</p>
            <Button className="custom-btn-buy btn mt-3" href="/buy">
              Start searching for your cars
            </Button>
          </div>
        </div>
        <div className="sub-content d-flex flex-row justify-content-between ">
          <h3 className="terbaru ms-5 fw-bold">Recent Stock</h3>
          <h3 style={{ color: "#86c232" }} className="mt-2 me-5">
            <Link to="/buy" className="liat-semua">
              View All
            </Link>
          </h3>
        </div>
        <div className="recent-card d-flex flex-row flex-wrap justify-content-around">
          {this.renderProducts()}
        </div>
        <h3 className=" mt-5 fw-bold text-center" style={{ color: "#86c232" }}>
          Credit Partners
        </h3>
        <footer className="footer d-flex flex-row flex-wrap justify-content-around">
          <img
            src="https://www.bimmeroom.com/assets/upload/full/mandiri-finance-logo.png"
            alt="mandiri"
          />
          <img
            src="https://www.bimmeroom.com/assets/upload/full/bca-finance-logo.png"
            alt="bca"
          />
          <img
            src="https://www.bimmeroom.com/assets/upload/full/bri-finance-logo.png"
            alt="bri"
          />
        </footer>
        <div className="copyright text-center pb-2">
          <h6>Ⓒ 2022 JEY'S AUTO</h6>
        </div>
      </>
    );
  }
}

export default Home;
