<template>
  <v-layout>
    <div class="padding-container-lg">
      <v-page-header>
        <span slot="header">
          Edit care plan
        </span>
        <template
          v-if="carePlan"
          slot="subHead"
        >
          Care ID - {{ carePlan.plan_no }}
        </template>
      </v-page-header>
      <div v-if="carePlan">
        <form
          @submit.prevent="validateBeforeSubmit"
        >
          <div class="row pb-4">
            <div class="col col-md-6 col-12">
              <div class="form-group">
                <label for="care-plan-title">Care plan title</label>
                <b-form-input
                  v-model="carePlan.title"
                  v-validate="'required'"
                  :class="{'danger': errors.has('careplanTitle') }"
                  name="careplanTitle"
                  type="text"
                  placeholder="Care plan title"
                />
                <!-- <span
                  v-show="errors.has('careplan title')"
                  class="error-text">Required</span> -->
              </div>
            </div>
            <div class="col col-md-6 col-12">
              <div class="form-group">
                <label for="category">Category</label>
                <b-form-select
                  v-model="carePlan.category_id"
                  v-validate="'required'"
                  :class="{'danger': errors.has('category') }"
                  :options="carePlanCategoryOptions"
                  name="category"
                  class="col-12"
                />
              </div>
            </div>
            <div class="col col-md-6 col-12">
              <div class="form-group">
                <label for="goal">Goal</label>
                <textarea
                  v-model="carePlan.goal"
                  v-validate="'required'"
                  :class="{'danger': errors.has('goal') }"
                  class="form-control"
                  name="goal"
                  placeholder="goal"
                  rows="3"
                />
              </div>
            </div>
            <div class="col col-md-6 col-12">
              <div class="form-group">
                <label
                  class="col-12 p-0"
                  for="problem"
                >Problem</label>
                <textarea
                  v-model="carePlan.problem"
                  v-validate="'required'"
                  :class="{'danger': errors.has('problem') }"
                  class="form-control"
                  name="problem"
                  placeholder="problem"
                  rows="3"
                />
              </div>
            </div>

            <div class= "row d-flex justify-content-around">

              <div class="col col-md-6 col-lg-6 col-12 row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      class="col-12 p-0"
                      for="plan-duration"
                    >Plan duration</label>
                    <div class="d-flex align-items-center">
                      <b-form-select
                        v-model="carePlan.plan_duration"
                        v-validate="'required'"
                        :class="{'danger': errors.has('plan_duration') }"
                        :options="plan_duration"
                        name="plan_duration"
                      /> <span class="ml-1"> days
                    </span></div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      class="col-12 p-0"
                      for="cycle"
                    >Cycles</label>
                    <div class="d-flex align-items-center">
                      <b-form-select
                        v-model.number="carePlan.cycles"
                        v-validate="'required'"
                        v-model="carePlan.cycles"
                        :class="{'danger': errors.has('cycles') }"
                        :options="cycleDuration"
                        name="cycles"
                        class="padding-left"
                      /> <span class="ml-1">
                        times
                    </span></div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      class="col-12 p-0 text-nowrap"
                      for="cycle-break"
                    >Break b/w cycles</label>
                    <div class="d-flex align-items-center">
                      <b-form-select
                        v-model="carePlan.break_time"
                        v-validate="'required'"
                        :class="{'danger': errors.has('cycleBreak') }"
                        :options="cycleBreakDuration"
                        name="cycleBreak"
                      /><span class="ml-1">
                        days</span></div>
                  </div>
                </div>
              </div>

              <div class="col col-md-6 col-lg-6 col-sm-6 col-12 row">
                <div class="col-md-6 col-lg-6 col-sm-6 col-12">
                  <v-date-picker
                    label="Plan start date"
                    @onChange="value=> carePlan.plan_start_date = value"
                    :value="defaultDateFormat(carePlan.plan_start_date)"
                    v-validate="'required'"
                    :className="{'danger': errors.has('plan_start_date') }"
                    name="plan_start_date"
                  />
                </div>
                <div class="col-md-6 col-lg-6 col-sm-6 col-12">
                  <v-date-picker
                    label="Plan end date"
                    @onChange="value=> carePlan.plan_end_date = value"
                    :value="defaultDateFormat(carePlan.plan_end_date)"
                    v-validate="'required'"
                    :className="{'danger': errors.has('plan_end_date') }"
                    name="plan_end_date"
                  />
                </div>
              </div>
            </div>
            <div class="col text-right">
              <b-button
                type="submit"
                variant="primary"
              >Update Plan</b-button>
            </div>
          </div>
        </form>
      </div>
      <template v-if="carePlan">
        <v-accordion
          v-if="careplanIntervention"
          :module="modules.intervene"
          :data="careplanIntervention"
        />
        <v-accordion
          v-if="careplanAssessment"
          :module="modules.assessment"
          :data="careplanAssessment"
        />
        <v-accordion
          v-if="careplanInstruction"
          :module="modules.instruction"
          :data="careplanInstruction"
        />
      </template>
    </div>
  </v-layout>
</template>

<script>
import VLayout from '@/layouts/Default.vue';
import VPageHeader from '@/components/pageheader/PageHeader.vue';
import VAccordion from '@/components/careplan/Accordion.vue';
import { mapGetters } from 'vuex';
import careplan from '@/mixins/careplan';
import modules from '../_modules';

export default {
  name: 'CreateCareplan',
  components: { VLayout, VPageHeader, VAccordion },
  mixins: [careplan],
  data() {
    return {
      carePlan: null,
      modules
    };
  },
  computed: {
    ...mapGetters({
      computedCarePlan: 'careplan/getCareplan',
      intervention: 'careplan/getIntervention',
      assessment: 'careplan/getAssessment',
      instruction: 'careplan/getInstruction'
    }),
    careplanIntervention() {
      return {
        name: 'Interventions',
        index: 1,
        isEdit: true,
        module: modules.intervene,
        list: this.clone(this.intervention),
        onCreate: data => this.$store.dispatch(
          'careplan/createIntervention',
          { id: this.carePlan.id, data }
        ),
        onUpdate: data => this.$store.dispatch(
          'careplan/updateIntervention',
          { id: data.id, data }
        ),
        defaultProps: {
          careplan_id: '',
          total_days: 0,
          days: [],
          name: '',
          frequency: 0,
          color: '#00759A',
          dosage: '',
          instructions: '',
          category_id: ''
        }
      };
    },
    careplanAssessment() {
      return {
        name: 'Assessments',
        index: 2,
        isEdit: true,
        module: modules.assessment,
        list: this.clone(this.assessment),
        onCreate: data => this.$store.dispatch(
          'careplan/createAssessment',
          { id: this.carePlan.id, data }
        ),
        onUpdate: data => this.$store.dispatch(
          'careplan/updateAssessment',
          { id: data.id, data }
        ),
        defaultProps: {
          name: '',
          min: '',
          max: '',
          threshold: '',
          label_min: '',
          label_max: '',
          careplan_id: '',
          target_or_time: '',
          start_time: '',
          end_time: '',
          prompt_time: '',
          input_type: '',
          question: ''
        }
      };
    },
    careplanInstruction() {
      return {
        name: 'Note Instruction',
        index: 3,
        module: modules.instruction,
        isEdit: true,
        list: this.clone(this.instruction),
        onCreate: data => this.$store.dispatch(
          'careplan/createInstruction',
          { id: this.carePlan.id, data }
        ),
        onUpdate: data => this.$store.dispatch(
          'careplan/updateInstruction',
          { id: data.id, data }
        ),
        defaultProps: {
          title: '',
          label: '',
          instructions: '',
          careplan_id: ''
        }
      };
    }
  },
  watch: {
    computedCarePlan: 'setCarePlan'
  },
  beforeMount() {
    this.$store.dispatch('careplan/view', this.$route.params.id);
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        const data = this.getCarePlan();
        const { id } = this.$route.params;
        if (result) {
          this.$store.dispatch('careplan/update', { data, id });
        }
      });
    },
    setCarePlan(value) {
      const carePlan = this.clone(value);
      carePlan.plan_start_date = this.getFormattedDate(carePlan.plan_start_date);
      this.carePlan = carePlan;
    },
    getCarePlan() {
      return this.carePlan;
    },
    calculateList() {
      const list = [];
      let i;
      for (i = 0; i < 30; i += 1) {
        list.push({
          name: 'STIVARGA/medicine',
          subText: '(40mg)',
          times: `${i + 1} times`,
          color: `#${
            Math.random()
              .toString(16)
              .slice(2, 8)}`
        });
      }
      return list;
    }
  }
};

</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
