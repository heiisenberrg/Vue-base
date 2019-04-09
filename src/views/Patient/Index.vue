<template>
  <v-layout>
    <div class="padding-container-sm">
      <v-page-header>
        <div slot="header">
          <div class="row">
            <div class="col-lg-6">
              Patients
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
              v-if="index !== patientStatusCount.length - 1"
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
          <div class="d-flex patient-name-content">
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
              <span>
                {{ slotProps.data.datum.user.first_name | capitalizefirst }}
                {{ slotProps.data.datum.user.last_name | capitalizefirst }}
              </span>
              {{ slotProps.data.datum.mr_id }}
            </div>
          </div>
        </template>
        <template
          slot="mobile"
          slot-scope="slotProps"
        >
          <div v-if="slotProps">
            {{ slotProps.data.datum.user.mobile_no }}
          </div>
        </template>
        <template
          slot="email"
          slot-scope="slotProps"
        >
          <div v-if="slotProps">
            {{ slotProps.data.datum.user.email }}
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
          slot="actions"
          slot-scope="slotProps"
        >
          <span
            v-if="slotProps"
            class="d-flex justify-content-around"
          >
            <button
              class="btn-modify"
              :disabled="getStatus(slotProps.data.datum.status)"
              @click="editCarePlan(slotProps.data.datum.id)"
            >
              <i class="icon ion-md-create" />Modify
            </button>
            <button
              class="btn-delete"
              :disabled="getStatus(slotProps.data.datum.status)"
              @click="onControlClick('Delete', slotProps.data.datum.id)"
            >
              <i class="icon ion-md-close" />Delete
            </button>
          </span>
        </template>
      </v-table>
    </div>

  </v-layout>
</template>

<script>
import VTable from '@/components/table/index.vue';
import { mapGetters } from 'vuex';
import VLayout from '@/layouts/Default.vue';
import VPageHeader from '@/components/pageheader/PageHeader.vue';

export default {
  name: 'Patients',
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
            cellSlot: {
              name: 'mobile'
            },
            cellProps: {},
            dataKey: 'mobile_no',
            dataType: String,
            label: 'Mobile Number'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellSlot: {
              name: 'email'
            },
            cellProps: {},
            dataKey: 'email',
            dataType: String,
            label: 'Email Address'
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
              name: 'actions'
            },
            disablePadding: false,
            label: 'Actions'
          }
        ],
        enableSelect: false,
        onPageChange: this.onPageChange,
        page: 1,
        rowProps: {},
        rowsPerPage: 10,
        title: 'Patients'
      }
    };
  },
  computed: {
    ...mapGetters({
      patientList: 'patient/getPatients',
      loading: 'patient/getLoading',
      totalCount: 'patient/getTotalCount'
    })
  },
  watch: {
    filter: {
      handler: 'fetchPatients',
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
    fetchPatients() {
      this.$store.dispatch('patient/getPatients', this.filter);
    },
    onControlClick(type, id) {
      if (type === 'Delete') {
        const content = {
          title: 'Delete Patient',
          message: 'Do you want to delete this patient?'
        };
        this.conFirmAlert(
          content,
          () => {
            const data = { is_deleted: true };
            this.$store.dispatch('patient/remove', { data, id });
          },
          () => {
          }
        );
      }
    },
    editPatient(id) {
      this.$router.push({
        name: 'patient.edit', params: { id }
      });
    },
    getStatus(value) {
      if (value === 'Assigned') {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
