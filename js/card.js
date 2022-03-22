/* eslint-disable quotes */
const RoomsType = {
  PALACE: `Дворец`,
  FLAT: `Квартира`,
  HOUSE: `Дом`,
  BUNGALOW: `Бунгало`,
  HOTEL: `Отель`
};

const addContent = (item, value) => {
  if(value && !value.includes('undefined')){
    item.textContent = value;
  } else {
    item.remove();
  }
};

const renderCard = ({author, offer}) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const map = document.querySelector('#map-canvas');
  const similarAdsFragment = document.createDocumentFragment();
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  addContent(card.querySelector('.popup__type'), RoomsType[offer.type.toUpperCase()]);
  addContent(card.querySelector('.popup__description'), offer.description);
  addContent(card.querySelector('.popup__text--capacity'), `${offer.rooms} комнаты для ${offer.guests} гостей`);
  addContent(card.querySelector('.popup__text--time'), `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  const list = card.querySelector('.popup__features');
  offer.features.map((item) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${item}`);
    li.textContent = item;
    if (li.classList.contains('popup__feature--undefined')) {
      li.remove();
    } else {
      list.appendChild(li);
    }
  });

  if (!list.innerHTML) {
    list.remove();
  }

  const gallery = card.querySelector('.popup__photos');
  offer.photos.forEach((item) => {
    if (item) {
      const cardPhoto = document.createElement('img');
      cardPhoto.classList.add('popup__photo');
      cardPhoto.src = item;
      cardPhoto.width = 45;
      cardPhoto.height = 40;
      cardPhoto.alt = 'Фотография жилья';
      gallery.appendChild(cardPhoto);
    } else {
      gallery.remove();
    }
  });

  if (!gallery.innerHTML) {
    gallery.remove();
  }

  similarAdsFragment.appendChild(card);
  map.append(similarAdsFragment);
};

export {renderCard};
