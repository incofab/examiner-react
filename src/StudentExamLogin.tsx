import React from "react";
import { useNavigate } from "react-router-dom";
import useWebForm from "./hooks/use-web-form";
import { preventNativeSubmit } from "./util/util";
import useMyToast from "./hooks/use-my-toast";
import { ExamUrl } from "./types/types";
import startTimeHandler from "./util/start-time";

export default function StudentExamLogin() {
  const navigate = useNavigate();
  const { toastError, handleResponseToast } = useMyToast();
  const webForm = useWebForm({
    event_code: "",
    student_code: "",
    student_code_confirmation: "",
    name: "",
  });

  async function handleSubmit() {
    if (!webForm.data.event_code || !webForm.data.student_code) {
      toastError("Please fill in all fields");
      return;
    }
    const res = await webForm.submit((data, web) =>
      web.post(ExamUrl.CreateExamByCode, data)
    );

    if (!handleResponseToast(res)) {
      return;
    }
    startTimeHandler.reset();
    navigate(`/exam/${res.data.data.exam_no}`);
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
              <form onSubmit={preventNativeSubmit(handleSubmit)}>
                <div className="form-group">
                  <label className="control-label">Event Code</label>
                  <input
                    type="text"
                    placeholder="Event Code"
                    value={webForm.data.event_code}
                    onChange={(e) =>
                      webForm.setValue("event_code", e.target.value)
                    }
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <label className="control-label">Student Code</label>
                  <input
                    type="text"
                    placeholder="Student Code"
                    value={webForm.data.student_code}
                    onChange={(e) =>
                      webForm.setValue("student_code", e.target.value)
                    }
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Confirm Student Code</label>
                  <input
                    type="text"
                    placeholder="Confirm Student Code"
                    value={webForm.data.student_code_confirmation}
                    onChange={(e) =>
                      webForm.setValue(
                        "student_code_confirmation",
                        e.target.value
                      )
                    }
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={webForm.data.name}
                    onChange={(e) => webForm.setValue("name", e.target.value)}
                    className="form-control"
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
