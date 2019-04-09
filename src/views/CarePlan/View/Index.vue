<template>
  <v-care-plan-template
    :carePlan="carePlan"
    :careplanIntervention="careplanIntervention"
    :careplanAssessment="careplanAssessment"
    :careplanInstruction="careplanInstruction"
  >
    <div
      slot="action"
      class="text-right mt-2"
    >
      <b-button
        variant="primary"
        :disabled="Boolean(carePlan.patientCareplan ? carePlan.patientCareplan.length : false)"
        @click="editCarePlan()"
      >
        Edit Plan
      </b-button>
    </div>
  </v-care-plan-template>
</template>

<script>
import VCarePlanTemplate from '@/components/careplan/View.vue';
import modules from '../_modules';

export default {
  name: 'ViewCareplan',
  components: { VCarePlanTemplate },
  data() {
    return {
      modules,
      id: ''
    };
  },
  computed: {
    carePlan() {
      return this.$store.state.careplan.careplan;
    },
    careplanIntervention() {
      return {
        index: 1,
        name: 'Interventions',
        module: modules.intervene,
        isEdit: false,
        list: this.$store.state.careplan.careplan.careplanIntervention
      };
    },
    careplanAssessment() {
      return {
        index: 2,
        name: 'Assessments',
        module: modules.assessment,
        isEdit: false,
        list: this.$store.state.careplan.careplan.careplanAssessment
      };
    },
    careplanInstruction() {
      return {
        index: 3,
        name: 'Note Instruction',
        module: modules.instruction,
        isEdit: false,
        list: this.$store.state.careplan.careplan.careplanInstruction
      };
    }
  },
  beforeMount() {
    this.$store.dispatch('careplan/view', this.$route.params.id);
  },
  methods: {
    editCarePlan() {
      this.$router.push({
        name: 'careplan.edit', params: { id: this.$route.params.id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
