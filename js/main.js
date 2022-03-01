const getRandomPositiveNumber = (min, max) => {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if(min > max){
    return max + Math.floor(Math.random() * (min + 1 - max));
  }

  return min + Math.floor(Math.random() * (max + 1 - min));
};

getRandomPositiveNumber();

const getRandomFloatNumber = (min, max, digits) => {
  min = Math.abs(min);
  max = Math.abs(max);

  if(min > max) {
    return Number((max + Math.random() * (min - max)).toFixed(digits));
  }

  return Number((min + Math.random() * (max - min)).toFixed(digits));
};

getRandomFloatNumber();
