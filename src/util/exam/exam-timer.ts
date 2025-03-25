import START_TIME from "../start-time";

class ExamTimer {
  private intervalId: any;
  private readonly PING_INTERVAL = 5;
  private pingCounter = 0;
  private startTime: Date;
  private endTime: Date;

  constructor(
    private onTimerTick: (timeRemaining: number) => void,
    private onTimeElapsed: () => void,
    private onIntervalPing: () => void
  ) {
    this.reset();
  }

  start(duration: number) {
    this.startTime = START_TIME; //new Date();
    this.endTime = new Date(this.startTime);
    this.endTime.setSeconds(this.endTime.getSeconds() + duration);

    this.evaluateTime();

    this.intervalId = setInterval(() => {
      this.pingCounter++;
      this.evaluateTime();
    }, 1000);
  }

  evaluateTime() {
    if (this.pingCounter > this.PING_INTERVAL) {
      this.pingCounter = 0;
      this.onIntervalPing();
    }

    let rem = this.endTime.getTime() - new Date().getTime();
    rem = Math.floor(rem / 1000);

    if (rem < 1) {
      this.onTimeElapsed();
      this.stop();
      return;
    }

    this.onTimerTick(rem);
  }

  stop() {
    if (this.intervalId !== 0) {
      clearInterval(this.intervalId);
    }
    this.reset();
  }

  reset() {
    this.intervalId = 0;
  }
}

export default ExamTimer;
