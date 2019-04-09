<template>
  <v-layout>
    <div class="padding-container-lg">
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        :variant="variant"
        @dismissed="dismissCountDown=0"
      >
        {{ text }}
      </b-alert>
      <v-page-header>
        <span slot="header">
          <div class="row">
            <div class="col-lg-6">
              Profile
            </div>
          </div>
        </span>
      </v-page-header>
      <div

        v-if="isNotEmpty(user)"
      >
        <form @submit.prevent="validateBeforeSubmit">
          <div>
            <div class="row">
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>First Name</label>
                  <b-form-input
                    v-model="user.first_name"
                    class="form-control"
                    name="first_name"
                    v-validate="'required'"
                    placeholder="First name"
                    :class="{'danger': errors.has('first name') }"
                  />
                </div>
              </div>
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>Last Name</label>
                  <b-form-input
                    v-model="user.last_name"
                    class="form-control"
                    name="last_name"
                    v-validate="'required'"
                    placeholder="Last name"
                    :class="{'danger': errors.has('last name') }"
                  />
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>Gender</label>
                  <b-form-select
                    v-model="user.gender"
                    v-validate="'required'"
                    :options="genderOptions"
                    :class="{'danger': errors.has('gender') }"
                    name="gender"
                  />
                </div>
              </div>
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>Date of birth</label>
                  <b-form-input
                    v.model="user.dob"
                    class="form-control"
                    :class="{'danger': errors.has('dob') }"
                    placeholder="date of birth"
                    :value="getFormattedDate(user.dob)"
                    name="dob"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>Designation</label>
                  <b-form-input
                    class="form-control"
                    v-validate="'required'"
                    placeholder="designation"
                    v-model="user.designation"
                    :class="{'danger': errors.has('designation') }"
                    name="designation"
                  />
                </div>
              </div>
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>Phone Number</label>
                  <b-form-input
                    class="form-control"
                    placeholder="phone number"
                    v-validate="'required'"
                    v-model="user.mobile_no"
                    :class="{'danger': errors.has('mobile_no') }"
                    name="mobile_no"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>Email</label>
                  <b-form-input
                    class="form-control"
                    placeholder="email"
                    v-validate="'required'"
                    :class="{'danger': errors.has('email') }"
                    v-model="user.email"
                    name="email"
                  />
                </div>
              </div>
              <div class="col col-md-6 col-12">
                <div class="form-group">
                  <label>Address</label>
                  <textarea
                    class="form-control"
                    placeholder="address"
                    v-validate="'required'"
                    v-model="user.address"
                    :class="{'danger': errors.has('address') }"
                    row="5"
                    name="address"
                  />
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col col-12">
                <button
                  class="btn btn-primary float-right ml-2"
                  type="submit"
                  variant="primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
    </div></div>
  </v-layout>
</template>


<script>
import { mapGetters } from 'vuex';
import VLayout from '@/layouts/Default.vue';
import VPageHeader from '@/components/pageheader/PageHeader.vue';

export default {
  name: 'ViewUser',
  components: {
    VLayout,
    VPageHeader
  },
  data() {
    return {
      dismissSecs: 1,
      dismissCountDown: 0,
      text: '',
      variant: '',
      genderOptions: [{
        text: 'Choose a gender',
        value: null
      },
      {
        value: 'male',
        text: 'Male'
      },
      {
        value: 'female',
        text: 'Female'
      }]
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/getUser',
      user: 'profile/getUser',
      status: 'profile/getStatus'
    })
  },
  watch: {
    currentUser: {
      handler: 'getUser',
      immediate: true
    },
    status(value) {
      if (value === 'success') {
        this.text = 'Profile updated successfully!';
        this.variant = 'success';
      } else if (value === 'danger') {
        this.text = 'Profile updation failed!';
        this.variant = 'danger';
      }
    }
  },
  methods: {
    getUser(value) {
      if (this.isNotEmpty(value)) {
        this.$store.dispatch('profile/view', value.id);
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        const data = this.user;
        if (result) {
          this.$store.dispatch('profile/update', data);
          this.dismissCountDown = this.dismissSecs;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
