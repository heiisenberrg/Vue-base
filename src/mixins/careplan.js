import { mapGetters } from 'vuex';
import keyMirror from 'key-mirror';

const categoryKeys = keyMirror({
  id: null,
  name: null
});

export default {
  beforeCreate() {
    this.$store.dispatch('category/getCategories');
  },
  computed: {
    ...mapGetters({
      careplanCategories: 'category/getCareplanCategories',
      interventionCategories: 'category/getInterventionCategories'
    })
  },
  watch: {
    careplanCategories: 'onCareplanCategoriesChange',
    interventionCategories: 'onInterventionCategoriesChange'
  },
  data() {
    return {
      plan_duration: this.getOptionList(0, 21),
      cycleDuration: this.getOptionList(0, 10),
      cycleBreakDuration: this.getOptionList(5, 10),
      dateOptions: {
        format: 'YYYY-MM-DD',
        useCurrent: false,
        showClear: true,
        showClose: true,
        minDate: this.getFormattedDate(),
        maxDate: false
      },
      carePlanCategoryOptions: [{
        value: null,
        text: 'Select a Category'
      }],
      interventionCategoryOptions: [{
        value: null,
        text: 'Select a Category'
      }]
    };
  },
  methods: {
    getOptionList(start, count) {
      const planDurationList = [];
      for (let i = start; i <= start + count; i += 1) {
        planDurationList.push({ value: i, text: i });
      }
      return planDurationList;
    },
    onCareplanCategoriesChange(categories) {
      this.carePlanCategoryOptions.push(...this.mapValuesToOptions(categories.carePlan, {
        text: categoryKeys.name,
        value: categoryKeys.id
      }));
    },
    onInterventionCategoriesChange(categories) {
      this.interventionCategoryOptions.push(...this.mapValuesToOptions(categories.interventions, {
        text: categoryKeys.name,
        value: categoryKeys.id
      }));
    },
    mapValuesToOptions(values, keys) {
      return values.map(value => ({
        value: value[keys.value],
        text: value[keys.text]
      }));
    }
  }
};
