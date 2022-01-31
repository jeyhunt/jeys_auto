import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/api";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import "../assets/styles/Admin.css";

class Admin extends React.Component {
  state = {
    productList: [],
    addProductName: "",
    addPrice: 0,
    addProductImage: "",
    addDescription: "",
    addBrand: "",
    addCondition: "",

    editId: 0,

    editProductName: "",
    editPrice: 0,
    editProductImage: "",
    editDescription: "",
    editBrand: "",
    editCondition: "",

    page: 1,
    maxPage: 0,
    itemPerPage: 5,
  };

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
        });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  editToggle = (editData) => {
    this.setState({
      editId: editData.id,
      editProductName: editData.productName,
      editPrice: editData.price,
      editProductImage: editData.productImage,
      editDescription: editData.description,
      editBrand: editData.brand,
      editCondition: editData.condition,
    });
  };

  cancelEdit = () => {
    this.setState({ editId: 0 });
  };

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/products/${this.state.editId}`, {
      productName: this.state.editProductName,
      price: +this.state.editPrice,
      productImage: this.state.editProductImage,
      description: this.state.editDescription,
      brand: this.state.editBrand,
      condition: this.state.editCondition,
    })
      .then(() => {
        this.fetchProducts();
        this.cancelEdit();
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm(
      "Are You Sure Want to Delete this Car?"
    );
    if (confirmDelete) {
      Axios.delete(`${API_URL}/products/${deleteId}`)
        .then(() => {
          this.fetchProducts();
        })
        .catch(() => {
          alert(`Terjadi kesalahan di server`);
        });
    } else {
      alert(`Delete Canceled`);
    }
  };

  nextPageHandler = () => {
    this.setState({ page: this.state.page + 1 });
  };

  prevPageHandler = () => {
    this.setState({ page: this.state.page - 1 });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    const currentData = this.state.productList.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );

    return currentData.map((val) => {
      if (val.id === this.state.editId) {
        return (
          <tr style={{ backgroundColor: "#474b4f" }}>
            <td>{val.id}</td>
            <td>
              <input
                value={this.state.editProductName}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editProductName"
              />
            </td>
            <td>
              <input
                value={this.state.editPrice}
                onChange={this.inputHandler}
                type="number"
                className="form-control nomer"
                name="editPrice"
              />
            </td>
            <td>
              <input
                value={this.state.editProductImage}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editProductImage"
              />
            </td>
            <td>
              <input
                value={this.state.editDescription}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editDescription"
              />
            </td>
            <td>
              <select
                value={this.state.editBrand}
                name="editBrand"
                className="form-control"
                style={{ color: "#86c232" }}
              >
                <option value="">All Brand</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Tesla">Tesla</option>
                <option value="Toyota">Toyota</option>
              </select>
            </td>
            <td>
              <select
                value={this.state.editCondition}
                name="editCondition"
                className="form-control"
                style={{ color: "#86c232" }}
              >
                <option value="">All Condition</option>
                <option value="Baru">Baru</option>
                <option value="Bekas">Bekas</option>
              </select>
            </td>
            <td>
              <button onClick={this.saveBtnHandler} className="btn">
                <i class="far fa-save"></i>
              </button>
            </td>
            <td>
              <button
                onClick={this.cancelEdit}
                className="btn"
                style={{ backgroundColor: "red" }}
              >
                <i class="far fa-window-close"></i>
              </button>
            </td>
          </tr>
        );
      }

      return (
        <tr style={{ backgroundColor: "#474b4f" }}>
          <td>{val.id}</td>
          <td>{val.productName}</td>
          <td>{val.price.toLocaleString()}</td>
          <td>
            <img
              src={val.productImage}
              alt=""
              style={{ width: "240px", height: "180px", objectFit: "cover" }}
            />
          </td>
          <td>{val.description}</td>
          <td>{val.brand}</td>
          <td>{val.condition}</td>
          <td>
            <button onClick={() => this.editToggle(val)} className="btn">
              <i class="fas fa-edit"></i>
            </button>
          </td>
          <td>
            <button
              onClick={() => this.deleteBtnHandler(val.id)}
              className="btn"
              style={{ backgroundColor: "red" }}
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  addNewProduct = () => {
    Axios.post(`${API_URL}/products`, {
      productName: this.state.addProductName,
      price: +this.state.addPrice,
      productImage: this.state.addProductImage,
      description: this.state.addDescription,
      brand: this.state.addBrand,
      condition: this.state.addCondition,
    })
      .then(() => {
        this.fetchProducts();
        this.setState({
          addProductName: "",
          addPrice: 0,
          addProductImage: "",
          addDescription: "",
          addBrand: "",
          addCondition: "",
        });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    if (this.props.userGlobal.role !== "admin") {
      return <Navigate to="/" />;
    }
    return (
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Manage Cars</h1>
            <table className="table mt-4">
              <thead className="thead" style={{ backgroundColor: "#86c232" }}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Brand</th>
                  <th>Condition</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot className="bg-dark">
                <tr>
                  <td></td>
                  <td>
                    <input
                      value={this.state.addProductName}
                      onChange={this.inputHandler}
                      name="addProductName"
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      style={{ color: "#86c232" }}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addPrice}
                      onChange={this.inputHandler}
                      name="addPrice"
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      style={{ color: "#86c232" }}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addProductImage}
                      onChange={this.inputHandler}
                      name="addProductImage"
                      type="text"
                      className="form-control"
                      placeholder="Product Image"
                      style={{ color: "#86c232" }}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addDescription}
                      onChange={this.inputHandler}
                      name="addDescription"
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      style={{ color: "#86c232" }}
                    />
                  </td>
                  <td>
                    <select
                      onChange={this.inputHandler}
                      name="addBrand"
                      className="form-control"
                      placeholder=""
                      style={{ color: "#86c232" }}
                    >
                      <option value="">All Brand</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Mitsubishi">Mitsubishi</option>
                      <option value="Tesla">Tesla</option>
                      <option value="Toyota">Toyota</option>
                    </select>
                  </td>
                  <td>
                    <select
                      onChange={this.inputHandler}
                      name="addCondition"
                      className="form-control"
                      style={{ color: "#86c232" }}
                    >
                      <option value="">All Condition</option>
                      <option value="Baru">Baru</option>
                      <option value="Bekas">Bekas</option>
                    </select>
                  </td>
                  <td colSpan="2">
                    <button className="btn" onClick={this.addNewProduct}>
                      <i class="fas fa-plus-square"></i>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
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

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(Admin);
