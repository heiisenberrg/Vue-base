const isEmpty = (value) => {
  if (!value) return false;
  if (Array.isArray(value)) return Boolean(value.length);
  return value ? Boolean(Object.keys(value).length) : false;
};
const isNotEmpty = value => isEmpty(value);
const clone = (value) => {
  // only objects are have reference
  if (typeof value !== 'object') return value;
  return Object.assign(Array.isArray(value) ? [] : {}, value);
};
const merge = (parent, values) => Object.assign(parent, values);

export {
  isEmpty,
  isNotEmpty,
  clone,
  merge
};
