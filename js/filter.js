import {createMarker} from './map.js';

const filters = document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');
const housingFeatures = filters.querySelector('#housing-features');

const DEFAULT = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const RESET_TIMEOUT = 500;
const COUNT_ADS = 10;

const filterPrice = (price) => {
  if (price > MAX_PRICE) {
    return 'high';
  }
  if ((price >= MIN_PRICE) && (price <= MAX_PRICE)) {
    return 'middle';
  }
  if (price < MIN_PRICE) {
    return 'low';
  }
};

const filterFeatures = (features=[]) => {
  const checked = Array.from(housingFeatures.querySelectorAll(':checked'));
  const featureValue = checked.map((feature) => feature.value);
  return  featureValue.every((feature) => features.includes(feature));
};

const filterValue = (input, card) => input.value === card || Number(input.value) === card || input.value === DEFAULT;

const filterCards = (card) => filterValue(housingType, card.offer.type) && filterValue(housingPrice, filterPrice(card.offer.price)) &&
  filterValue(housingRooms, card.offer.rooms) && filterValue(housingGuests, card.offer.guests) &&
  filterFeatures(card.offer.features);

const getFilter = (data) => {
  const ads = [];
  for (let i = 0; i < data.length; i++) {
    if (filterCards(data[i])) {
      createMarker(data[i]);
      ads.push(data[i]);
    }
    if (ads.length === COUNT_ADS) {
      break;
    }
  }
};

const resetFiltres = (cb) => {
  filters.addEventListener('reset', () => setTimeout(cb, RESET_TIMEOUT));
};

const changeFilters = (cb) => {
  filters.addEventListener('change', cb);
};

export {resetFiltres, getFilter, changeFilters};
