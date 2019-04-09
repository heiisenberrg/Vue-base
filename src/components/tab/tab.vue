<template>
  <div class="col col-md-12">
    <b-tabs>
      <b-tab
        v-for="(tab, index) in tabProps.tabs"
        :key="index"
        :title="tab.title"
        :active="!index"
      >
        <slot :name="tab.slot" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import SlotMixin from '@/mixins/slot';

export default {
  name: 'Tab',
  mixins: [SlotMixin],
  props: {
    tabProps: { type: Object, required: true }
  },
  computed: {
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
