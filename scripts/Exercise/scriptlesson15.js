import isSatSun from './lesson15exercise.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();
const add5Days = today.add(5, 'day');
const formatadd5Days = add5Days.format('MMMM D dddd');

console.log(formatadd5Days);

const add1month = today.add(1,'month');
const formatadd1month = add1month.format('MMMM D dddd');

console.log(formatadd1month);

const sub1month = today.subtract(1,'month')
const formantsub1month = sub1month.format('MMMM D');

console.log(formantsub1month);

isSatSun(today);
isSatSun(add5Days);