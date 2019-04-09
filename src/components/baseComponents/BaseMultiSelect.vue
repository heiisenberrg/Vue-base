
<template>
  <div class="form-group">
    <label class="col-12 p-0">
      {{ label }}
    </label>
    <div
      v-clickaway.modal="clickAway"
      class="multi-selector wrapper-dropdown"
    >
      <span
        class="form-control selected-label"
        @click="toggleValueDropDown"
      >
        {{ selectedUnits ? selectedUnits.length : 0 }} {{ unit }}
        <template
          v-if="selectedUnits && selectedUnits.length"
        >
          [<template v-for="value in selectedUnits">
            {{ value }}
          </template>]
        </template>
      </span>
      <ul
        v-show="showUnits"
        class="dropdown"
      >
        <li @click="onSelectValue({value: selectAllKey})">
          <input
            :checked="selectedUnits.length === options.length"
            type="checkbox"
            @click="onSelectValue({value: selectAllKey})"
          >
          <span class="option-label">{{ selectAllKey }}</span>
        </li>
        <li
          v-for="(value, key) in options"
          :key="key"
          @click="onSelectValue(value)"
        ><input
          :checked="selectedUnits.includes(value.value)"
          type="checkbox"
          @click="onSelectValue(value)"
        >
          <span class="option-label">{{ value.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

/** v-multi-select used to handle multi-select in global
  * required props => label, options, onSelect, unit
  * options are requested to be in format
  * { label: '', value: '' }
  *  */
export default {
  name: 'VMutiSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    onSelect: {
      type: Function,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    selectAllKey: {
      type: String,
      default: 'SelectAll'
    },
    days: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showUnits: false,
      selectedUnits: this.days
    };
  },
  methods: {
    clickAway() {
      this.toggleValueDropDown(false);
    },
    toggleValueDropDown(value = !this.showUnits) {
      if (!this.disabled) this.showUnits = value;
    },
    onSelectValue(option) {
      const { selectedUnits, options, selectAllKey } = this;
      if (option.value !== selectAllKey) {
        if (selectedUnits.includes(option.value)) {
          selectedUnits.splice(this.findIndex(selectedUnits, option.value), 1);
        } else {
          selectedUnits.push(option.value);
        }
      } else if (this.selectedUnits.length < this.options.length) {
        this.selectedUnits = [...options.map(data => data.value)];
      } else {
        this.selectedUnits = [];
      }
      this.onSelect(this.selectedUnits);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>
