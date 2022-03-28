import {MAX_ROOM_PRICE} from './mock.js';
/* eslint-disable quotes */
const form = document.querySelector('.ad-form');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MIN_ROOM_PRICE = 0;

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const titleLength = form.querySelector('#title');
const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
pristine.addValidator(titleLength, validateTitle, `Не меньше ${MIN_TITLE_LENGTH} и не больше ${MAX_TITLE_LENGTH} символов`, 2, true);

const priceRooms = form.querySelector('#price');
const validatePrice = (value) => value >= MIN_ROOM_PRICE && value <= MAX_ROOM_PRICE;
pristine.addValidator(priceRooms, validatePrice, `Maксимальная цена: ${MAX_ROOM_PRICE} р.`, 2, true);

const roomsNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');
const roomOption = {
  '1': ['1'],
  '2': ['2','1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const validateRooms = () => roomOption[roomsNumber.value].includes(guestNumber.value);
pristine.addValidator(roomsNumber, validateRooms, 'Измените количество комнат');
pristine.addValidator(guestNumber, validateRooms, 'Измените количество гостей');

roomsNumber.addEventListener('change', () => {
  pristine.validate(guestNumber);
});

guestNumber.addEventListener('change', () => {
  pristine.validate(roomsNumber);
});

const typeHouse = form.querySelector('#type');
const MinPrice = {
  BUNGALOW: `0`,
  FLAT: `1000`,
  HOTEL: `3000`,
  HOUSE: `5000`,
  PALACE: `10000`
};

const validateMinPrice = () => priceRooms.value >= Number(MinPrice[typeHouse.value.toUpperCase()]);
const errorText = () => `Минимальная цена: ${MinPrice[typeHouse.value.toUpperCase()]} p.`;

typeHouse.addEventListener('change', (evt) => {
  priceRooms.placeholder = MinPrice[evt.target.value.toUpperCase()];
});
pristine.addValidator(priceRooms, validateMinPrice, errorText);
pristine.addValidator(typeHouse, validateMinPrice);

typeHouse.addEventListener('change', () => {
  pristine.validate(priceRooms);
});

const priceSlider = document.querySelector('.ad-form__slider');

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max:  MAX_ROOM_PRICE,
  },
  start: 0,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

priceSlider.noUiSlider.on('slide', () => {
  priceRooms.value = priceSlider.noUiSlider.get(priceRooms.value);
  pristine.validate(priceRooms);
});

priceRooms.addEventListener('input', () => {
  priceSlider.noUiSlider.get(priceRooms.value);
  priceSlider.noUiSlider.updateOptions({
    start: priceRooms.value
  });
});

const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const onTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
timeOut.addEventListener('change', onTimeChange);
timeIn.addEventListener('change', onTimeChange);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid){
    evt.preventDefault();
  }
}
);
