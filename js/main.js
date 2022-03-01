const COUNT_ADS = 10;

const TITLES = [
  'Отель в деловом центре',
  'Прекрасные апартаменты для двоих',
  'Роскошное бунгало для большой компании',
  'Бунгало с японским садом и террасами',
  'Дворец в стиле японской классики',
  'Отель эконом-класса',
  'Дом в тихом районе города',
  'Квартира с видом на залив',
  'Дом целиком',
  'Дворец для проведения исторических реконструкций'
];

const DESCRIPTIONS = [
  'Просторные номера в элегантном европейском стиле',
  '3 спальни, гостиная, оборудованная кухня с обеденной зоной и 1 ванная комната',
  'Удобные кровати, душ, парковка отсутствует',
  'В японском стиле с футоном',
  'Состоит из 4 отдельных спален, 1 ванной комнаты и гостиной.',
  'Номера с бесплатным WiFi, кондиционером, садом и террасой.',
  '3 этажа, 3 спальни, терраса на крыше, вид на город',
  'Современные номера, торговые автоматы по продаже напитков, прокат ноутбуков',
  'Красивый дворец в центре Токио',
  'Светлые, большие номера и паркетный пол в сочетании с новой современной мебелью'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const SERVICES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const MAX_PRICE = 100000;

const COUNT_ROOMS = 100;

const COUNT_GUESTS = 3;

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG =  139.80000;

const getRandomPositiveNumber = (min, max) => {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if(min > max){
    return max + Math.floor(Math.random() * (min + 1 - max));
  }

  return min + Math.floor(Math.random() * (max + 1 - min));
};

const getRandomFloatNumber = (min, max, digits) => {
  min = Math.abs(min);
  max = Math.abs(max);

  if(min > max) {
    return Number((max + Math.random() * (min - max)).toFixed(digits));
  }

  return Number((min + Math.random() * (max - min)).toFixed(digits));
};

const getRandomElement = (elements) => elements[getRandomPositiveNumber(0, elements.length - 1)];

const getRandomArray = (array) => {
  const newArray = [];

  for(let i = 0; i < getRandomPositiveNumber(1, array.length); i++){
    newArray.push(array[i]);
  }
  return newArray;
};

let number = 0;
const getRandomAvatar = () => {
  number += 1;

  if(number <= COUNT_ADS) {
    return `img/avatars/user0${number - 1}.png`;
  }
  return `img/avatars/user${number - 1}.png`;

};

const createAds = () => {
  const lat = getRandomFloatNumber(MIN_LAT, MAX_LAT, 5);
  const lng = getRandomFloatNumber(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: getRandomAvatar(),
    },

    offer: {
      title: getRandomElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveNumber(0, MAX_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomPositiveNumber(1, COUNT_ROOMS),
      guests: getRandomPositiveNumber(0, COUNT_GUESTS),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomArray(SERVICES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },

    location: {
      lat: lat,
      lng: lng,
    }
  };
};
createAds();

const similarAds = Array.from({length: COUNT_ADS}, createAds);

const getSimilarAds = similarAds;
getSimilarAds();
