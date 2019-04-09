<script>
import $ from 'jquery';

export default {
  name: 'DateTimeMixin',
  mounted() {
    this.bindClick();
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    },
    bindClick() {
      if (/Mobi/.test(navigator.userAgent)) {
      // if mobile device, use native pickers
        $('.date-time input').attr('type', 'datetime-local');
        $('.date input').attr('type', 'date');
        $('.time input').attr('type', 'time');
      } else {
        $(`#${this.id}`).datetimepicker(this.config);
      }
    }
  }
};
</script>
