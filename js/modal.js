const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorModal.querySelector('.error__button');
const isEscapeKey = (evt) => evt.key === 'Escape';

const showSuccessModal = () => {
  document.body.appendChild(successModal);
  const keydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successModal.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };

  document.addEventListener('keydown', keydownHandler);

  successModal.addEventListener('click', () => {
    successModal.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
};

const showErrorModal = () => {
  document.body.appendChild(errorModal);
  const keydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorModal.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };

  document.addEventListener('keydown', keydownHandler);

  errorButton.addEventListener('click', () => {
    errorModal.remove();
    document.removeEventListener('keydown', keydownHandler);
  });

  errorModal.addEventListener('click', () => {
    errorModal.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
};

export {showSuccessModal, showErrorModal};
