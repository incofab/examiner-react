import { Exam } from "./models";

export interface ExamAttempt {
  [questionId: string | number]: string;
}

export interface ExamTrack extends Exam {
  attempts: ExamAttempt;
}

export const baseUrl = process.env.REACT_APP_EXAM_API_BASE_URL;
export const usesInternet: boolean =
  process.env.REACT_APP_USES_INTERNET === "true";

export const ExamUrl = {
  EndExam: `${baseUrl}exam-route/end-exam.php`,
  AttemptQuestion: `${baseUrl}exam-route/attempt-question.php`,
  ExamLogin: `${baseUrl}exam/login`,
  StartExam: `${baseUrl}api/exam/start`,
};
