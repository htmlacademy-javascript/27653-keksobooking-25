const loadData = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch(() => onError('Не удалось загрузить объявления. Попробуйте ещё раз'));
};


const sendData = (onSuccess, onError, body) => {
  fetch('https://25.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError('Не удалось отправить форму. Попробуйте еще раз'));
};

export {loadData, sendData};
