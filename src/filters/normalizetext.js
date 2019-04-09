export default {
  name: 'normalizetext',
  process: (value) => {
    if (!value) return '';
    value = value.toString();
    value = value.replace('_', ' ').toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
};
