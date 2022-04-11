const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorModal.querySelector('.error__button');
const isEscapeKey = (evt) => evt.key === 'Escape';

const showSuccessModal = () => {
  document.body.appendChild(successModal);
  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successModal.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };

  document.addEventListener('keydown', onKeydown);

  successModal.addEventListener('click', () => {
    successModal.remove();
    document.removeEventListener('keydown', onKeydown);
  });
};

const showErrorModal = () => {
  document.body.appendChild(errorModal);
  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorModal.remove();
      document.removeEventListener('keydown', onKeydown);
    }
  };

  document.addEventListener('keydown', onKeydown);

  errorButton.addEventListener('click', () => {
    errorModal.remove();
    document.removeEventListener('keydown', onKeydown);
  });

  errorModal.addEventListener('click', () => {
    errorModal.remove();
    document.removeEventListener('keydown', onKeydown);
  });
};

export {showSuccessModal, showErrorModal};
