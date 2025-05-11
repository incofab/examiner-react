// var START_TIME = new Date(); // This will be set once when the script runs

// export function resetStartTime() {
//   START_TIME = new Date();
// }

// export default START_TIME;

class StartTimeHandler {
  private startTime: Date = new Date();

  getStartTime() {
    return this.startTime;
  }

  reset() {
    this.startTime = new Date();
  }
}

const startTimeHandler = new StartTimeHandler();

export default startTimeHandler;
