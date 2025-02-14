import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamLogin() {
  const [examNo, setExamNo] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (examNo.trim()) {
      navigate(`/exam/${examNo}`);
    }
  }

  return (
    <div style={{ backgroundColor: "green", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 items-center justify-center min-h-screen bg-gray-100">
            <br />
            <br />
            <br />
            <div className="bg-white p-6 rounded-lg shadow-lg p-4">
              <h4 className="text-xl font-bold mb-4">Enter Exam Number</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="control-label">Exam Number</label>
                  <input
                    type="text"
                    placeholder="Exam Number"
                    value={examNo}
                    onChange={(e) => setExamNo(e.target.value)}
                    className="form-control"
                    // className="w-full p-2 border rounded mb-4"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4 px-4">
                  Start
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
