import React from "react";
import { Link } from "react-router-dom";

export default function MessageDisplayPage() {
  return (
    <div style={{ backgroundColor: "green", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 items-center justify-center min-h-screen bg-gray-100">
            <br />
            <br />
            <br />
            <div className="card message-card text-center p-4">
              <div className="card-body">
                <h2 className="message-title text-success mb-3">
                  Congratulations!
                </h2>
                <p className="fs-5 mt-4">
                  You have successfully completed the exam. Hope you had a
                  smooth experience
                </p>
                <p className="text-muted mt-5 fs-6">
                  Thank you for taking the exam with us!
                </p>
                <div className="d-grid gap-2 mt-4">
                  <Link to={"/"} className="btn btn-primary">
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
