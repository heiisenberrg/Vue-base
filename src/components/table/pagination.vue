<template>
  <tfoot>
    <tr>
      <td :colspan="columnLength">
        <nav v-if="totalPages">
          <div />
          <ul class="mb-0 pagination justify-content-end ">
            <li
              :class="{
                'disabled': gotoFirstDisabled
              }"
              class="page-item"
            >
              <button
                class="page-link"
                @click="onChangePage(1)"
              ><span aria-hidden="true">
                <i class="icon ion-ios-arrow-back" />
                <i class="icon ion-ios-arrow-back" />
              </span></button>
            </li>
            <li
              :class="{
                'disabled': gotoBeforeDisabled
              }"
              class="page-item"
            >
              <button
                class="page-link"
                @click="onChangePage(page - 1)"
              >
                <span aria-hidden="true">
                  <i class="icon ion-ios-arrow-back" />
                </span>
              </button>
            </li>
            <li
              v-for="iterator in pages"
              :key="iterator"
              class="page-item"
            >
              <a
                :title="`goto page ${iterator}`"
                :class="{
                  'active': iterator === page
                }"
                class="page-link"
                @click="onChangePage(iterator)"
              >{{ iterator }}</a>
            </li>
            <li
              :class="{
                'disabled': gotoAfterDisabled
              }"
              class="page-item"
            >
              <button
                class="page-link"
                @click="onChangePage(page + 1)"
              >
                <span aria-hidden="true">
                  <i class="icon ion-ios-arrow-forward" />
                </span>
              </button>
            </li>
            <li
              :class="{
                'disabled': gotoLastDisabled
              }"
              class="page-item"
            >
              <button
                class="page-link"
                @click="onChangePage(totalPages)"
              >
                <span aria-hidden="true">
                  <i class="icon ion-ios-arrow-forward" />
                  <i class="icon ion-ios-arrow-forward" />
                </span>
              </button>
            </li>
          </ul>
          <div>
            <h6>
              Showing {{ ((page-1) * rowsPerPage) + 1 }} to {{ page * rowsPerPage > count ? count :
              page * rowsPerPage }} of {{ count }}
            </h6>
          </div>
        </nav>
      </td>
    </tr>
  </tfoot>
</template>

<script>
import SlotMixin from '@/mixins/slot';

export default {
  name: 'Pagination',
  mixins: [SlotMixin],
  props: {
    count: {
      type: Number,
      required: true
    },
    rowsPerPage: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    onChangePage: {
      type: Function,
      required: true
    },
    onChangeRowsPerPage: {
      type: Function,
      required: true
    },
    columnLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      const { count, rowsPerPage } = this;
      return Math.ceil(count / rowsPerPage);
    },
    pages() {
      const { page } = this;
      const pages = [];
      if ((page >= 1) && (page < this.totalPages)) {
        const initalPage = page === 2 ? 1 : page;
        for (let i = initalPage; i <= (this.totalPages); i += 1) {
          if (pages.length <= 3) {
            pages.push(i);
          } else {
            break;
          }
        }
      } else if (page === this.totalPages) {
        for (let i = this.totalPages; i >= 1; i -= 1) {
          if (pages.length <= 3) {
            pages.unshift(i);
          } else {
            break;
          }
        }
      }
      return pages;
    },
    gotoFirstDisabled() {
      return this.page === 1;
    },
    gotoBeforeDisabled() {
      return this.page < 2;
    },
    gotoAfterDisabled() {
      return this.page > (this.totalPages - 1);
    },
    gotoLastDisabled() {
      return this.page === this.totalPages;
    }
  }
};
</script>

<style lang="scss">
  @import './style.scss';
</style>
