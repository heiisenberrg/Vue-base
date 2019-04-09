<template>
  <div class="circle">
    <div class="circle-percent-text-body">
      <slot />
    </div>
  </div>
</template>

<script>
const $ = require('jquery-easing');
require('jquery-circle-progress');

export default {
  props: {
    progress: {
      type: Number,
      required: true,
      default: 0.25
    },
    size: {
      type: Number,
      required: false,
      default: 150
    },
    startAngle: {
      type: Number,
      default: 124
    },
    thickness: {
      type: Number,
      default: 0.1
    },
    percentFontSize: {
      type: String,
      required: false,
      default() {
        return `${(this.size / 4).toString()}px`;
      }
    },
    animation: {
      required: false,
      default() {
        return { duration: 1200, easing: 'circleProgressEasing' };
      },
      validator(value) {
        return (value instanceof Object || value === false);
      }
    },
    animationStartValue: {
      type: Number,
      required: false,
      default: 0.0
    },
    reverse: {
      type: Boolean,
      default: false
    },
    lineCap: {
      type: String,
      default: 'butt'
    },
    fill: {
      type: Object,
      default: () => {}
    },
    emptyFill: {
      type: String,
      default: () => {}
    },
    insertMode: {
      type: String,
      default: () => {}
    },
    showPercent: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    const vm = this;
    $(vm.$el)
      .on('circle-inited', (event) => {
        this.renderCircleBody((vm.progress / 100));
        vm.$emit('vue-circle-init', event);
      })
      .circleProgress({
        value: this.convertedProgress(vm.progress),
        size: vm.size,
        startAngle: vm.startAngle,
        reverse: vm.reverse,
        lineCap: vm.lineCap,
        fill: vm.fill,
        emptyFill: vm.emptyFill,
        animation: vm.animation,
        animationStartValue: vm.animationStartValue,
        insertMode: vm.insertMode,
        thickness: vm.thickness
      })
      .on('circle-animation-progress', (event, progress, stepValue) => {
        this.renderCircleBody(stepValue);
        this.$emit('vue-circle-progress', event, progress, stepValue * 100);
      })
      .on('circle-animation-end', (event) => {
        this.$emit('vue-circle-end', event);
      });
  },
  beforeDestroy() {
    $(this.$el).remove();
  },
  methods: {
    convertedProgress(progress) {
      return progress / 100;
    },
    updateProgress(value) {
      if ($.type(value) === 'number') {
        $(this.$el).circleProgress('value', this.convertedProgress(value));
      } else {
        console.error('Passed Invalid Value. Number Expected. (Hint: use parseInt())');
      }
    },
    updateFill(fill) {
      const circle = $(this.$el).data('circle-progress');
      circle.fill = fill;
      circle.initFill();
    },
    renderCircleBody(value) {
      value = value || this.progress;
      if (this.showPercent) {
        $(this).find('span.percent-text').html(`${Math.floor(value * 100)}%`);
      }
    }
  }
};
</script>

<style scoped>
  @import './style.scss';
</style>
