<template>
  <form @submit.prevent="validateAndSubmit">
    <div class="row">
      <div class="col col-md-12 col-12">
        <div class="form-group">
          <label for="noteTitle">Note Title</label>
          <b-form-input
            v-model="instruction.title"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('noteTitle') }"
            name="noteTitle"
            type="text"
            placeholder="eg Caffeine"
          />
        </div>
      </div>
      <div class="col col-md-12 col-12">
        <div class="form-group">
          <label for="noteLabel">Note label</label>
          <b-form-input
            v-model="instruction.label"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('noteLabel') }"
            name="noteLabel"
            type="text"
            placeholder="eg Avoid Caffiene"
          />
        </div>
      </div>
      <div class="col col-md-12 col-12">
        <div class="form-group">
          <label for="noteLabel">Instruction</label>
          <b-form-textarea
            v-model="instruction.instructions"
            :disabled="disabled"
            v-validate="'required'"
            :class="{'danger': errors.has('instructions') }"
            name="instructions"
            type="text"
            placeholder="eg Avoid consuming Caffiene with STIVARGA"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import actions from '@/constants/_actions';

export default {
  name: 'InstructionNote',
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
      instruction: this.data
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
        this.instruction.careplan_id = this.$store.state.careplan.careplan.id;
        if (result) {
          this.$emit('onSubmit', this.instruction);
        }
      });
    }
  }
};
</script>
