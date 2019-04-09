<template>
  <v-layout>
    <div class="padding-container-sm">
      <v-page-header>
        <div slot="header">
          <div class="row">
            <div class="col-lg-6">
              Patient List
            </div>
            <div class="col-lg-6 row">
              <b-input-group size="md">
                <b-input-group-text
                  slot="append"
                  class="bg-white"
                >
                  <strong><i class="icon ion-md-search" /></strong>
                </b-input-group-text>
                <b-form-input
                  class="border-right-0"
                  :value="filter.searchValue"
                  placeholder="Search for patient name or ID in Patient list"
                  @input="onSearchText"
                />
              </b-input-group>
            </div>
          </div>
        </div>
        <div
          slot="action"
          v-if="patientStatusCount"
        >
          <span
            v-for="(statusCount,index) in patientStatusCount"
            :key="index"
            class="status-count-content"
            :class="{active : statusCount.status === filter.status}"
            @click="setStatus(statusCount.status)"
          >
            <span
              class="btn btn-link"
              :class="{disabled : statusCount.status === filter.status, [statusCount.status]: true}"
            >{{ statusCount.status }}</span>
            <span class="count">{{ statusCount.count }}</span>
            <span
              class="seperator"
              v-if="index !== patientStatusCount.length"
            >|</span>
          </span>
        </div>
      </v-page-header>
      <v-table
        :options="tableProps"
        :total-count="totalCount"
        :loading="loading"
        :data="patientList"
      >
        <template
          slot="patientName"
          slot-scope="slotProps"
        >
          <div class="align-items-center d-flex patient-name-content">
            <img
              :src="require(`@/assets/image/${slotProps.data.datum.user.gender === 'male'
              ? 'boy': 'girl'}.svg`)"
              width="35"
              height="35"
              :alt="slotProps.data.datum.user.first_name"
              :title="slotProps.data.datum.user.first_name"
            >
            <div
              class="d-flex flex-column justify-content-center"
              v-if="slotProps"
            >
              <span
                class="text-center btn btn-link"
                @click="viewEHR(slotProps.data.datum.id)"
              >
                {{ slotProps.data.datum.user.first_name | capitalizefirst }}
                {{ slotProps.data.datum.user.last_name | capitalizefirst }}
              </span>
            </div>
          </div>
        </template>
        <template
          slot="status"
          slot-scope="slotProps"
        >
          <div
            v-if="slotProps"
            class="d-flex flex-column justify-content-between align-items-center p-2"
          >
            <span :class="slotProps.data.datum.status.toLowerCase()">
              <span v-if="slotProps.data.datum.status === statuses.assigned"><h2>A</h2></span>
              <span v-if="slotProps.data.datum.status === statuses.unAssigned"><h2>U</h2></span>
              {{ slotProps.data.datum.status }}
            </span>
            <span
              v-if="!slotProps.data.datum.user.is_mobile_verified"
              class="text-danger"
            >( Awaiting activation )
            </span>
            <span
              v-else
            >( Active )
            </span>
          </div>
        </template>
        <template
          slot="category"
          slot-scope="slotProps"
        >
          <span
            v-if="slotProps && slotProps.data.datum.patientCareplan.length
              && slotProps.data.datum.patientCareplan[0].careplan
            && slotProps.data.datum.patientCareplan[0].careplan.category"
          >
            {{ slotProps.data.datum.patientCareplan[0].careplan.category.name }}
          </span>
        </template>
        <template
          slot="patientCareplan"
          slot-scope="slotProps"
        >
          <span v-if="slotProps">
            <div
              class="d-flex flex-column justify-content-between p-2"
              v-if="slotProps.data.datum.patientCareplan.length"
              v-b-tooltip.hover
              :title="slotProps.data.datum.patientCareplan[0].careplan.title"
            >
              <span
                class="btn-link"
                v-restrict
                @click="viewCarePlan(slotProps.data.datum.patientCareplan[0].careplan.id, true)"
              >
                {{ slotProps.data.datum.patientCareplan[0].careplan.title }}
              </span>
              <div>
                <span
                  class="btn-link red"
                  @click="confirmAndUmnAssignCareplan(slotProps.data.datum)"
                >
                  <i class="fa fa-times" />
                  UnAssign
                </span>
              </div>
              <div class="d-flex flex-row justify-content-around pl-2 pr-2">
                <!-- <span
                  class="btn-link green"
                  v-if="slotProps.data.datum.status === statuses.assigned"
                >
                  <i class="fa fa-pause" />
                  Pause
                </span>
                <span
                  class="btn-link green"
                  v-if="slotProps.data.datum.status === statuses.stopped"
                >
                  <i class="fa fa-refresh" />
                  Restart
                </span>
                <span
                  class="btn-link green"
                  v-if="slotProps.data.datum.status === statuses.paused"
                >
                  <i class="fa fa-play" />
                  Play
                </span>
                <span
                  class="btn-link red"
                  v-if="slotProps.data.datum.status !== statuses.stopped"
                >
                  <i class="fa fa-ban" />
                  Abort
                </span>
                <span
                  class="btn-link red"
                  v-if="slotProps.data.datum.status === statuses.stopped"
                  @click="
                    confirmAndUmnAssignCareplan(slotProps.data.datum,
                                                slotProps.data.datum.patientCareplan[0])"
                >
                  <i class="fa fa-times" />
                  UnAssign
                </span> -->
              </div>
            </div>
            <div v-else>
              <button
                class="btn btn-primary"
                @click="assignCareplan(slotProps.data.datum)"
              >
                Assign
              </button>
            </div>
          </span>
        </template>
      </v-table>
    </div>
    <b-modal
      id="modal-center"
      ref="planDurationRef"
      body-class="pt-0"
      centered
      title="Set plan duration for patient"
    >
      <div class="row">
        <div class="col col-md-12 col-12 position-fixed p-3 search-bar-content">
          {{ selectedCareplan.title }}
        </div>
        {{ selectedCareplan.plan_no || '' }} - {{ selectedCareplan.title }}
        <div class="col col-md-12 col-12 mt-5">
          <div class="row">
            <v-date-picker
              @onChange="onPlanDurationStartDateChange"
              label="Plan start date"
              :value="defaultDateFormat(planDuration.startDate)"
              v-validate="'required'"
              :class="{'danger': errors.has('plan_start_date'), 'col-6' : true }"
              name="plan_start_date"
              position="bottom"
            />
            <v-date-picker
              :disabled="true"
              @onChange="value=> merge(planDuration, {endDate : value})"
              label="Plan End date"
              :value="defaultDateFormat(planDuration.endDate)"
              v-validate="'required'"
              :class="{'danger': errors.has('plan_start_date') ,'col-6' : true }"
              name="plan_start_date"
            />
          </div>
        </div>
      </div>
      <div
        slot="modal-footer"
        class="w-100"
      >
        <b-btn
          size="sm"
          class="float-right"
          variant="primary"
          @click="addCareplan"
        >
          Assign
        </b-btn>
        <b-btn
          size="sm"
          class="float-right btn btn-outline-primary mr-2"
          @click="onAssignCareplanCancel"
        >
          Cancel
        </b-btn>
      </div>
    </b-modal>
    <b-modal
      id="modal-center"
      ref="assignCareplanRef"
      body-class="pt-0"
      :footer-class="`display-none`"
      centered
      title="Assign care plan"
    >
      <div class="row">
        <div class="col col-md-12 col-12 position-fixed p-3 search-bar-content">
          <b-form-input
            v-model="carePlanSearchText"
            type="text"
            placeholder="Enter care plan name or ID"
            class="search-bar"
          />
        </div>
        <div class="col col-md-12 col-12 mt-5">
          <div
            v-if="(careplans &&
              !careplans.length || !careplans)
            && !careplanSearching"
            class="d-flex justify-content-center"
          >
            No Data found
          </div>
          <div
            v-for="careplan in careplans"
            :key="careplan.id"
            class="template"
            @click="setCurrentCareplan(careplan)"
          >
            <label
              v-restrict
              @click="viewCarePlan(careplan.id)"
            >
              <span class="btn-link">{{ careplan.title }}</span>
            </label>
            <p v-if="careplan.plan_no"> {{ careplan.plan_no }}</p>
            <div class="template-detail">
              <span>Duration: {{ careplan.plan_duration }} days</span>
              <span>Interventions: {{ careplan.interventions }}</span>
              <span>Assessments: {{ careplan.assessments }}</span>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </v-layout>
</template>

<script>
import VTable from '@/components/table/index.vue';
import { mapGetters } from 'vuex';
import VLayout from '@/layouts/Default.vue';
import VPageHeader from '@/components/pageheader/PageHeader.vue';

export default {
  name: 'PatientList',
  components: {
    VTable,
    VLayout,
    VPageHeader
  },
  data() {
    return {
      patient: {},
      selectedCareplan: {},
      statuses: {
        assigned: 'Assigned',
        unAssigned: 'UnAssigned',
        paused: 'Paused',
        stopped: 'Stopped'
      },
      carePlanSearchText: '',
      planDuration: {
        startDate: '',
        endDate: ''
      },
      filter: {
        status: 'All',
        searchValue: '',
        limit: 10,
        pageNo: 1
      },
      tableProps: {
        columns: [
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {
              class: 'text-left'
            },
            cellSlot: {
              name: 'patientName'
            },
            dataKey: 'name',
            dataType: String,
            label: 'Name'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {},
            dataKey: 'mr_id',
            dataType: String,
            label: 'ID'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellSlot: {
              name: 'category'
            },
            cellProps: {},
            dataKey: 'category',
            dataType: String,
            label: 'Type'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellSlot: {
              name: 'status'
            },
            cellProps: {},
            dataKey: 'status',
            dataType: String,
            label: 'Status'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {},
            cellSlot: {
              name: 'patientCareplan'
            },
            disablePadding: false,
            label: 'Care Plan'
          }
        ],
        enableSelect: false,
        onPageChange: this.onPageChange,
        page: 1,
        rowProps: {},
        rowsPerPage: 10,
        title: 'PatientList'
      }
    };
  },
  computed: {
    ...mapGetters({
      patientList: 'patientList/getPatientList',
      patientStatusCount: 'patientList/getPatientStatusCount',
      loading: 'patientList/getLoading',
      careplanSearching: 'careplan/getSearching',
      totalCount: 'patientList/getTotalCount',
      careplans: 'careplan/getSearchedCareplans'
    })
  },
  watch: {
    filter: {
      handler: 'fetchPatients',
      immediate: true
    },
    carePlanSearchText: {
      handler: 'fetchCareplans',
      immediate: true
    }
  },
  methods: {
    onPageChange(pageNo, rowsPerPage) {
      this.tableProps.page = pageNo;
      this.filter = {
        ...this.filter,
        pageNo,
        limit: rowsPerPage
      };
    },
    onSearchText(event) {
      this.filter = {
        ...this.filter,
        searchValue: event
      };
    },
    fetchCareplans(searchValue) {
      const filter = {
        ...this.filter,
        searchValue
      };
      this.$store.dispatch('careplan/searchCarePlans', filter);
    },
    fetchPatients() {
      this.$store.dispatch('patientList/getPatients', this.filter);
    },
    assignCareplan(patient) {
      this.searchValue = '';
      this.patient = patient;
      this.$refs.assignCareplanRef.show();
    },
    addCareplan() {
      this.$refs.planDurationRef.hide();
      this.confirmAndAssignCareplan();
    },
    onAssignCareplanCancel() {
      this.$refs.planDurationRef.hide();
    },
    onControlClick(type, id) {
      if (type === 'Delete') {
        const data = { is_active: false };
        this.$store.dispatch('patientList/remove', { data, id });
      }
    },
    setCurrentCareplan(plan) {
      this.selectedCareplan = plan;
      this.$refs.planDurationRef.show();
    },
    confirmAndAssignCareplan() {
      const content = {
        title: 'Are you sure ?',
        message: `Would you like to assign this care plan ${this.selectedCareplan.plan_no} 
        to ${this.patient.user.first_name} ${this.patient.user.last_name}?`
      };
      this.conFirmAlert(
        content,
        () => {
          const data = {
            carePlanId: this.selectedCareplan.id,
            patientId: this.patient.id,
            startDate: this.planDuration.startDate,
            endDate: this.planDuration.endDate
          };
          this.$store.dispatch('patient/assignCareplan', data);
        },
        () => {
          this.selectedCareplan = {};
          this.planDuration = {
            startDate: '',
            endDate: ''
          };
        }
      );
    },
    confirmAndUmnAssignCareplan(patient) {
      const plan = patient.patientCareplan[0].careplan;
      const content = {
        title: `UnAssign care plan ${plan.title}`,
        message: `Do you want to un assign this user (${patient.user.first_name} ${patient.user.last_name})?`
      };
      this.conFirmAlert(
        content,
        () => {
          const data = {
            carePlanId: plan.id,
            patientId: patient.id
          };
          this.$store.dispatch('patientList/unAssignCareplan', data);
        },
        () => {
          this.selectedCareplan = {};
          this.planDuration = {
            startDate: '',
            endDate: ''
          };
        }
      );
    },
    editPatient(id) {
      this.$router.push({
        name: 'patientList.edit', params: { id }
      });
    },
    viewCarePlan(id, isSelf) {
      const routeData = this.$router.resolve({ name: 'careplan.view', params: { id } });
      window.open(routeData.href, isSelf ? '_self' : '_blank');
    },
    viewEHR(id) {
      this.$router.push({
        name: 'patientList.view', params: { id }
      });
    },
    setStatus(currentStatus) {
      if (this.filter.status !== currentStatus) {
        this.filter = {
          ...this.filter,
          status: currentStatus
        };
      }
    },
    onPlanDurationStartDateChange(value) {
      this.planDuration = this.merge(
        this.planDuration,
        {
          startDate: value,
          endDate: this.addDays(value, this.selectedCareplan.plan_duration || 1)
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
