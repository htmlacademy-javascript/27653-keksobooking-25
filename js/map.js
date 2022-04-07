import {toggleForm, blockFilters} from './form.js';
import {renderCard} from './card.js';
import {loadData} from './api.js';
import {getFilter, compareFeatures, resetFiltres, changeFilters} from './filter.js';
import {debounce} from './utils.js';

const LAT_CENTER = 35.652832;
const LNG_CENTER = 139.839478;
const SCALE = 12;

const MAIN_PIN_SIZE = 52;
const AD_PIN_SIZE = 40;

const MESSAGE_DELAY = 5000;
const TIMEOUT_DELAY = 500;

const address = document.querySelector('#address');

const mapCanvas = L.map('map-canvas').on('load', () => {
  toggleForm(false);
  address.value = `${LAT_CENTER.toFixed(5)} ${LNG_CENTER.toFixed(5)}`;
}).setView({
  lat: LAT_CENTER,
  lng: LNG_CENTER,
}, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE/2, MAIN_PIN_SIZE],
});

const mainPin = L.marker(
  {
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  },
  {
    icon: mainPinIcon,
    draggable: true,
  },
);

mainPin.addTo(mapCanvas);

mainPin.on('moveend', (evt) => {
  const points = evt.target.getLatLng();
  address.value = `${points.lat.toFixed(5)}, ${points.lng.toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [AD_PIN_SIZE, AD_PIN_SIZE],
  iconAnchor: [AD_PIN_SIZE/2, AD_PIN_SIZE],
});

const markerGroup = L.layerGroup().addTo(mapCanvas);

const createMarker = (point) => {
  const lat = point.location.lat;
  const lng = point.location.lng;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(renderCard(point));
};

const createGroupMarkers = (points) => {
  markerGroup.clearLayers();
  points.slice().filter(getFilter).slice(0, 10).sort(compareFeatures).forEach((point) => {
    createMarker(point);
  });
};

const resetPin = () => {
  mainPin.setLatLng({
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  });
  mapCanvas.setView({
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  }, SCALE).closePopup();
  address.value = `${mainPin.getLatLng().lat}, ${mainPin.getLatLng().lng}`;
  markerGroup.clearLayers();
};

const alertMessage = (err) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-container');
  alertContainer.textContent = err;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, MESSAGE_DELAY);
};

const onSuccess  = (points) => {
  createGroupMarkers(points);
  changeFilters(debounce(() => createGroupMarkers(points),
    TIMEOUT_DELAY,
  ));
  resetFiltres(() => createGroupMarkers(points));
};

const onError = () => {
  blockFilters();
  alertMessage('Не удалось загрузить данные. Попробуйте еще раз.');
};

loadData(onSuccess, onError);

export {resetPin};
