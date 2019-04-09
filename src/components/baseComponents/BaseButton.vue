
<template>
  <button> {{ label }}</button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>

