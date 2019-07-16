const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const QuantityOptions = arr.map(item => {
  return {
    name: item,
    value: item
  };
});

QuantityOptions.push({
  value: 10,
  name: '10+'
});

export default QuantityOptions;
