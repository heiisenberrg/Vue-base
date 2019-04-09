<template>
  <form @submit.prevent="validateAndSubmit">
    <div class="row">
      <div class="col col-md-6 col-12">
        <div class="form-group">
          <label for="assesmentName">Assessment Name</label>
          <b-form-input
            v-model="assessment.name"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('assesmentName') }"
            name="assesmentName"
            type="text"
            placeholder="eg Pain"
          />
        </div>
      </div>
      <div class="col col-md-6 col-12">
        <div class="form-group">
          <label for="assesmentTarget">Assessment Target/Time</label>
          <b-form-input
            v-model="assessment.target_or_time"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('assesmentTarget') }"
            name="assesmentTarget"
            type="text"
            placeholder="eg Lower back"
          />
        </div>
      </div>
      <div class="row col col-md-12 col-12 d-flex justify-content-between align-itemns-center">
        <div class="col col-md-4 col-6">
          <v-time-picker
            @change="(value) => assessment.start_time = value"
            :disabled="disabled"
            :label="`Start Time`"
            :class="`form-group`"
            :value="assessment.start_time"
          />
        </div>
        <div class="col col-md-4 col-6">
          <v-time-picker
            @change="(value) => assessment.end_time = value"
            :disabled="disabled"
            :label="`End Time`"
            :class="`form-group`"
            :value="assessment.end_time"
          />
        </div>
        <div class="col col-md-4 col-12">
          <div class="form-group">
            <label for="prompt_time">Prompt Every</label>
            <div class="d-flex justify-content-between align-itemns-center">
              <b-form-input
                v-model.number="assessment.prompt_time"
                :disabled="disabled"
                v-validate="'required'"
                :class="{'danger': errors.has('prompt_time') }"
                name="prompt_time"
                type="number"
                placeholder="eg 5"
              />mins
            </div>
          </div>
        </div>
      </div>
      <div class="col col-md-12 col-12">
        <div class="form-group">
          <label for="input_type">Input Type</label>
          <b-form-select
            v-model="assessment.input_type"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('input_type') }"
            :options="inputTypeOptions"
            name="input_type"
          />
        </div>
      </div>
      <div class="col col-md-12 col-12">
        <div class="form-group">
          <label
            class="col-12 p-0"
            for="question"
          >Question</label>
          <b-form-input
            v-model="assessment.question"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('question') }"
            name="question"
            type="text"
            placeholder="eg How was your pain today?"
          />
        </div>
      </div>
      <div class="col col-md-12 col-12">
        <div class="pain-content">
          <div class="col col-md-12 col-12 gradient" />
          <div class="d-flex justify-content-between align-itemns-center">
            <div class="col col-md-3 col-3">
              <div class="form-group">
                <b-form-input
                  v-model.number="assessment.min"
                  :disabled="disabled"
                  v-validate="'numeric|required'"
                  :min="0"
                  :class="{'danger': errors.has('painMin') }"
                  name="painMin"
                  type="number"
                  placeholder="eg 1"
                />
                <label for="pain-min">Min</label>
              </div>
            </div>
            <div class="col col-md-3 col-3">
              <div class="form-group">
                <b-form-input
                  v-model.number="assessment.threshold"
                  :disabled="disabled"
                  v-validate="`numeric|required|between:${assessment.min},${assessment.max}`"
                  :min="0"
                  :class="{'danger': errors.has('painThreshold') }"
                  name="painThreshold"
                  type="number"
                  placeholder="eg 8"
                />
                <label for="painThreshold">Threshold</label>
              </div>
            </div>
            <div class="col col-md-3 col-3">
              <div class="form-group">
                <b-form-input
                  v-model.number="assessment.max"
                  :disabled="disabled"
                  v-validate="`numeric|required|min_value:${assessment.threshold}`"
                  :min="0"
                  :class="{'danger': errors.has('painMax') }"
                  name="painMax"
                  type="number"
                  placeholder="eg 10"
                />
                <label for="painMax">Max</label>
              </div>
            </div>

          </div>
          <div class="col col-md-12 col-12 error-text">
            {{
              errors.first('painMin') || errors.first('painMax')
                || errors.first('painThreshold')
            }}
          </div>
        </div>
      </div>
      <div class="col col-md-6 col-12">
        <div class="form-group">
          <label
            class="col-12 p-0"
            for="label_min"
          >Label (min)</label>
          <b-form-input
            v-model="assessment.label_min"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('label_min') }"
            name="label_min"
            type="text"
            placeholder="eg Not at all"
          />
        </div>
      </div>
      <div class="col col-md-6 col-12">
        <div class="form-group">
          <label
            class="col-12 p-0"
            for="assesmentTarget"
          >Label (max)</label>
          <b-form-input
            v-model="assessment.label_max"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('label_max') }"
            name="label_max"
            type="text"
            placeholder="eg Very much"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import actions from '@/constants/_actions';

export default {
  name: 'Assessment',
  props: {
    data: {
      type: Object,
      required: true
    },
    module: {
      type: String,
      required: true
    },
    actionType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      assessment: this.data,
      inputTypeOptions: [
        {
          text: 'Slider',
          value: 'Slider'
        },
        {
          text: 'Picker',
          value: 'Picker'
        },
        {
          text: 'Text',
          value: 'Text'
        }
      ]
    };
  },
  computed: {
    disabled() {
      return this.actionType === actions.VIEW;
    }
  },
  methods: {
    validateAndSubmit() {
      this.$validator.validateAll().then((result) => {
        this.assessment.careplan_id = this.$store.state.careplan.careplan.id;
        if (result) {
          this.$emit('onSubmit', this.assessment);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
 @import './style.scss';
</style>
