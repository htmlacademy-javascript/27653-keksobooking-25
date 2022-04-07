const LOAD_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_LINK = 'https://25.javascript.pages.academy/keksobooking';

const loadData = (onSuccess, onError) => {
  fetch(LOAD_LINK,
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
    .catch(() => onError());
};


const sendData = (onSuccess, onError, body) => {
  fetch(SEND_LINK, {
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
    .catch(() => onError());
};

export {loadData, sendData};
