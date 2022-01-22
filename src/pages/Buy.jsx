import React from "react";
import ProductCardBuy from "../components/ProductCardBuy";
import Axios from "axios";
import { API_URL } from "../constants/api";

import "bootstrap/dist/css/bootstrap.min.css";

class Buy extends React.Component {
  state = {
    productList: [],
    filteredProductList: [],
    itemPerPage: 4,
    page: 1,
    maxPage: 0,
    searchProductName: "",
    searchBrand: "",
    searchCondition: "",
    sortBy: "",
  };

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        console.log(`berhasil`);
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
          filteredProductList: result.data,
        });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.filteredProductList];

    const compareString = (a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }
      if (a.productName > b.productName) {
        return 1;
      }

      return 0;
    };

    switch (this.state.sortBy) {
      case "lowPrice":
        rawData.sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        rawData.sort((a, b) => b.price - a.price);
        break;
      case "az":
        rawData.sort(compareString);
        break;
      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break;
      default:
        rawData = [...this.state.filteredProductList];
        break;
    }
    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val) => {
      return <ProductCardBuy productData={val} />;
    });
  };

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  searchBtnHandler = () => {
    const filteredProductList = this.state.productList.filter((val) => {
      return (
        val.productName
          .toLowerCase()
          .includes(this.state.searchProductName.toLowerCase()) &&
        val.brand
          .toLowerCase()
          .includes(this.state.searchBrand.toLowerCase()) &&
        val.condition
          .toLowerCase()
          .includes(this.state.searchCondition.toLowerCase())
      );
    });

    this.setState({
      filteredProductList,
      maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage),
      page: 1,
    });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    return (
      <div className=" mt-2 d-flex flex-row justify-content-around ">
        <div className="col-2 ">
          <div className="card">
            <div className="card-header">
              <strong>Filter Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchProductName">Product Name</label>
              <input
                onChange={this.inputHandler}
                type="text"
                name="searchProductName"
                className="form-control mb-3"
              />
              <label htmlFor="searchBrand">Brand</label>
              <select
                onChange={this.inputHandler}
                name="searchBrand"
                className="form-control mb-3"
              >
                <option value="">All Brand</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes-Benz</option>
                <option value="mitsubishi">Mitsubishi</option>
                <option value="tesla">Tesla</option>
                <option value="toyota">Toyota</option>
              </select>
              <label htmlFor="searchCondition">Condition</label>
              <select
                onChange={this.inputHandler}
                name="searchCondition"
                className="form-control"
              >
                <option value="">All Condition</option>
                <option value="baru">Baru</option>
                <option value="bekas">Bekas</option>
              </select>
              <button onClick={this.searchBtnHandler} className="btn mt-3">
                <i class="fas fa-search"></i>
              </button>
              <button
                className="reset btn mt-3 ms-5"
                style={{ backgroundColor: "transparent", color: "#86c232" }}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">{this.renderProducts()}</div>
        <div className="col-2 ">
          <div className="card">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="sortBy">Sort by</label>
              <select
                onChange={this.inputHandler}
                name="sortBy"
                className="form-control"
              >
                <option value="">Default</option>
                <option value="lowPrice">Lowest Price</option>
                <option value="highPrice">Highest Price</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
          <div className="mt-4 d-flex flex-column align-items-center">
            <div className="d-flex flex-row align-items-center">
              <button
                disabled={this.state.page === 1}
                className="btn"
                onClick={this.prevPageHandler}
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <div className="text-center mx-3" style={{ color: "#86c232" }}>
                Page {this.state.page} of {this.state.maxPage}
              </div>
              <button
                disabled={this.state.page === this.state.maxPage}
                className="btn"
                onClick={this.nextPageHandler}
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Buy;
