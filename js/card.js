import {similarAds} from './mock.js';

const TYPES_ROOMS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало' ,
  'hotel': 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');
const similarAdsFragment = document.createDocumentFragment();

similarAds.forEach(({author,offer}) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPES_ROOMS[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__description').textContent = offer.description;

  const list = card.querySelector('.popup__features');
  list.innerHTML = '';
  offer.features.forEach((item)=>{
    const li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${item}`);
    li.textContent = item;
    list.appendChild(li);
  });

  const gallery = card.querySelector('.popup__photos');
  const photoTemplate = card.querySelector('.popup__photo');
  gallery.innerHTML = '';
  offer.photos.forEach((item)=> {
    const cardPhoto = photoTemplate.cloneNode(true);
    cardPhoto.src = item;
    gallery.appendChild(cardPhoto);
  });

  const removeEmptyFields = (element) => {
    if(!element.innerHTML) {
      element.remove();
    }
  };
  removeEmptyFields(card);

  similarAdsFragment.appendChild(card);
});
map.append(similarAdsFragment.children[0]);
