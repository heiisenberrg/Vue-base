let element = document;
export default {
  name: 'clickaway',
  process: {
    inserted(el, binding, vnode) {
      const { context } = vnode;
      const { value, modifiers } = binding;
      element = modifiers.modal ? context.$parent.$el : document;
      element.addEventListener('click', (e) => {
        if (!el.contains(e.target)) {
          value();
        }
      });
    },
    unbind() {
      element.removeEventListener('click', () => {});
    }
  }
};
