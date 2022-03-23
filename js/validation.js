const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const titleLength = form.querySelector('#title');
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(titleLength, validateTitle, 'Не меньше 30 и не больше 100 символов', 2, true);

const priceRooms = form.querySelector('#price');
const validatePrice = (value) => value > 0 && value <= 100000;
pristine.addValidator(priceRooms, validatePrice, 'Maксимальная цена: 100 000 р.', 2, true);

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
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const validateMinPrice = () => priceRooms.value >=  minPrice[typeHouse.value];
const errorText = () => `Минимальная цена: ${minPrice[typeHouse.value]} p.`;

typeHouse.addEventListener('change', (evt) => {
  priceRooms.placeholder = minPrice[evt.target.value];
});
pristine.addValidator(priceRooms, validateMinPrice, errorText);
pristine.addValidator(typeHouse, validateMinPrice);

typeHouse.addEventListener('change', () => {
  pristine.validate(priceRooms);
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
