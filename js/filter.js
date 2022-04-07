const filters = document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');
const housingFeatures = filters.querySelector('#housing-features');
const featuresFields = housingFeatures.querySelectorAll('map__checkbox');

const DEFAULT = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const RESET_TIMEOUT = 500;

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

const getFilter = ({offer}) =>
  filterValue(housingType, offer.type) && filterValue(housingPrice, filterPrice(offer.price)) &&
  filterValue(housingRooms, offer.rooms) && filterValue(housingGuests, offer.guests) &&
  filterFeatures(offer.features);


const getRank = ({offer}) => {
  let rank = 0;
  if (offer.features) {
    featuresFields.forEach((feature) => {
      if (offer.features.includes(feature.value)) {
        rank += 1;
      }
    });
  }
  return rank;
};

const compareFeatures = (featureA, featureB) => {
  const rankA = getRank(featureA);
  const rankB = getRank(featureB);
  return rankB - rankA;
};

const resetFiltres = (cb) => {
  filters.addEventListener('reset', () => setTimeout(cb, RESET_TIMEOUT));
};

const changeFilters = (cb) => {
  filters.addEventListener('change', cb);
};

export {resetFiltres, getFilter, changeFilters, compareFeatures};
