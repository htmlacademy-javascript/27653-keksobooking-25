function getRandomPositiveNumber(min, max) {
  if(min < 0 || min > max) {
    return 0;
  }
  return min + Math.floor(Math.random() * (max + 1 - min));
}
getRandomPositiveNumber(0, 20);

function getRandomFloatNumber(min, max, digits) {
  if(min < 0 || min > max) {
    return 0;
  }
  return Number((min + Math.random() * (max - min)).toFixed(digits));
}
getRandomFloatNumber(1.1, 1.2, 3);
