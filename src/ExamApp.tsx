import React, { useEffect, useState } from "react";
import ExamPage from "./components/exam_page";
import { Exam } from "./types/models";
import { ExamTrack, ExamUrl } from "./types/types";
import useWebForm from "./hooks/use-web-form";
import { useParams } from "react-router-dom";

interface ExamProp {
  exam: Exam;
  exam_track: ExamTrack;
  timeRemaining: number;
}

export default function ExamApp() {
  const { examNo } = useParams();
  const [examProp, setExamProp] = useState<ExamProp>(null);
  const [error, setError] = useState(null);
  const webForm = useWebForm({});
  // console.log("ExamApp: examNo:", examNo);
  // console.log("process.env.REACT_APP_EXAM_API_BASE_URL", process.env.REACT_APP_EXAM_API_BASE_URL);

  useEffect(() => {
    const fetchExamData = async () => {
      const res = await webForm.submit((data, web) => {
        return web.post(ExamUrl.StartExam, {
          exam_no: examNo,
          student_code: "", //studentCode
        });
      });

      console.log(res);
      if (!res || !res.ok) {
        console.log(res);
        setError(res.message ?? "Error process request");
        return;
      }
      setExamProp(res.data.data);
    };

    fetchExamData();
  }, []);

  if (webForm.processing) {
    return (
      <div className="message-body">
        <div>
          <button disabled>Loading...</button>
        </div>
      </div>
    );
  }

  if (error || !examProp) {
    return (
      <div className="message-body">
        <div>{error ?? "Error processing exam"}</div>
      </div>
    );
  }

  return (
    <ExamPage
      exam={examProp.exam}
      timeRemaining={examProp.timeRemaining}
      existingAttempts={examProp.exam_track.attempts}
    />
  );
}
