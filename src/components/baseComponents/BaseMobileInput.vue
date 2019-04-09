

<template>
  <div class="form-group">
    <label
      class="col-12 p-0"
      for="cycle-break"
    >{{ label }}</label>
    <vue-tel-input
      :value="value"
      type="number"
      @onInput="onInput"
    />
  </div>
</template>

<script>
import VueTelInput from 'vue-tel-input';

export default {
  name: 'VMobileInput',
  components: {
    VueTelInput
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.$emit('onChange', { number, isValid, country });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>

