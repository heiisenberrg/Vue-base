<template>
  <v-layout>
    <div class="padding-container-sm">
      <div
        class="header row"
        v-if="isNotEmpty(patient)"
      >
        <div class="col col-md-12">
          <h4>{{ patient.first_name }}'s Health Record</h4>
        </div>
        <v-tab :tabProps="tabProps">
          <div slot="patientDetails">
            <div>
              <h6>Patient Demographics</h6>
              <div class="row pb-4">
                <div class="col-md-3 col-4">
                  <div class="form-group">
                    <label>First Name</label>
                    <b-form-input
                      class="form-control"
                      placeholder="First name"
                      :value="patient.first_name"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-3 col-4">
                  <div class="form-group">
                    <label>Last Name</label>
                    <b-form-input
                      class="form-control"
                      placeholder="Last name"
                      :value="patient.last_name"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-3 col-4">
                  <div class="form-group">
                    <label>Phone Number</label>
                    <b-form-input
                      class="form-control"
                      placeholder="Phone number"
                      :value="patient.user.mobile_no"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-3 col-4">
                  <div class="form-group">
                    <label>Email</label>
                    <b-form-input
                      class="form-control"
                      placeholder="Email"
                      :value="patient.user.email"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h6>Patient Allergies</h6>
              <div class="row pb-4">
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label>Allergies</label>
                    <textarea
                      class="form-control"
                      placeholder="Allergies"
                      rows="3"
                      :value="getName(patient.allergy)"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-2 col-4">
                  <div class="form-group">
                    <label>Onset Date</label>
                    <b-form-input
                      class="col-md-10 col-2"
                      type="text"
                      placeholder="Date"
                      :value="getFormattedDate(patient.allergy.length ?
                      patient.allergy[0].onset_date:'')"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h6>Patient Diagnosis</h6>
              <div class="row pb-4">
                <div
                  v-for="(diagnosis, index) in patient.diagnosis"
                  :key="index"
                  class="col-md-6 col-12"
                >
                  <div class="form-group">
                    <label>Diagnosis-{{ index+1 }}</label>
                    <textarea
                      plaintext
                      class="form-control"
                      placeholder="Diagnosis"
                      rows="3"
                      :value="diagnosis.description"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h6>Patient Treatment</h6>
              <div
                v-for="(treatment, index) in patient.treatment"
                :key="index"
                class="row pb-4"
              >
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label>Drug-{{ index+1 }}</label>
                    <textarea
                      class="form-control"
                      placeholder="Drug"
                      rows="3"
                      :value="treatment.drug"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label>Treatment-{{ index+1 }}</label>
                    <textarea
                      class="form-control"
                      placeholder="Treatment"
                      rows="3"
                      :value="treatment.description"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div slot="activityDetails">
            <div
              v-for="(careplan, index) in patient.patientCareplan"
              :key="index"
            >
              <h6>Care Plan - {{ index+1 }}</h6>
              <div class="row pb-4">
                <div class="col-md-3 col-4">
                  <div class="form-group">
                    <label>Care Plan Name</label>
                    <b-form-input
                      class="form-control"
                      placeholder="Care plan name"
                      :value="careplan.careplan.title"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-3 col-4">
                  <div class="form-group">
                    <label>Total Duration</label>
                    <b-form-input
                      class="form-control"
                      placeholder="Total duration"
                      :value="careplan.careplan.plan_duration"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-2 col-4">
                  <div class="form-group">
                    <label>Date Started</label>
                    <b-form-input
                      class="col-md-10 col-2"
                      type="text"
                      placeholder="Date"
                      :value="getFormattedDate(careplan.careplan.plan_start_date)"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6 col-24">
                  <div class="form-group">
                    <label>
                      Interventions({{ careplan.careplan.careplanIntervention.length }})
                    </label>
                    <textarea
                      class="form-control"
                      placeholder="Interventions"
                      rows="3"
                      :value="getName(careplan.careplan.careplanIntervention)"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="form-group">
                    <label>Assessments({{ careplan.careplan.careplanAssessment.length }})</label>
                    <textarea
                      class="form-control"
                      placeholder="Assessments"
                      rows="3"
                      :value="getName(careplan.careplan.careplanAssessment)"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-tab>
      </div>
    </div>
  </v-layout>
</template>

<script>

import VLayout from '@/layouts/Default.vue';
import VTab from '@/components/tab/tab.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ViewPatient',
  components: { VLayout, VTab },
  data() {
    return {
      tabProps: {
        tabs: [{
          title: 'Patient Details',
          slot: 'patientDetails'
        }, {
          title: 'Activity Details',
          slot: 'activityDetails'
        }]
      }
    };
  },
  computed: {
    ...mapGetters({
      patient: 'patientList/getPatient'
    })
  },
  beforeMount() {
    this.$store.dispatch('patientList/getPatient', this.$route.params.id);
  },
  methods: {
    getName(data) {
      const name = [];
      data.map((datum) => {
        name.push(datum.name);
        name.push('\n');
        return true;
      });
      return name.join('').replace('"', '');
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
