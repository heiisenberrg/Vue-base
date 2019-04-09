<template>
  <v-layout>
    <div class="padding-container-sm">
      <v-page-header>
        <span slot="header">
          <div class="row">
            <div class="col-lg-6">
              Progress View
            </div>
            <div class="col-lg-6">
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
                  placeholder="Search for patient , ID"
                  @input="onSearchText"
                />
              </b-input-group>
            </div>
          </div>
        </span>
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
              :src="require('@/assets/image/boy.svg')"
              width="35"
              height="35"
              :alt="slotProps.data.datum.first_name"
              :title="slotProps.data.datum.first_name"
            >
            <div
              class="d-flex flex-column justify-content-center align-items-center"
              v-if="slotProps"
              v-b-tooltip.hover
              :title="slotProps.data.datum.first_name"
            >
              <span
                @click="viewCareDetails(slotProps.data.datum.id)"
                class="text-center btn btn-link"
              >
                {{ slotProps.data.datum.first_name | capitalizefirst }}
                {{ slotProps.data.datum.last_name | capitalizefirst }}
              </span>
            </div>
          </div>
        </template>


        <template
          slot="todaysProgress"
          slot-scope="slotProps"
        >

          <div
            class="d-flex flex-column justify-content-between align-items-center"
            v-if="slotProps"
          >
            <span class="width">
              <b-progress
                :value="parseInt(slotProps.data.datum.today_progress)"
                :max="parseInt(slotProps.data.datum.today_total_interventions)"
                class="mb-1"
              />
            </span>
            <div class="d-flex justify-content-center align-items-center">
              <span
                class="btn btn-link pl-0"
                @click="viewOverall(slotProps.data.datum.id)"
              >
                View overall
              </span>
              <span>
                {{ slotProps.data.datum.today_progress
                }}/{{ slotProps.data.datum.today_total_interventions }}
              </span>
            </div>
          </div>
        </template>

        <template
          slot="weeksProgress"
          slot-scope="slotProps"
        >
          <div
            class="circle d-flex flex-row justify-content-between"
            v-if="slotProps"
          >
            <div
              v-for="(weekProgress, index) in slotProps.data.datum.progress"
              :key="index"
            >
              <div class="circle-percent-text-body">
                <span
                  class="percent-text"
                  :style="{ 'font-size': '12px' }"
                />
                <div class="circleContainer">
                  <v-circle
                    ref="myprogress"
                    :progress="getPercentage(weekProgress)"
                    :size="30"
                    line-cap="round"
                    :fill="fill"
                    insert-mode="append"
                    :thickness="5"
                  >
                    <p class="title">{{ days[index] }}</p>
                    <span
                      v-if="getComplete(weekProgress)"
                      class="fa fa-check"
                    />
                  </v-circle>
                </div>

              </div>
            </div>

          </div>
        </template>

        <template
          slot="contact"
          slot-scope="slotProps"
        >
          <div class="d-flex flex-column justify-content-center">
            {{ slotProps.data.datum.mobile_no }}
            <span>
              {{ slotProps.data.datum.email }}
            </span>
          </div>
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
import VCircle from '@/components/circularProgressBar/ProgressBar.vue';

export default {
  name: 'PatientList',
  components: {
    VTable,
    VLayout,
    VPageHeader,
    VCircle
  },
  data() {
    return {
      fill: { gradient: ['#F25053'] },
      days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      filter: {
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
            dataKey: 'first_name',
            dataType: String,
            label: 'Name'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {
            },
            dataKey: 'mr_id',
            dataType: String,
            label: 'ID'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {
            },
            cellSlot: {
              name: 'todaysProgress'
            },
            dataKey: 'email',
            dataType: String,
            label: 'Today\'s Progress'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {
            },
            cellSlot: {
              name: 'weeksProgress'
            },
            dataKey: 'email',
            dataType: String,
            label: 'This Week'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {

            },
            cellSlot: {
              name: 'contact'
            },
            dataKey: 'phoneNumber',
            dataType: String,
            label: 'Contact'
          }
        ],
        enableSelect: false,
        onPageChange: this.onPageChange,
        page: 1,
        rowProps: {
        },
        rowsPerPage: 10,
        title: 'Patients Progress'
      }
    };
  },
  computed: {
    ...mapGetters({
      patientList: 'progress/getPatientProgresses',
      patient: 'progress/getPatientProgress',
      loading: 'progress/getLoading',
      totalCount: 'progress/getTotalCount'
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
      this.$store.dispatch('progress/getPatientProgresses', this.filter);
    },
    viewCareDetails(id) {
      console.log(id);
    },
    viewOverall(id) {
      console.log(id);
    },
    getPercentage(data) {
      if (data.total_intervention > 0) {
        return (data.intervention_progress / data.total_intervention) * 100;
      }
      return 0;
    },
    getComplete(data) {
      const value = this.getPercentage(data);
      if (value === 100) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>

