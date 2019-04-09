<template>
  <b-modal
    id="modal-center"
    ref="confirmationModalRef"
    body-class="pt-0 mt-3"
    centered
    :title="title"
  >
    {{ message }}
    <div
      slot="modal-footer"
      class="w-100"
    >
      <b-btn
        size="sm"
        class="float-right"
        variant="primary"
        @click="onConfirm"
      >
        Yes
      </b-btn>
      <b-btn
        size="sm"
        class="float-right btn btn-outline-primary mr-2"
        @click="onCancel"
      >
        No
      </b-btn>
    </div>
  </b-modal>
</template>

<script>
import keys from '@/constants/keys';

export default {
  name: 'Confirmation',
  data() {
    return {
      defaultTitle: 'Are You sure ?',
      title: '',
      message: '',
      onSuccess: () => {},
      onFail: () => {}
    };
  },
  mounted() {
    this.$eventBus.$on(keys.CONFIRM_ALERT, this.handleConfirmation);
  },
  destroyed() {
    this.$eventBus.$off(keys.CONFIRM_ALERT);
  },
  methods: {
    handleConfirmation({ content, onSuccess, onFail }) {
      this.onSuccess = onSuccess;
      this.onFail = onFail;
      this.title = content.title || this.defaultTitle;
      this.message = content.message;
      this.showModal();
    },
    onConfirm() {
      this.onSuccess();
      this.hideModal();
    },
    onCancel() {
      this.onFail();
      this.hideModal();
    },
    showModal() {
      this.$refs.confirmationModalRef.show();
    },
    hideModal() {
      this.$refs.confirmationModalRef.hide();
    }
  }
};
</script>

