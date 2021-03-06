import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/api";
import { connect } from "react-redux";
import { Navigate } from "react-router";

import swal from "sweetalert";

class History extends React.Component {
  state = {
    transactionList: [],
    transactionDetails: [],
  };

  fetchTransaction = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        userId: this.props.userGlobal.id,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({ transactionList: result.data });
      })
      .catch(() => {
        alert(`terjadi kesalahan di server (History:20)`);
      });
  };

  seeDetailsBtnHandler = (transactionDetails) => {
    this.setState({ transactionDetails });
  };

  renderTransactions = () => {
    return this.state.transactionList.map((val) => {
      return (
        <tr>
          <td>{val.transactionDate}</td>
          <td>{val.transactionItems.length}</td>
          <td>IDR {val.totalPrice.toLocaleString()}</td>
          <td>
            <button
              onClick={() => this.seeDetailsBtnHandler(val.transactionItems)}
              className="btn"
            >
              details
            </button>
          </td>
        </tr>
      );
    });
  };

  renderTransactionDetailItems = () => {
    return this.state.transactionDetails.map((val) => {
      return (
        <div className="d-flex flex-row justify-content-between align-items-center">
          <span className="fw-bold">
            {val.productName} ({val.quantity})
          </span>
          <span>IDR {(val.price * val.quantity).toLocaleString()}</span>
        </div>
      );
    });
  };

  componentDidMount() {
    this.fetchTransaction();
  }

  render() {
    if (this.props.userGlobal.role !== "user") {
      swal({
        title: "Admin tidak memiliki akses halaman History",
        icon: "error",
      });
      return <Navigate to="/" />;
    }
    return (
      <div className="p-5">
        <h1>Transaction History</h1>
        <div className="row mt-3">
          <div className="col-7">
            <table className="table table-borderless">
              <thead style={{ backgroundColor: "#474b4f", color: "#86c232" }}>
                <tr>
                  <th className="text-center">Transaction Date</th>
                  <th className="text-center">Total Items</th>
                  <th className="text-center">Total Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody
                className="text-center"
                style={{ backgroundColor: "#474b4f", color: "#86c232" }}
              >
                {this.renderTransactions()}
              </tbody>
            </table>
          </div>
          <div className="col-5">
            {this.state.transactionDetails.length ? (
              <div className="card">
                <div className="card-header">
                  <strong>Transaction Details</strong>
                </div>
                <div className="card-body">
                  {this.renderTransactionDetailItems()}
                </div>
              </div>
            ) : null}
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

export default connect(mapStateToProps)(History);
