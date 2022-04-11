/* eslint-disable quotes */
const RoomsType = {
  PALACE: `Дворец`,
  FLAT: `Квартира`,
  HOUSE: `Дом`,
  BUNGALOW: `Бунгало`,
  HOTEL: `Отель`
};

const addContent = (item, value) => {
  if(value){
    item.textContent = value;
  } else {
    item.remove();
  }
};

const renderCard = ({author, offer}) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarAdsFragment = document.createDocumentFragment();
  const card = cardTemplate.cloneNode(true);
  const list = card.querySelector('.popup__features');
  const gallery = card.querySelector('.popup__photos');

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  addContent(card.querySelector('.popup__type'), RoomsType[offer.type.toUpperCase()]);
  addContent(card.querySelector('.popup__description'), offer.description);
  addContent(card.querySelector('.popup__text--capacity'), `${offer.rooms} комнаты для ${offer.guests} гостей`);
  addContent(card.querySelector('.popup__text--time'), `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  const addFeatures = (features) => {
    for(const key in features) {
      const li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${features[key]}`);
      li.textContent = features[key];
      list.appendChild(li);
    }
    if (!features) {
      list.remove();
    }
  };
  addFeatures(offer.features);

  const addPhotos = (photos) => {
    for(const key in photos){
      const cardPhoto = document.createElement('img');
      cardPhoto.classList.add('popup__photo');
      cardPhoto.src = photos[key];
      cardPhoto.width = 45;
      cardPhoto.height = 40;
      cardPhoto.alt = 'Фотография жилья';
      gallery.appendChild(cardPhoto);
    }
    if(!photos) {
      gallery.remove();
    }
  };
  addPhotos(offer.photos);

  similarAdsFragment.appendChild(card);
  return card;
};

export {renderCard};
