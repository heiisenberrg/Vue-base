import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

const isBetween = {
  getMessage(field, args) {
    return `${field} has to be between ${args[0]} and ${args[1]}`;
  },
  validate(value, { min, max }) {
    return !(min && max) || (Number(min) <= value && Number(max) >= value);
  }
};

// The first param is called 'min', and the second is called 'max'.
const paramNames = ['min', 'max'];
Validator.extend('between', isBetween, {
  paramNames //  pass it in the extend options.
});

Vue.use(VeeValidate);
