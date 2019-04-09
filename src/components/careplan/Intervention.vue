<template>
  <form @submit.prevent="validateAndSubmit">
    <div class="row">
      <div class="col col-md-8 col-12">
        <div class="form-group">
          <label for="careplanTitle">Intervention Name</label>
          <b-form-input
            v-model="intervention.name"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('careplanTitle') }"
            name="careplanTitle"
            type="text"
            placeholder="eg. Outdoor walk, STIVARGA"
          />
        </div>
      </div>
      <div class="col col-md-4 col-12">
        <div class="form-group">
          <v-select
            :disabled="disabled"
            :options="colors"
            :labelAttrs="{
              style: {
                backgroundColor: intervention.color,
                color: 'white'
              },
              class:'color-label',
            }"
            :onSelect="setColor"
            value=""
            label="Label Colour"
          />
        </div>
      </div>
      <div class="col col-md-8 col-12">
        <div class="form-group">
          <label for="category">Category</label>
          <b-form-select
            v-model="intervention.category_id"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('category_id') }"
            :options="interventionCategoryOptions"
            name="category_id"
          />
        </div>
      </div>
      <div class="col col-md-4 col-12">
        <div class="form-group">
          <label
            class="col-12 p-0"
            for="dosage"
          >Dosage</label>
          <b-form-input
            v-model="intervention.dosage"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('dosage') }"
            name="dosage"
            type="text"
            placeholder="eg.40mg"
          />
        </div>
      </div>
      <div class="col col-md-6 col-12">
        <v-muti-select
          :options="days"
          :disabled="disabled"
          :selected="intervention.days"
          :onSelect="selectDays"
          :selectAllKey="everyDay"
          label="Days"
          unit="Days"
          :days="intervention.days"
        />
      </div>
      <div class="col col-md-6 col-12">
        <div class="form-group">
          <label
            class="col-12 p-0"
            for="frequency"
          >Frequency</label>
          <b-form-select
            v-model="intervention.frequency"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('frequency') }"
            :options="frequencyOptions"
            name="frequency"
          />
        </div>
      </div>
      <div class="col col-12 reminder-content">
        <div
          v-for="(frequency, index) in reminders"
          :key="index"
          class="form-group reminders m-0"
        >
          <v-time-picker
            :class="`m-0`"
            :disabled="disabled"
            @change="(value) => onReminderChange(value, index)"
            :label="`Reminder ${index + 1}`"
            :value="reminders[index]"
          />
        </div>
      </div>

      <div class="col col-12">
        <div class="form-group">
          <label
            class="col-12 p-0"
            for="instructions"
          >Instructions</label>
          <textarea
            v-model="intervention.instructions"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('instructions') }"
            class="form-control"
            name="instructions"
            placeholder="instructions"
            rows="3"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import actions from '@/constants/_actions';
import careplan from '@/mixins/careplan';

const everyDay = 'Everyday';
export default {
  name: 'Intervention',
  mixins: [careplan],
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
      intervention: this.data,
      reminders: this.data.reminders || [],
      everyDay,
      showDays: false,
      selectedDays: [],
      selectedColorName: '',
      colors: [
        {
          label: 'Blue',
          value: '#00759A',
          attrs: {
            style: {
              backgroundColor: '#00759A'
            }
          }
        },
        {
          label: 'Orange',
          value: '#F7941D',
          attrs: {
            style: {
              backgroundColor: '#F7941D'
            }
          }
        },
        {
          label: 'Red',
          value: '#A71930',
          attrs: {
            style: {
              backgroundColor: '#A71930'
            }
          }
        },
        {
          label: 'Green',
          value: '#679146',
          attrs: {
            style: {
              backgroundColor: '#679146'
            }
          }
        }
      ],
      days: [
        {
          label: 'D1',
          value: '1'
        },
        {
          label: 'D2',
          value: '2'
        },
        {
          label: 'D3',
          value: '3'
        },
        {
          label: 'D4',
          value: '4'
        },
        {
          label: 'D5',
          value: '5'
        },
        {
          label: 'D6',
          value: '6'
        },
        {
          label: 'D7',
          value: '7'
        }
      ],
      frequencyOptions: [
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' }
      ]
    };
  },
  computed: {
    daysCount() {
      return this.selectedDays.length;
    },
    disabled() {
      return this.actionType === actions.VIEW;
    }
  },
  watch: {
    'data.frequency': 'handleReminders'
  },
  methods: {
    handleReminders() {
      const { reminders } = this;
      const frequency = parseInt(this.data.frequency, 10);
      while (reminders.length !== frequency) {
        if ((reminders.length < frequency)) {
          reminders.push('');
        } else {
          reminders.pop();
        }
      }
      this.data.reminders = reminders;
      this.reminders = reminders;
    },
    setColor(color) {
      this.intervention = this.merge(this.intervention, { color });
    },
    validateAndSubmit() {
      this.$validator.validateAll().then((result) => {
        this.intervention.careplan_id = this.$store.state.careplan.careplan.id;
        if (result) {
          this.$emit('onSubmit', this.intervention);
        }
      });
    },
    toggleDayDropDown(value = !this.showDays) {
      this.showDays = value;
    },
    selectDays(days) {
      this.intervention.total_days = days.length;
      this.intervention.days = days;
    },
    onReminderChange(value, index) {
      this.reminders[index] = value;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
