const form = document.querySelector('.ad-form');
const formFields = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filterFields = filters.querySelectorAll('fieldset, select');
const fieldsArray = [...filterFields, ...formFields];


const toggleForm = (isBlock) => {
  form.classList.toggle('ad-form--disabled', isBlock);
  filters.classList.toggle('ad-form--disabled', isBlock);
  fieldsArray.forEach((item) => {
    item.disabled = isBlock;
  });
};

toggleForm(true);

const blockFilters = (isBlock) => {
  filters.classList.add('ad-form--disabled');
  filterFields.forEach((item) => {
    item.disabled = isBlock;
  });
};

export {toggleForm, blockFilters, filters};
