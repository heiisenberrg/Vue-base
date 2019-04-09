<template>
  <v-layout>
    <div class="padding-container-sm">
      <v-page-header>
        <span slot="header">
          <div class="row">
            <div class="col-lg-6">
              Care Plan
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
                  :value="filter.searchValue"
                  class="border-right-0"
                  placeholder="Search for care plan name , ID"
                  @input="onSearchText"
                />
              </b-input-group>
            </div>
          </div>
        </span>
        <div slot="action">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="createCarePlan"
          >
            <i class="icon ion-md-add" />
            Create Plan
          </button>
        </div>
      </v-page-header>
      <v-table
        :options="tableProps"
        :total-count="totalCount"
        :loading="loading"
        :data="careplanList"
      >
        <template
          slot="careplanName"
          slot-scope="slotProps"
        >
          <span v-if="slotProps">
            <span
              v-b-tooltip.hover
              :title="slotProps.data.datum.title"
              class="btn btn-link"
              @click="viewCarePlan(slotProps.data.datum.id)"
            >
              {{ slotProps.data.datum.title }}
            </span>
          </span>
        </template>
        <template
          slot="planStartDate"
          slot-scope="slotProps"
        >
          <span v-if="slotProps">
            {{ slotProps.data.datum.patientCareplan.length }}
          </span>
        </template>
        <template
          slot="createdAt"
          slot-scope="slotProps"
        >
          <span v-if="slotProps">
            {{ getFormattedDate(slotProps.data.datum.created_at) }}
          </span>
        </template>
        <template
          slot="category"
          slot-scope="slotProps"
        >
          <span v-if="slotProps">
            {{ slotProps.data.datum.category ? slotProps.data.datum.category.name : '' }}
          </span>
        </template>
        <template
          slot="controls"
          slot-scope="slotProps"
        >
          <!-- Define a custom template for CellData Data -->
          <!-- `slotProps` to customize each todo.            -->
          <span
            v-if="slotProps"
            class="d-flex justify-content-around"
          >
            <button
              v-if="permissions.assign"
              class="btn-assign"
              @click="onControlClick('Assign', slotProps.data.datum)"
            >
              <i class="icon ion-md-add" />Assign
            </button>
            <button
              v-if="permissions.modify"
              class="btn-modify"
              :disabled="Boolean(slotProps.data.datum.patientCareplan.length)"
              @click="editCarePlan(slotProps.data.datum.id)"
            >
              <i class="icon ion-md-create" />Modify
            </button>
            <button
              v-if="permissions.delete"
              class="btn-delete"
              :disabled="Boolean(slotProps.data.datum.patientCareplan.length)"
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
  name: 'CarePlan',
  components: {
    VTable,
    VLayout,
    VPageHeader
  },

  data() {
    return {
      permissions: {
        assign: false,
        create: true,
        modify: true,
        delete: true
      },
      filter: {
        name: '',
        mr_id: '',
        is_recovered: '',
        is_deleted: '',
        status: '',
        user_id: '',
        organisation_id: '',
        searchValue: '',
        limit: 10,
        pageNo: 1
      },
      carePlanName: 'Care Plan',
      tableProps: {
        columns: [
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {
              style: { maxWidth: '130px' },
              class: 'text-truncate text-left'
            },
            cellSlot: {
              name: 'careplanName'
            },
            dataKey: 'title',
            dataType: String,
            label: 'Name'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {
            },
            dataKey: 'plan_no',
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
            cellProps: {
            },
            dataKey: 'category',
            dataType: String,
            label: 'Category'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellSlot: {
              name: 'createdAt'
            },
            cellProps: {
            },
            dataKey: 'created_at',
            dataType: String,
            label: 'Date Created'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {
            },
            cellSlot: {
              name: 'planStartDate'
            },
            dataKey: 'plan_start_date',
            dataType: Number,
            disablePadding: false,
            label: 'Enrolled'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {

            },
            cellSlot: {
              name: 'controls'
            },
            disablePadding: false,
            label: 'Controls'
          }
        ],
        enableSelect: false,
        onPageChange: this.onPageChange,
        onSelect: selectedRow => console.log('selectedRow', selectedRow),
        onSelectAll: data => console.log('slectAllClick', data),
        page: 1,
        rowProps: {
          // onClick: (event, rowData) => this.onRowClick(rowData)
        },
        rowsPerPage: 10,
        title: 'Care Plan'
      }
    };
  },
  computed: {
    ...mapGetters({
      loading: 'careplan/getLoading',
      careplanList: 'careplan/getCareplanList',
      organisationId: 'auth/getOrganisationId',
      totalCount: 'careplan/getTotalCount'
    })
  },
  watch: {
    filter: {
      handler: 'fetchCareplans',
      immediate: true
    },
    organisationId: 'fetchCareplans'
  },
  methods: {
    createCarePlan() {
      this.$router.push({
        name: 'careplan.create', params: { id: 'create' }
      });
    },
    fetchCareplans() {
      if (this.isNotEmpty(this.organisationId)) {
        this.filter.organisation_id = this.organisationId;
        this.$store.dispatch('careplan/getCarePlans', this.filter);
      }
    },
    onSearchText(event) {
      this.filter = {
        ...this.filter,
        searchValue: event
      };
    },
    onRowClick(data) {
      console.log('data', data);
    },
    onControlClick(type, id) {
      if (type === 'Delete') {
        const content = {
          title: 'Delete Care Plan',
          message: 'Do you want to delete this care plan?'
        };
        this.conFirmAlert(
          content,
          () => {
            // confirm
            const data = { is_active: false };
            this.$store.dispatch('careplan/remove', { data, id });
          },
          () => {
            // cancel
          }
        );
      }
    },
    onPageChange(pageNo, rowsPerPage) {
      this.tableProps.page = pageNo;
      this.filter = {
        ...this.filter,
        pageNo,
        limit: rowsPerPage
      };
    },
    viewCarePlan(id) {
      this.$router.push({
        name: 'careplan.view', params: { id }
      });
    },
    editCarePlan(id) {
      this.$router.push({
        name: 'careplan.edit', params: { id }
      });
    }
  }
};

</script>

<style lang="scss">
  @import './style.scss';
</style>
