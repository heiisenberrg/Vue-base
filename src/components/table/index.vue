<template>
  <div class="row overflow-container m-0 pl-1 pr-1">
    <table
      :class="tableClass"
      class="table"
    >
      <thead>
        <tr>
          <th
            v-for="(column, index) in options.columns"
            :key="column.id"
            v-bind="column.headerCellProps"
          >
            <template v-if="options.enableSelect && !index">
              <span padding="checkbox">
                <input
                  :checked="numSelected === totalCount"
                  type="checkbox"
                  @change="selectAllClick"
                >
              </span>
            </template>
            <template v-if="column.headerCellSlot">
              <slot
                :name="column.headerCellSlot.name"
                :data="{column}"
              />
            </template>
            <template v-else>
              {{ column.label }}
            </template>
            <template v-if="column.sortable">
              <i
                v-restrict
                :class="`fa fa-fw fa-sort${orderBy === column.dataKey ?
                order === 'asc' ? '-asc' : '-desc': ''}`"
                :title="`Sort ${column.label}`"
                role="presentation"
                @click="() => handleRequestSort(column.dataKey)"
              />
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="(data && !data.length || !data) && !loading"
          :colspan="options.columns.length"
        >
          No Data found
        </tr>
        <tr
          v-for="datum in data"
          v-else
          :key="datum.id"
          v-restrict
          @click="(e)=> options.rowProps.onClick ? options.rowProps.onClick(e, datum): ''"
        >
          <td
            v-for="(column, columnIndex) in options.columns"
            :key="column.id"
            v-restrict
            v-bind="column.cellProps"
            @click="()=> column.onClick ? column.onClick(datum[column.dataKey]): ''"
          >
            <template v-if="options.enableSelect && !columnIndex">
              <span padding="checkbox">
                <input
                  :checked="findIndex(selected, datum.id) !== -1"
                  type="checkbox"
                  @change="event => handleSelect(event, datum)"
                >
              </span>
            </template>
            <template v-if="column.cellSlot">
              <slot
                :name="column.cellSlot.name"
                :data="{datum}"
              />
            </template>
            <template v-else>
              {{ datum[column.dataKey] }}
            </template>
          </td>
        </tr>
      </tbody>
      <t-pagination
        :columnLength="options.columns.length"
        :count="totalCount"
        :rowsPerPage="options.rowsPerPage"
        :page="options.page"
        :onChangePage="handleChangePage"
        :onChangeRowsPerPage="handleChangeRowsPerPage"
      />
    </table>
  </div>

</template>

<script>
import SlotMixin from '@/mixins/slot';
import TPagination from './pagination.vue';

export default {
  name: 'Table',
  components: {
    TPagination
  },
  mixins: [SlotMixin],
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      order: 'asc',
      orderBy: '',
      selected: []
    };
  },
  computed: {
    numSelected() {
      return this.selected.length;
    },
    tableClass() {
      const { rowProps } = this.options;
      return { 'table-hover': rowProps && rowProps.onClick };
    }
  },
  beforeCreate() {
  },
  watchers: {
    selected() {
      this.numSelected = this.selected.length;
    }
  },
  methods: {
    handleChangePage(page) {
      if (!this.loading) {
        const { onPageChange, rowsPerPage } = this.options;
        if (onPageChange) {
          onPageChange(page, rowsPerPage);
        }
      }
    },
    handleChangeRowsPerPage(event) {
      if (!this.loading) {
        const { page, onPageChange } = this.options;
        if (onPageChange) {
          onPageChange(page, event.target.value);
        }
      }
    },
    handleRequestSort(property) {
      if (!this.loading) {
        const { rowsPerPage, page, onSort } = this.options;
        const orderBy = property;
        let order = 'desc';
        if (this.orderBy === property && this.order === 'desc') {
          order = 'asc';
        }
        this.order = order;
        this.orderBy = orderBy;
        if (onSort) {
          onSort(rowsPerPage, page, order, orderBy);
        }
      }
    },
    selectAllClick(event) {
      if (!this.loading) {
        const { onSelectAll } = this.options;
        this.selected = event.target.checked ? this.data.map(n => n.id) : [];
        if (onSelectAll) {
          onSelectAll(this.selected);
        }
      }
    },
    handleSelect(event, data) {
      if (!this.loading) {
        const { selected } = this;
        const { onSelect } = this.options;
        const selectedIndex = this.findIndex(selected, data.id);
        let newSelected = [];
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, data.id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          );
        }
        if (onSelect) {
          onSelect(data);
        }
        this.selected = newSelected;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>
