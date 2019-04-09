const findIndex = (array, value) => array.map(data => data.id).indexOf(value.id);

const findIndexOfObject = (array, key, value) => array.map(data => data[key]).indexOf(value);

export default {
  findIndex,
  findIndexOfObject
};

