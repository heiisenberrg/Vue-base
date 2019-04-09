<template>
  <div class="header row">
    <div class="col col-md-7">
      <h4 v-if="hasSlot('header')">
        <slot name="header" />
      </h4>
    </div>
    <div class="col col-md-5 text-right">
      <div v-if="hasSlot('action')">
        <slot name="action" />
      </div>
      <h5 v-if="hasSlot('subHead')">
        <slot name="subHead" />
      </h5>
    </div>
  </div>
</template>

<script>
import SlotMixin from '@/mixins/slot';

export default {
  name: 'PageHeader',
  mixins: [SlotMixin],
  computed: {
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
