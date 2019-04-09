<template>
  <v-layout>
    <div class="padding-container-lg">
      <v-page-header>
        <span slot="header">
          Create care plan
        </span>
        <div slot="action">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="importCareplan"
          >
            <i class="icon ion-md-add" />
            Clone
          </button>
          <b-modal
            id="modal-center"
            ref="myModalRef"
            body-class="pt-0"
            :footer-class="`display-none`"
            centered
            title="Import care plan"
          >
            <div class="row">
              <div class="col col-md-12 col-12 position-fixed p-3 search-bar-content">
                <b-form-input
                  v-model="searchText"
                  type="text"
                  placeholder="Enter care plan name or ID"
                  class="search-bar"
                />
              </div>
              <div class="col col-md-12 col-12 mt-5 template-content">
                <div
                  v-if="(clonedCareplanTemplates &&
                    !clonedCareplanTemplates.length || !clonedCareplanTemplates)
                  && !templateLoading"
                  class="d-flex justify-content-center"
                >
                  No Data found
                </div>
                <div
                  v-for="template in clonedCareplanTemplates"
                  :key="template.id"
                  class="template"
                  @click="setTemplate(template.id)"
                >
                  <label><span>{{ template.title }}</span></label>
                  <p> {{ template.plan_no }}</p>
                  <div class="template-detail">
                    <span>Duration: {{ template.plan_duration }} days</span>
                    <span>Interventions: {{ template.interventions }}</span>
                    <span>Assessments: {{ template.assessments }}</span>
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
      </v-page-header>
      <div>
        <form @submit.prevent="validateBeforeSubmit">
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
                  placeholder="eg: Diabetes with complicated Asthama or any of the diesease name"
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
                  placeholder="Plan goal"
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
                  placeholder="Describe the problem of the disease"
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
              >Create Plan</b-button>
            </div>
          </div>
        </form>
      </div>
      <!-- accordion -->
      <div
        v-for="(accordion, key) in accordionList"
        :key="key"
        class="disable-accordian-list"
      >{{ accordion.name }}
        <span class="pull-right">
          <span>Add</span>
          <i class="icon ion-md-add" />
        </span>
      </div>
    </div>
  </v-layout>
</template>

<script>

import VLayout from '@/layouts/Default.vue';
import VPageHeader from '@/components/pageheader/PageHeader.vue';
import { mapGetters } from 'vuex';
import careplan from '@/mixins/careplan';

export default {
  name: 'CreateCareplan',
  components: { VLayout, VPageHeader },
  mixins: [careplan],
  data() {
    return {
      accordionList: [
        {
          name: 'Interventions'
        },
        {
          name: 'Assessments'
        },
        {
          name: 'Note Instruction'
        }
      ],
      searchText: '',
      clonedCareplanTemplates: [],
      carePlan: {
        title: '',
        category_id: null,
        goal: '',
        problem: '',
        plan_duration: '',
        cycles: '',
        break_time: '',
        plan_start_date: this.getFormattedDate(new Date()),
        plan_end_date: this.getFormattedDate(new Date())
      }
    };
  },
  computed: {
    ...mapGetters({
      careplanTemplates: 'careplan/getCareplanTemplates',
      selectedTemplate: 'careplan/getCareplanTemplate',
      templateLoading: 'careplan/getLoading',
      organisationId: 'auth/getOrganisationId'
    })
  },
  watch: {
    searchText: 'searchCarePlanTemplate',
    careplanTemplates(value) {
      if (!this.clonedCareplanTemplates.length) {
        this.clonedCareplanTemplates = value;
      }
    }
  },
  methods: {
    importCareplan() {
      this.$store.dispatch('careplan/getTemplates');
      this.$refs.myModalRef.show();
      this.searchText = '';
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        const data = this.carePlan;
        data.organisation_id = this.organisationId;
        if (result) {
          this.$store.dispatch('careplan/create', data);
        }
      });
    },
    setTemplate(id) {
      this.$router.push({
        name: 'careplan.viewTemplate', params: { id }
      });
      this.$refs.myModalRef.hide();
    },
    searchCarePlanTemplate(value) {
      const filteredTemplate = [];
      this.careplanTemplates.filter((template) => {
        const { title } = template;
        const planNo = template.plan_no;
        if (title.includes(value) || planNo.includes(value)) {
          filteredTemplate.push(template);
        }
        return true;
      });
      this.clonedCareplanTemplates = filteredTemplate;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
