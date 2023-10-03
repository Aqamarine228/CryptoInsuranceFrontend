<script setup>


import {computed, onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import Pagination from "@/components/global/pagination.vue";
import laravelDateToHumanReadable from "../../common/laravelDateToHumanReadable";

const referrals = ref([]);
const meta = ref([]);
const currentPage = ref(1)
const loading = ref(true);
const filterableColumns = ref({});
const filterableColumnIcons = ref({});

const columns = [
  {
    label: "referrals.name",
    name: "first_name",
    sortable: false,
  },
  {
    label: "referrals.last_income",
    name: "last_income",
    sortable: false,
  },
  {
    label: "referrals.overall_income",
    name: "inviter_income_sum_amount",
  },
]

onMounted(() => {
  getData(currentPage.value);
})

const filterableColumnsToParams = computed(() => {
  const columns = []
  Object.keys(filterableColumns.value).forEach((column) => {
    columns.push({
      name: column, order: filterableColumns.value[column]
    })
  })
  if (!columns.length) {
    return null
  }
  return columns
})

function changePage({page}) {
  currentPage.value = page
  getData()
}

function getData() {
  loading.value = true
  axiosInstance.get(backend.referrals, {
    params: {
      page: currentPage.value,
      filterable_columns: filterableColumnsToParams.value,
    }
  }).then((response) => {
    referrals.value = response.data
    meta.value = response.meta
    loading.value = false
  })
}

function sortByColumn(column) {
  if (!filterableColumns.value[column] || filterableColumns.value[column] === 'desc') {
    filterableColumns.value[column] = 'asc'
    filterableColumnIcons.value[column] = 'bxs-up-arrow'
    getData()
    return
  }

  filterableColumns.value[column] = 'desc'
  filterableColumnIcons.value[column] = 'bxs-down-arrow'
  getData()
}
</script>

<template>
  <b-card no-body>
    <b-card-header class="align-items-center d-flex">
      <b-card-title class="mb-0 flex-grow-1">{{$t('referrals.tableTitle')}}</b-card-title>
    </b-card-header>

    <b-card-body>
      <div class="table-responsive table-card">
        <table class="table table-borderless table-hover table-nowrap align-middle mb-0">
          <thead class="table-light">
            <tr class="text-muted">
              <th scope="col" style="width: 20%" v-for="item in columns" :key="item.name">
                <span class="text-body" v-if="item.sortable === false">{{ $t(item.label) }}</span>
                <a v-else href="" @click.prevent="sortByColumn(item.name)" class="text-body">
                  {{ $t(item.label) }}
                  <i v-if="filterableColumnIcons[item.name]" class="bx"
                     :class="filterableColumnIcons[item.name]"></i>
                </a>
              </th>
            </tr>
          </thead>

          <tbody v-if="loading">
          <tr v-for="placeholder in 5" :key="placeholder" class="placeholder-glow">
            <td><span class="placeholder w-25"></span></td>
            <td><span class="placeholder w-25"></span></td>
            <td><span class="placeholder w-25"></span></td>
          </tr>
          </tbody>

          <tbody v-else>
            <tr v-for="(item, index) in referrals" :key="index">
              <td>{{ item.name }}</td>
              <td>{{item.last_income ? laravelDateToHumanReadable(item.last_income) : '-'}}</td>
              <td>
                <div class="text-nowrap">{{ item.income }}$</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card-body>
    <b-card-footer>
      <pagination v-if="!loading" @pageChange="changePage" :total="meta.total" :page-number="meta.last_page"
                  :current-page="currentPage"/>
    </b-card-footer>
  </b-card>
</template>
