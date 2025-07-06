export function startTimer() {
  const timerElement = document.querySelector(".timer");

  function updateTimer() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0);

    const timeLeft = tomorrow - now;

    if (timeLeft <= 0) {
      timerElement.textContent = "РОТА ПІДЙОМ, ШИКУВАННЯ ЧЕРЕЗ 2 СЕКУНДИ";
      return;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    timerElement.textContent = `До підйому залишилось: ${hours} год ${minutes} хв ${seconds} сек`;

    setTimeout(updateTimer, 1000);
  }

  updateTimer(); // без цього нічого не стартує
}
export function waitRandomTime(min = 1000, max = 5000) {
  const duration = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}