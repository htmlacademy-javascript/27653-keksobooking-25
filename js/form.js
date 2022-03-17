const form = document.querySelector('.ad-form');
const formFields = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filterFields = filters.querySelectorAll('fieldset, select');
const formButtons = form.querySelectorAll('button');

const blockForm = () => {
  form.classList.add('ad-form--disabled');
  formFields.forEach((item)=>{item.disabled = true;});
  formButtons.forEach((item)=>{item.disabled = true;});

  filters.classList.add('ad-form--disabled');
  filterFields.forEach((item)=>{item.disabled = true;});
};

const unblockForm = () => {
  form.classList.remove('ad-form--disabled');
  formFields.forEach((item)=>{item.disabled = false;});
  formButtons.forEach((item)=>{item.disabled = false;});

  filters.classList.remove('ad-form--disabled');
  filterFields.forEach((item)=>{item.disabled = false;});
};

export {blockForm, unblockForm};
