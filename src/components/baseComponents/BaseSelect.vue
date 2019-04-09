
<template>
  <div
    v-clickaway.modal="clickAway"
    class="form-group"
  >
    <label
      class="col-12 p-0"
      for="cycle-break"
    >{{ label }}</label>
    <div id="color-picker col-12">
      <div class="wrapper-dropdown">
        <span
          class="form-control"
          @click="toggleDropdown"
        >
          <span
            v-bind="labelAttrs"
          >{{ value }}
          </span>
        </span>
        <ul
          v-show="showoptions"
          class="dropdown"
        >
          <li
            v-for="(option, key) in options"
            :key="key"
            @click="onSelectValue(option)"
          ><span
            v-bind="option.attrs"
          /> {{ option.label }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

/** v-select used to handle select as global components
  * required props => label, options, onSelect, unit
  * options are requested to be in format
  * { label: '', value: '' }
  *  */
export default {
  name: 'VSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    labelAttrs: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => []
    },
    onSelect: {
      type: Function,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showoptions: false
    };
  },
  methods: {
    onSelectValue(option) {
      this.toggleDropdown(false);
      this.onSelect(option.value);
    },
    clickAway() {
      this.toggleDropdown(false);
    },
    toggleDropdown(value = !this.showoptions) {
      if (!this.disabled) this.showoptions = value;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>
