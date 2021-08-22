const pad = value => {
  return String(value).padStart(2, '0');
};

export default class CountdownTimer {
  _timerId = null;
  _setTimer;
  _onTick;

  constructor(selector, targetDate) {
    this.selector = selector;
    this.targetDate = targetDate.getTime();
    this.timerEl = document.querySelector(this.selector);
    this.daysEl = this.timerEl.querySelector('[data-value="days"]');
    this.hoursEl = this.timerEl.querySelector('[data-value="hours"]');
    this.minsEl = this.timerEl.querySelector('[data-value="mins"]');
    this.secsEl = this.timerEl.querySelector('[data-value="secs"]');
  }

  _setTimer = ({ days, hours, mins, secs }) => {
    this.daysEl.textContent = pad(days);
    this.hoursEl.textContent = pad(hours);
    this.minsEl.textContent = pad(mins);
    this.secsEl.textContent = pad(secs);
  };

  _onTick = () => {
    const time = this.targetDate - Date.now();

    if (time < 0) {
      this._setTimer({ days: 0, hours: 0, mins: 0, secs: 0 });
      return;
    }

    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this._setTimer({ days, hours, mins, secs });
  };

  start = function () {
    this._onTick();
    this._timerId = setInterval(this._onTick, 1000);
  };

  stop = function () {
    clearInterval(this._timerId);
  };
}
