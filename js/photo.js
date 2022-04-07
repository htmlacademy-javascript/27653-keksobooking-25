const avatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const roomsPhoto = document.querySelector('#images');
const roomsPreview = document.querySelector('.ad-form__photo');

const DEFAULT_PHOTO = 'img/muffin-grey.svg';
const ROOMS_PHOTO_SIZE = '100%';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

avatar.addEventListener('change', () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)
  );

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

roomsPhoto.addEventListener('change', () => {
  const file = roomsPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  const previewImg = document.createElement('img');
  previewImg.src = URL.createObjectURL(file);
  previewImg.style.width = ROOMS_PHOTO_SIZE;
  previewImg.style.height = ROOMS_PHOTO_SIZE;
  const contains = roomsPreview.querySelector('img');

  if (matches) {
    if(contains){
      contains.src = URL.createObjectURL(file);
    } else {
      roomsPreview.append(previewImg);
    }
  }
});

const resetPhotos = () => {
  avatarPreview.src = DEFAULT_PHOTO;
  roomsPreview.innerHTML = '';
};

export {resetPhotos};
