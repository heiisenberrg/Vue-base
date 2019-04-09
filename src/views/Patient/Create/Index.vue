<template>
  <v-layout>
    <div class="padding-container-lg">
      <v-page-header>
        <span slot="header">
          Create Patient
        </span>
      </v-page-header>
      <div>
        <form @submit.prevent="validateBeforeSubmit">
          <div class="row pb-4">
            <div class="col col-md-6 col-12">
              <div class="form-group">
                <label for="patient-first_name">First Name</label>
                <b-form-input
                  v-model="patient.first_name"
                  v-validate="'required'"
                  :class="{'danger': errors.has('firstName') }"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                />
                <!-- <span
                  v-show="errors.has('patient first_name')"
                  class="error-text">Required</span> -->
              </div>
            </div>
            <div class="col col-md-6 col-12">
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <b-form-input
                  v-model="patient.last_name"
                  v-validate="'required'"
                  :class="{'danger': errors.has('lastName') }"
                  name="lastName"
                  class="col-12"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div class="col col-md-6 col-12 row m-0 p-0">
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label for="gender">Gender</label>
                  <b-form-select
                    v-model="patient.gender"
                    v-validate="'required'"
                    :class="{'danger': errors.has('gender') }"
                    class="form-control"
                    name="gender"
                    :options="genders"
                  />
                </div>
              </div>
              <div class="col col-md-6 col-12 fl-left">
                <v-date-picker
                  :label="`Date of birth`"
                  :value="defaultDateFormat(patient.dob)"
                  @onChange="(value) => patient.dob = value"
                  v-validate="`required`"
                  :class="{'danger': errors.has('dob')}"
                  name="dob"
                />
              </div>
            </div>
            <div class="col col-md-6 col-12">
              <div class="form-group">
                <label for="email">Email</label>
                <b-form-input
                  v-model="patient.email"
                  v-validate="'required|email'"
                  :class="{'danger': errors.has('email') }"
                  class="form-control"
                  name="email"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div class="col col-md-6 col-12">
              <v-mobile-input
                :value="patient.mobile_no"
                :label="`Mobile Number`"
                v-validate="`required|digits:${10}`"
                :class="{'danger': errors.has('mobileNumber') }"
                @onChange="onMobileInputChange"
                name="mobileNumber"
                type="number"
                placeholder="Enter MobileNumber"
              />
            </div>
            <div class="col col-md-6 col-12" />
            <div class="col text-right">
              <b-button
                type="submit"
                variant="primary"
              >Create Patient</b-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </v-layout>
</template>

<script>
import VLayout from '@/layouts/Default.vue';
import VPageHeader from '@/components/pageheader/PageHeader.vue';
import VMobileInput from '@/components/baseComponents/BaseMobileInput.vue';
import { mapGetters } from 'vuex';
import keys from '@/constants/keys';
import roles from '@/constants/_roles';

export default {
  name: 'CreatePatient',
  components: { VLayout, VPageHeader, VMobileInput },
  data() {
    return {
      patient: {
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        gender: null,
        dob: '',
        designation: '',
        address: '',
        profile_image_url: '',
        country_code: '',
        patientname: '',
        role: null
      },
      computed: {
        ...mapGetters({
          organisationId: 'auth/getOrganisationId'
        })
      },
      genders: [{
        value: null,
        text: 'Select a Gender'
      },
      {
        value: 'Male',
        text: 'Male'
      },
      {
        value: 'Male',
        text: 'Male'
      }],
      roles: [
        {
          value: null,
          text: 'Select a Role'
        },
        {
          value: roles.ADMIN,
          text: 'Admin'
        },
        {
          value: roles.CARE_AUTHOR,
          text: 'Care Author'
        },
        {
          value: roles.CARE_NAVIGATOR,
          text: 'Care Navigator'
        },
        {
          value: roles.PATIENT,
          text: 'Patient'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      selectedTemplate: 'patient/getPatientTemplate',
      templateLoading: 'patient/getLoading'
    })
  },
  mounted() {
    this.$eventBus.$on(keys.CONFIRM_ALERT, this.handlePermissions);
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        const data = this.patient;
        if (result) {
          data.organisation_id = this.organisationId;
          this.$store.dispatch('patient/create', data);
        }
      });
    },
    onMobileInputChange({ number, isValid, country }) {
      if (isValid) {
        this.patient = {
          ...this.patient,
          mobile_no: number,
          country_code: country.dialCode
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>
