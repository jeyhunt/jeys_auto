import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/api";

class Admin extends React.Component {
  state = {
    productList: [],
    addProductName: "",
    addPrice: 0,
    addProductImage: "",
    addDescription: "",
    addBrand: "",
    addCondition: "",
  };

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({ productList: result.data });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  renderProducts = () => {
    return this.state.productList.map((val) => {
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
            <button className="btn">
              <i class="fas fa-edit"></i>
            </button>
          </td>
          <td>
            <button className="btn" style={{ backgroundColor: "red" }}>
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
        </div>
      </div>
    );
  }
}

export default Admin;
