<template>
  <div class="form-group">
    <label class="col-12 p-0">{{ label }}</label>
    <div
      :class="rootAttrs.class"
      class="time input-group"
      :id="id"
    >
      <input
        :disabled="disabled"
        :value="value"
        @focusout="onChange"
        v-on="listeners"
        class="form-control"
        :class="rootAttrs.class"
      >
      <span class="input-group-addon">
        <span class="fa fa-calendar" />
      </span>
    </div>
  </div>
</template>

<script>
import constants from '@/constants/app.properties';
import uuid from 'uuid/v1';
import bindClick from './bindClick.vue';

export default {
  name: 'VDatePicker',
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
    format: {
      type: String,
      default: constants.DATE_FORMAT
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default: () => []
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      config: {
        useCurrent: false,
        format: this.format,
        icons: {
          next: 'fa fa-chevron-right',
          previous: 'fa fa-chevron-left'
        },
        widgetPositioning: {
          vertical: this.position
        }
      },
      id: uuid()
    };
  },
  computed: {
    listeners() {
      return this.$listeners;
    },
    rootAttrs() {
      return this.$attrs;
    }
  },
  methods: {
    onChange(e) {
      this.$emit('onChange', e.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
  @import '../style.scss';
</style>
