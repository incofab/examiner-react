import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExamLogin from "./ExamLogin";
import ExamApp from "./ExamApp";
import MessageDisplayPage from "./MessageDisplayPage";
import StudentExamLogin from "./StudentExamLogin";

export default function App() {
  return (
    <Router basename={process.env.REACT_APP_ROUTER_BASE_NAME}>
      <Routes>
        <Route path="/" element={<ExamLogin />} />
        <Route path="/student" element={<StudentExamLogin />} />
        <Route path="/exam/:examNo" element={<ExamApp />} />
        <Route path="/exam/submitted" element={<MessageDisplayPage />} />
      </Routes>
    </Router>
  );
}
