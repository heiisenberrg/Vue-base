import keys from '@/constants/keys';

export default {
  name: 'ConfirmAlertMixin',
  methods: {
    conFirmAlert(content, onSuccess, onFail) {
      this.$eventBus.$emit(keys.CONFIRM_ALERT, { content, onSuccess, onFail });
    }
  }
};
