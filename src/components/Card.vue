<template>
  <div
    v-bind="attributes"
    class="card"
  >
    <h4
      v-if="hasSlot('header')"
      :class="classsHeader"
    >
      <slot name="header" />
    </h4>
    <div
      v-if="hasSlot('body')"
      class="card-body"
    >
      <slot name="body" />
    </div>
    <div
      v-if="hasSlot('footer')"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
/* ============
 * Card Component
 * ============
 *
 * A basic card component.
 *
 * Gives an idea how components work.
 */

import SlotMixin from '@/mixins/slot';

export default {
  /**
   * The name of the component.
   */
  name: 'Card',

  /**
   * The mixins that the component can use.
   */
  mixins: [
    SlotMixin
  ],

  /**
   * The properties that the component accepts.
   */
  props: {
    contextualStyle: {
      default: 'primary',
      type: String,
      required: false
    },
    attributes: {
      default: () => [],
      type: Array,
      required: false
    }
  },

  /**
   * The computed properties that the component can use.
   */
  computed: {
    /**
     * Computed property which will compute the classes
     * for the header of the card.
     *
     * @returns {Array} The classes for the header.
     */
    classsHeader() {
      const classs = ['card-header'];

      if (this.contextualStyle) {
        classs.push(`bg-${this.contextualStyle}`);
        classs.push('text-white');
      } else {
        classs.push('bg-default');
      }

      return classs;
    }
  }
};
</script>
