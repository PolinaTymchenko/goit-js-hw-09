import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateInput: document.querySelector("#datetime-picker"),
    startButton: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const dateNow = Date.now();

      if (selectedDate <= dateNow) {
          Notiflix.Notify.failure("Please choose a date in the future");
      } else {
          refs.startButton.disabled = false;
      }
    },
};

const timer = {
    timerId: null,
    start() {
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const selectedDate = new Date(refs.dateInput.value).getTime();
            const deltaTime = selectedDate - currentTime;
            const time = convertMs(deltaTime);

            if (deltaTime < 0) {
                clearInterval(this.timerId)
                return;
            }

            updateTimerMarkup(time);
        }, 1000)
    },

};

flatpickr(refs.dateInput, options);

refs.startButton.disabled = true;

refs.startButton.addEventListener("click", () => {
    timer.start();
});

function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
      return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function updateTimerMarkup({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}
