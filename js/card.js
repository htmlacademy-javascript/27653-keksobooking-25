const RoomsType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало' ,
  hotel: 'Отель'
};

const renderCard = (obj) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const map = document.querySelector('#map-canvas');
  const similarAdsFragment = document.createDocumentFragment();

  obj.forEach(({author,offer}) => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = author.avatar;
    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

    if(offer.type){
      card.querySelector('.popup__type').textContent = RoomsType[offer.type];
    } else {
      card.querySelector('.popup__type').remove();
    }

    if(offer.rooms && offer.quests) {
      card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    } else {
      card.querySelector('.popup__text--capacity').remove();
    }

    if(offer.checkin && offer.checkout) {
      card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    } else {
      card.querySelector('.popup__text--time').remove();
    }

    if(offer.description) {
      card.querySelector('.popup__description').textContent = offer.description;
    } else {
      card.querySelector('.popup__description').remove();
    }

    const list = card.querySelector('.popup__features');
    offer.features.map((item)=>{
      const li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${item}`);
      li.textContent = item;
      if(li.classList.contains('popup__feature--undefined')){
        li.remove();
      } else {
        list.appendChild(li);
      }
    });

    if(!list.innerHTML){
      list.remove();
    }

    const gallery = card.querySelector('.popup__photos');
    offer.photos.forEach((item)=> {
      if(item) {
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

    if(!gallery.innerHTML){
      gallery.remove();
    }

    similarAdsFragment.appendChild(card);
  });
  map.append(similarAdsFragment.children[0]);
};

export {renderCard};
