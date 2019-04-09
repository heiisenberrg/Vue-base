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
        @click="cloneCarePlan()"
      >
        Clone
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
      return this.$store.state.careplan.careplanTemplate;
    },
    careplanIntervention() {
      return {
        index: 1,
        name: 'Interventions',
        module: modules.intervene,
        isEdit: false,
        list: this.$store.state.careplan.careplanTemplate.interventionTemplate
      };
    },
    careplanAssessment() {
      return {
        index: 2,
        name: 'Assessments',
        module: modules.assessment,
        isEdit: false,
        list: this.$store.state.careplan.careplanTemplate.assessmentTemplate
      };
    },
    careplanInstruction() {
      return {
        index: 3,
        name: 'Note Instruction',
        module: modules.instruction,
        isEdit: false,
        list: this.$store.state.careplan.careplanTemplate.instructionTemplate
      };
    }
  },
  beforeMount() {
    this.$store.dispatch('careplan/getTemplate', this.$route.params.id);
  },
  methods: {
    cloneCarePlan() {
      const { id } = this.$route.params;
      this.$store.dispatch('careplan/createCarePlan', id);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
