import './sass/main.scss';
import CountdownTimer from './js/CountdownTimer.js';

const timer = new CountdownTimer('#timer-1', new Date('Jan 23, 2022'));
timer.start();
