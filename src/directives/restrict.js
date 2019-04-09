export default {
  name: 'restrict',
  process: {
    bind(el) {
      el.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }
  }
};
