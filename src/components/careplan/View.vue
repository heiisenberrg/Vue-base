<template>
  <v-layout>
    <div class="padding-container-lg">
      <v-page-header>
        <span slot="header">
          View care plan
        </span>
        <template
          v-if="carePlan"
          slot="subHead"
        >
          Care ID - {{ carePlan.plan_no }}
        </template>
      </v-page-header>
      <div
        v-if="carePlan"
        class="row pb-4"
      >
        <b-form-group
          label="Care plan title"
          label-for="CareplanTitle"
          class="col col-md-6 col-12"
        >
          <div class="border-text">{{ carePlan.title }}</div>
        </b-form-group>
        <b-form-group
          label="Category"
          label-for="category"
          class="col col-md-6 col-12"
        >
          <div
            v-if="carePlan.category && carePlan.category.name"
            class="border-text"
          >{{ carePlan.category.name }}</div>
        </b-form-group>
        <b-form-group
          label="Goal"
          label-for="goal"
          class="col col-md-6 col-12"
        >
          <div class="border-text">{{ carePlan.goal }}</div>
        </b-form-group>
        <b-form-group
          label="Problem"
          label-for="problem"
          class="col col-md-6 col-12"
        >
          <div class="border-text">{{ carePlan.problem }}</div>
        </b-form-group>
        <b-form-group
          label="Plan duration"
          label-for="planDuration"
          class="col col-md-6 col-lg-3 col-sm-6 col-12"
        >
          <div class="border-text">{{ carePlan.plan_duration }} days</div>
        </b-form-group>
        <b-form-group
          label="Cycles"
          label-for="cycles"
          class="col col-md-6 col-lg-3 col-sm-6 col-12"
        >
          <div class="border-text">{{ carePlan.cycles }} times</div>
        </b-form-group>
        <b-form-group
          label="Break b/w cycles"
          label-for="breakCycles"
          class="col col-md-6 col-lg-3 col-sm-6 col-12"
        >
          <div class="border-text">{{ carePlan.break_time }} days</div>
        </b-form-group>
        <b-form-group
          label="Plan start date"
          label-for="planStartDate"
          class="col col-md-6 col-lg-3 col-sm-6 col-12"
        >
          <div class="border-text">
            {{ getFormattedDate(carePlan.plan_start_date) }}
          </div>
        </b-form-group>
        <b-form-group
          label="Plan end date"
          label-for="planEndDate"
          class="col col-md-6 col-lg-3 col-sm-6 col-12"
        >
          <div class="border-text">
            {{ getFormattedDate(carePlan.plan_end_date) }}
          </div>
        </b-form-group>
      </div>
      <template v-if="carePlan">
        <v-accordion
          v-if="careplanIntervention"
          :data="careplanIntervention"
          :module="modules.intervene"
        />
        <v-accordion
          v-if="careplanAssessment"
          :data="careplanAssessment"
          :module="modules.assessment"
        />
        <v-accordion
          v-if="careplanInstruction"
          :data="careplanInstruction"
          :module="modules.instruction"
        />
      </template>
      <template v-if="hasSlot('action')">
        <slot name="action" />
      </template>
    </div>
  </v-layout>
</template>

<script>
import VLayout from '@/layouts/Default.vue';
import VPageHeader from '@/components/pageheader/PageHeader.vue';
import VAccordion from '@/components/careplan/Accordion.vue';
import modules from '@/views/CarePlan/_modules';
import SlotMixin from '@/mixins/slot';

export default {
  name: 'ViewCareplan',
  components: { VLayout, VPageHeader, VAccordion },
  mixins: [
    SlotMixin
  ],
  props: {
    carePlan: { type: Object, required: true },
    careplanIntervention: { type: Object, required: true },
    careplanAssessment: { type: Object, required: true },
    careplanInstruction: { type: Object, required: true }
  },
  data() {
    return {
      modules
    };
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
