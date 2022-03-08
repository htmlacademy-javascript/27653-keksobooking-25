import {createAd, COUNT_ADS} from './data.js';

const similarAds = Array.from({length: COUNT_ADS}).map((item, idx) => createAd(idx));

console.log(similarAds);
