const loadData = (link, onSuccess, onError) => {
  fetch(link,
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


const sendData = (link, onSuccess, onError, body) => {
  fetch(link, {
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
