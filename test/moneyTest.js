import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite: format currency');

console.log('converts cents into dollars')

formatCurrency(2095) === '20.95' ? console.log('passed') : console.log('failed');

console.log('works with zero')

formatCurrency(0) === '0.00' ? console.log('passed') : console.log('failed');

console.log('rounds up to the nearest cents');

formatCurrency(2000.5) === '20.01' ? console.log('passed') : console.log('failed');

console.log('rounds up to the nearest cents 2nd case');

formatCurrency(2000.4) === '20.00' ? console.log('passed') : console.log('failed');