const form = document.querySelector('.ad-form');
const formFields = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filterFields = filters.querySelectorAll('fieldset, select');

const toggleForm = (isBlock) => {
  form.classList.toggle('ad-form--disabled', isBlock);
  filters.classList.toggle('ad-form--disabled', isBlock);
  formFields.forEach((item)=>{
    item.disabled = isBlock;
  });
  filterFields.forEach((item)=>{
    item.disabled = isBlock;
  });
};

export {toggleForm};
