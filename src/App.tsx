import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExamLogin from "./ExamLogin";
import ExamApp from "./ExamApp";
import MessageDisplayPage from "./MessageDisplayPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExamLogin />} />
        <Route path="/exam/:examNo" element={<ExamApp />} />
        <Route path="/exam/submitted" element={<MessageDisplayPage />} />
      </Routes>
    </Router>
  );
}
