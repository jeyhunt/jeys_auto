import React from "react";
import logo from "../assets/images/logojeycontact.png";

class Contact extends React.Component {
  render() {
    return (
      <div className="container d-flex flex-row justify-content-center mt-5">
        <div
          className="card d-flex flex-row justify-content-center align-items-center"
          style={{ maxWidth: "80vw" }}
        >
          <div className="img">
            <img
              src="https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="garage"
              style={{ height: "70vh", width: "60vw", objectFit: "cover" }}
            />
          </div>
          <div className="d-flex flex-column align-items-center text-center mx-3">
            <img
              src={logo}
              width="200"
              height="200"
              className="d-inline-block align-center"
              alt="jey's auto logo"
            />
            <div class="section-title-container">
              <p>Jakarta's most finest luxury car dealer founded in 2022</p>
            </div>
            <div class="contact-items-container text-center">
              <div class="contact-item">
                <h6>Address</h6>
                <p>
                  Jl. Jenderal Sudirman No.Kav. 21, RT.10/RW.1, Kuningan, Karet,
                  Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus
                  Ibukota Jakarta 12930
                </p>
              </div>
              <div class="contact-item">
                <h6>Email</h6>
                <p>jeys-auto@mail.com</p>
              </div>
              <div class="contact-item">
                <h6>Phone Number</h6>
                <p>+441238812347</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
