<script setup>
import {computed, onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import timePeriods from "@/common/timePeriods";
import laravelDateToHumanReadable from "../../common/laravelDateToHumanReadable";
import Pagination from "@/components/global/pagination.vue";

const referralIncome = ref([]);
const meta = ref([]);
const selectedTimePeriod = ref(timePeriods[0].value);
const currentPage = ref(1)
const loading = ref(true);
const filterableColumns = ref({});
const filterableColumnIcons = ref({});

const columns = [
  {
    label: "referrals.type",
    name: "payable_type",
  },
  {
    label: "referrals.amount",
    name: "amount",
  },
  {
    label: "referrals.date",
    name: "created_at",
  }
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

function changeTimePeriod(event) {
  selectedTimePeriod.value = event.target.value
  getData()
}

function changePage({page}) {
  currentPage.value = page
  getData()
}

function getData() {
  loading.value = true
  axiosInstance.get(backend.referralIncome, {
    params: {
      page: currentPage.value,
      time_period: selectedTimePeriod.value,
      filterable_columns: filterableColumnsToParams.value,
    }
  }).then((response) => {
    referralIncome.value = response.data
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
  <b-card no-body class="card-height-100">
    <b-card-header class="align-items-center d-flex">
      <b-card-title class="mb-0 flex-grow-1">{{ this.$t("referrals.referralIncome") }}</b-card-title>
      <div class="flex-shrink-0">
        <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                @change="changeTimePeriod($event)">
          <option v-for="period in timePeriods" :key="period.value" :selected="period.value === selectedTimePeriod"
                  :value="period.value">
            {{ this.$t(period.label) }}
          </option>
        </select>
      </div>
    </b-card-header>

    <b-card-body>
      <div class="table-responsive">
        <table class="table table-bordered table-nowrap align-middle mb-0">
          <thead>
          <tr>
            <th scope="col" style="width: 20%" v-for="item in columns" :key="item.name">
              <a href="" @click.prevent="sortByColumn(item.name)" class="text-body">
                {{ this.$t(item.label) }}
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
          <tr v-for="(item, index) of referralIncome" :key="index">
            <td>{{ item.type }}</td>
            <td>${{ item.amount }}</td>
            <td>{{ laravelDateToHumanReadable(item.created_at) }}</td>
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
