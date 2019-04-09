<template>
  <div class="form-group">
    <label class="col-12 p-0"> {{ label }}</label>
    <div
      class="time input-group"
      :id="id"
    >
      <input
        :value="value"
        v-on="listeners"
        @focusout="onChange"
        :disabled="disabled"
        class="form-control"
      >
      <span class="input-group-addon">
        <span class="fa fa-clock-o" />
      </span>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid/v1';
import bindClick from './bindClick.vue';

export default {
  name: 'VDateTimePicker',
  mixins: [bindClick],
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
  data() {
    return {
      config: {
        icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
          next: 'fa fa-chevron-right',
          previous: 'fa fa-chevron-left'
        }
      },
      id: uuid()
    };
  },
  computed: {
    listeners() {
      return this.$listeners;
    }
  },
  mounted() {
    this.bindClick();
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
  @import '../style.scss';
</style>
