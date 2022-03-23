const form = document.querySelector('.ad-form');
const formFields = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filterFields = filters.querySelectorAll('fieldset, select');

const toggleForm = (isBlock) => {
  if(isBlock){
    form.classList.add('ad-form--disabled');
    filters.classList.add('ad-form--disabled');
    formFields.forEach((item)=>{
      item.disabled = isBlock;
    });
    filterFields.forEach((item)=>{
      item.disabled = isBlock;
    });
  }
};

toggleForm(false);
