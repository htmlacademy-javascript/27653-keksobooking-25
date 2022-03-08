const getRandomPositiveNumber = (min, max) => {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if(min > max){
    return max + Math.floor(Math.random() * (min + 1 - max));
  }

  return min + Math.floor(Math.random() * (max + 1 - min));
};

const getRandomFloatNumber = (min, max, digits) => {
  min = Math.abs(min);
  max = Math.abs(max);

  if(min > max) {
    return Number((max + Math.random() * (min - max)).toFixed(digits));
  }

  return Number((min + Math.random() * (max - min)).toFixed(digits));
};

const getRandomElement = (elements) => elements[getRandomPositiveNumber(0, elements.length - 1)];

const getRandomArray = (array) => {
  const newArray = [];

  for(let i = 0; i < getRandomPositiveNumber(1, array.length); i++){
    newArray.push(array[i]);
  }
  return newArray;
};

export {getRandomFloatNumber, getRandomPositiveNumber, getRandomElement, getRandomArray};
