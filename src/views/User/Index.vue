<template>
  <v-layout>
    <div class="padding-container-sm">
      <v-page-header>
        <div slot="header">
          <div class="row">
            <div class="col-lg-6">
              All users
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
                  placeholder="Search for author/navigator name or ID"
                  @input="onSearchText"
                />
              </b-input-group>
            </div>
          </div>
        </div>
        <div
          slot="action"
          v-if="isNotEmpty(userCount)"
        >
          <span
            v-for="(statusCount,index) in userCount"
            :key="index"
            class="status-count-content"
            :class="{active : statusCount.designation === filter.designation}"
            @click="setStatus(statusCount.designation)"
          >
            <span
              class="btn btn-link"
              :class="{disabled : statusCount.designation === filter.designation,
                       [statusCount.designation]: true}"
            >{{ statusCount.designation | normalizetext }}
              <span v-if="index === userCount.length -1">All</span>
            </span>
            <span class="count">{{ statusCount.count }}</span>
            <span
              class="seperator"
              v-if="index !== userCount.length -1"
            >|</span>
          </span>
        </div>
      </v-page-header>
      <v-table
        :options="tableProps"
        :total-count="totalCount"
        :data="users"
      >
        <template
          slot="name"
          slot-scope="slotProps"
        >
          <div class="align-items-center d-flex patient-name-content">
            <img
              :src="require(`@/assets/image/${slotProps.data.datum.gender === 'male'
              ? 'boy': 'girl'}.svg`)"
              width="35"
              height="35"
              :alt="slotProps.data.datum.first_name"
              :title="slotProps.data.datum.first_name"
            >
            <div
              class="d-flex flex-column justify-content-center"
              v-if="slotProps"
            >
              <span>
                {{ slotProps.data.datum.first_name | capitalizefirst }}
                {{ slotProps.data.datum.last_name | capitalizefirst }}
              </span>
            </div>
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
              @click="editCarePlan(slotProps.data.datum.id)"
            >
              <i class="icon ion-md-create" />Modify
            </button>
            <button
              class="btn-delete"
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
  name: 'Users',
  components: {
    VTable,
    VLayout,
    VPageHeader
  },
  data() {
    return {
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
              name: 'name'
            },
            dataKey: 'first_name',
            dataType: String,
            label: 'Users'
          },
          {
            headerCellProps: {
              class: 'header-cell'
            },
            cellProps: {},
            dataKey: 'designation',
            dataType: String,
            label: 'Roles'
          },
          {
            headerCellProps: {
              class: 'header-cell'
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
            cellProps: {},
            dataKey: 'email',
            dataType: String,
            label: 'Email Address'
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
        title: 'All users'
      }
    };
  },
  computed: {
    ...mapGetters({
      users: 'user/getAllUsers',
      userCount: 'user/getUserCount',
      totalCount: 'user/getTotalCount'
    })
  },
  watch: {
    filter: {
      handler: 'fetchUsers',
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
    fetchUsers() {
      this.$store.dispatch('user/view', this.filter);
    },
    onControlClick(type, id) {
      if (type === 'Delete') {
        const data = { is_active: false };
        this.$store.dispatch('user/remove', { data, id });
      }
    },
    editPatient(id) {
      this.$router.push({
        name: 'user.edit', params: { id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
