import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/api";

class Admin extends React.Component {
  state = {
    productList: [],
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
          <td>{val.price}</td>
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
            <button className="btn">Edit</button>
          </td>
          <td>
            <button className="btn" style={{ backgroundColor: "red" }}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    return (
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Manage Products</h1>
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
                  <th>Action</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot className="bg-dark">
                <tr>
                  <td></td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <select name="addCategory" className="form-control">
                      <option value="">All Items</option>
                      <option value="brand">Brand</option>
                      <option value="condition">Condition</option>
                    </select>
                  </td>
                  <td colSpan="2">
                    <button className="btn">Add Product</button>
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
