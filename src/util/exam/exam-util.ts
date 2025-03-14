import { Exam } from '../../types/models';
import { WebForm } from '../../hooks/use-web-form';
import { ExamAttempt, ExamUrl } from '../../types/types';

export interface ExamTab {
  currentQuestionIndex: number;
  exam_course_id: number;
}

class ExamUtil {
  private attemptManager: AttemptManager;
  private tabManager: TabManager;
  private examNavManager: ExamNavManager;
  constructor(
    private exam: Exam,
    private existingAttempts: ExamAttempt,
    private reRender: () => void
  ) {
    this.attemptManager = new AttemptManager(
      exam,
      existingAttempts,
      this.reRender
    );
    this.tabManager = new TabManager(this.exam, this.reRender);
    this.examNavManager = new ExamNavManager(
      this.exam,
      this.tabManager,
      this.reRender
    );
  }
  getAttemptManager() {
    return this.attemptManager;
  }
  getTabManager() {
    return this.tabManager;
  }
  getExamNavManager() {
    return this.examNavManager;
  }
}

class TabManager {
  constructor(
    private exam: Exam,
    private reRender: () => void
  ) {}
  public tabs: {
    [tabIndex: number]: ExamTab;
  } = {};
  public currentTabIndex = 0;

  setCurrentTabIndex(tabIndex: number) {
    this.currentTabIndex = tabIndex;
    this.reRender();
  }
  getCurrentTabIndex() {
    return this.currentTabIndex;
  }
  getCurrentTab() {
    return this.tabs[this.currentTabIndex];
  }
  getTab(tabIndex: number): ExamTab {
    return this.tabs[tabIndex] ?? ({} as ExamTab);
  }
  setTab(tabIndex: number, examTab: ExamTab) {
    this.tabs[tabIndex] = examTab;
  }
  setCurrentQuestion(currentQuestionIndex: number) {
    const tab = this.tabs[this.currentTabIndex];
    if (!tab) {
      // console.log(`Tab of ${this.currentTabIndex} index, has not been set`);
      return;
    }
    this.tabs[this.currentTabIndex] = {
      currentQuestionIndex: currentQuestionIndex,
      exam_course_id: tab.exam_course_id
    };
    this.reRender();
  }
  getCurrentQuestion() {
    return this.getCurrentCourseQuestions()?.[
      this.getCurrentTab().currentQuestionIndex
    ];
  }
  getCurrentQuestionIndex() {
    return this.getCurrentTab().currentQuestionIndex;
  }
  getCurrentCourseQuestions() {
    const examCourse = this.exam.exam_courses![this.currentTabIndex];
    const questions = examCourse.course_session!.questions!;
    return questions;
  }
}

class AttemptManager {
  private attempts: ExamAttempt = {};
  private attemptsToSend: ExamAttempt = {};
  constructor(
    private exam: Exam,
    existingAttempts: ExamAttempt,
    private reRender: () => void
  ) {
    this.attempts = existingAttempts;
    // console.log('existing attempts', existingAttempts);
  }
  setAttempt(questionId: number, attempt: string) {
    this.attempts[questionId] = attempt;
    this.attemptsToSend[questionId] = attempt;
    this.reRender();
  }
  getAttempt(questionId: number) {
    return this.attempts[questionId];
  }
  isAttempted(questionId: number) {
    return Boolean(this.attempts[questionId]);
  }

  resetAttempts() {
    this.attempts = {};
    this.attemptsToSend = {};
  }

  async sendAttempts(webForm: WebForm<{}, Record<never, string>>) {
    // console.log('Sending attempts', this.attemptsToSend);
    if (Object.entries(this.attemptsToSend).length < 1) {
      return;
    }
    const submittingAttempts = this.attemptsToSend;
    this.attemptsToSend = {};

    const res = await webForm.submit((data, web) => {
      return web.post(ExamUrl.AttemptQuestion, {
        attempts: submittingAttempts,
        exam_no: this.exam.exam_no,
        event_id: this.exam.event_id
      });
    });
    if (res.ok) {
      return;
    }
    this.attemptsToSend = {
      ...submittingAttempts,
      ...this.attemptsToSend
    };
  }
}

class ExamNavManager {
  constructor(
    private exam: Exam,
    private tabManager: TabManager,
    private reRender: () => void
  ) {}
  private canGoNext(currentQuestionIndex: number) {
    return (
      currentQuestionIndex <
      this.tabManager.getCurrentCourseQuestions().length - 1
    );
  }
  private canGoPrevious(currentQuestionIndex: number) {
    return currentQuestionIndex > 0;
  }
  getGoNextIndex() {
    const currentQuestionIndex = this.tabManager.getCurrentQuestionIndex();
    if (!this.canGoNext(currentQuestionIndex)) {
      return currentQuestionIndex;
    }
    return currentQuestionIndex + 1;
  }
  getGoPreviousIndex() {
    const currentQuestionIndex = this.tabManager.getCurrentQuestionIndex();
    if (!this.canGoPrevious(currentQuestionIndex)) {
      return currentQuestionIndex;
    }
    return currentQuestionIndex - 1;
  }
}

export default ExamUtil;
