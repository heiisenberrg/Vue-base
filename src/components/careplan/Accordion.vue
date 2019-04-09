<template>
  <b-card
    no-body
    class="mb-1 mt-1"
  >
    <b-card-header
      ref="accordion"
      v-b-toggle="`accordion${data.index}`"
      header-tag="header"
      class="p-1"
      role="tab"
    >
      <span>
        {{ data.name }}
        <span class="total-count">
          {{ data.list ? data.list.length : 0 }}
        </span>
      </span>
      <span class="pull-right">
        <span
          v-if="data.isEdit"
          v-b-modal="`modal${data.index}`"
          v-restrict
          class="add-button"
          @click="setCurrentData(data.defaultProps, data.module, actions.ADD)"
        >Add</span>
        <i
          v-if="data.list && data.list.length"
          class="icon"
        />
      </span>
    </b-card-header>
    <b-collapse
      :id="`accordion${data.index}`"
      visible
      accordion="my-accordion"
      role="tabpanel"
    >
      <b-card-body
        v-if="data.list && data.list.length"
        class="row m-0 p-1"
      >
        <div
          v-for="(item, index) in data.list"
          :key="index"
          class="col col-12 col-lg-3 col-md-4 col-sm-6 p-1"
        >
          <div
            v-if="data.module === modules.intervene"
            :style="{ borderBottom: `3px solid ${item.color}` }"
            class="card-inner-container"
          >
            <div class="title">{{ item.name }}</div>
            <div class="footer row m-0 p-0">
              <div class="col col-8 p-0 text-left">{{ item.frequency || 0 }} times</div>
              <div
                v-if="data.isEdit"
                class="col col-4 p-0 text-right"
                @click="setCurrentData(item, modules.intervene, actions.EDIT)"
              >edit</div>
              <div
                v-if="!data.isEdit"
                class="col col-4 p-0 text-right"
                @click="setCurrentData(item, modules.intervene, actions.VIEW)"
              >view</div>
            </div>
          </div>
          <!-- Assessment -->
          <div
            v-if="data.module === modules.assessment"
            class="card-inner-container"
          >
            <div class="title">{{ item.name }}
              <div v-if="item.target_or_time">({{ item.target_or_time }})</div>
            </div>
            <div class="footer row m-0 p-0">
              <div class="col col-8 p-0 text-left">Threshold: {{ item.threshold || 'NA' }} </div>
              <div
                v-if="!data.isEdit"
                class="col col-4 p-0 text-right"
                @click="setCurrentData(item, modules.assessment, actions.VIEW)"
              >view</div>
              <div
                v-if="data.isEdit"
                class="col col-4 p-0 text-right"
                @click="setCurrentData(item, modules.assessment, actions.EDIT)"
              >edit</div>
            </div>
          </div>
          <!-- Instruction -->
          <div
            v-if="data.module === modules.instruction"
            class="card-inner-container"
          >
            <div class="title">{{ item.title }}
              <div v-if="item.label">({{ item.label }})</div>
            </div>
            <div class="footer row m-0 p-0">
              <div class="col col-8 p-0 text-left" />
              <div
                v-if="!data.isEdit"
                class="col col-4 p-0 text-right"
                @click="setCurrentData(item, modules.instruction, actions.VIEW)"
              >view</div>
              <div
                v-if="data.isEdit"
                class="col col-4 p-0 text-right"
                @click="setCurrentData(item, modules.instruction, actions.EDIT)"
              >edit</div>
            </div>
          </div>
        </div>
      </b-card-body>
    </b-collapse>
    <b-modal
      :id="`modal${data.index}`"
      ref="modalRef"
      @hidden="onHidden"
      :title="`${actionType} ${data.name}`"
    >
      <v-intervention
        v-if="moduleName === modules.intervene && moduleData"
        :ref="modules.intervene"
        :actionType="actionType"
        :module="modules.intervene"
        @onSubmit="onSubmit"
        :data="moduleData"
      />
      <v-assessment
        v-if="moduleName === modules.assessment && moduleData"
        :ref="modules.assessment"
        :actionType="actionType"
        :module="modules.assessment"
        @onSubmit="onSubmit"
        :data="moduleData"
      />
      <v-instruction-note
        v-if="moduleName === modules.instruction && moduleData"
        :ref="modules.instruction"
        :actionType="actionType"
        :module="modules.instruction"
        @onSubmit="onSubmit"
        :data="moduleData"
      />
      <div
        slot="modal-footer"
        class="w-100"
      >
        <b-btn
          v-if="!disabled"
          size="sm"
          class="float-right"
          variant="primary"
          @click="callSubmitFromChild"
        >
          {{ moduleData && moduleData.id ? 'Update' : 'Save' }}
        </b-btn>
        <b-btn
          size="sm"
          class="float-right btn btn-outline-primary mr-2"
          @click="onCancel"
        >
          {{ disabled ? 'Close' : 'Cancel' }}
        </b-btn>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import actions from '@/constants/_actions';
import SlotMixin from '@/mixins/slot';
import modules from '@/views/CarePlan/_modules';
import VIntervention from '@/components/careplan/Intervention.vue';
import VAssessment from '@/components/careplan/Assessment.vue';
import VInstructionNote from '@/components/careplan/InstructionNote.vue';

export default {
  name: 'Accordion',
  components: {
    VIntervention,
    VAssessment,
    VInstructionNote
  },
  mixins: [SlotMixin],
  props: {
    data: {
      type: Object,
      default: null
    },
    module: {
      type: String,
      required: true
    },
    onActionComplete: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      actionType: actions.ADD,
      modules,
      actions,
      moduleName: '',
      moduleData: null
    };
  },
  computed: {
    disabled() {
      return this.actionType === actions.VIEW;
    }
  },
  methods: {
    onHidden() {
      this.onCancel();
    },
    callSubmitFromChild() {
      this.$refs[this.data.module].validateAndSubmit();
    },
    setCurrentData(data, currentModule, actionType) {
      this.$refs.modalRef.show();
      this.moduleData = data;
      this.actionType = actionType;
      this.moduleName = currentModule;
    },
    onCancel() {
      this.moduleData = null;
      this.$refs.modalRef.hide();
    },
    onSubmit(data) {
      if (this.actionType === actions.ADD) {
        this.data.onCreate(data);
      } else if (this.actionType === actions.EDIT) {
        this.data.onUpdate(data);
      }
      this.onCancel();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
