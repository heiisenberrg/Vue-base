export default {
  name: 'focus',
  process: {
    // When the bound element is inserted into the DOM...
    inserted(el) {
      // Focus the element
      el.focus();
    }
  }
};

