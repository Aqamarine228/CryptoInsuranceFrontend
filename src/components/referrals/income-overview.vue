<script setup>
import getChartColorsArray from "@/common/getChartColorsArray";
import {onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import timePeriods from "@/common/timePeriods";
import {useStore} from "vuex";
import ru from "apexcharts/dist/locales/ru.json";
import en from "apexcharts/dist/locales/en.json";

const store = useStore()

const chartOptions = {
  chart: {
    height: 290,
    type: "area",
    toolbar: "false",
    locales: [ru, en],
    defaultLocale: store.getters['locale/currentLocale'],
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    type: "datetime"
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return "$" + value + "k";
      },
    },
  },
  colors: getChartColorsArray('["--vz-success", "--vz-danger"]'),
  fill: {
    opacity: 0.06,
    colors: ["#0AB39C", "#F06548"],
    type: "solid",
  },
};

const customTimePeriods = [...timePeriods]
customTimePeriods.shift()

const loading = ref(true)
const selectedTimePeriod = ref(customTimePeriods[0].value);
const series = ref([])

onMounted(() => getData())

function changeTimePeriod(event) {
  selectedTimePeriod.value = event.target.value
  getData()
}

function getData() {
  loading.value = true
  axiosInstance.get(backend.referralIncomeHistoryData, {
    params: {
      time_period: selectedTimePeriod.value,
    }
  }).then((response) => {
    series.value[0] = {
      name: "Income",
      data: response,
    }
    loading.value = false
  })
}
</script>

<template>
  <b-card no-body class="card-height-100">
    <b-card-header class="align-items-center d-flex">
      <b-card-title class="mb-0 flex-grow-1">{{ $t('referrals.dailyIncomeOverview') }}</b-card-title>
      <div class="flex-shrink-0">
        <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                @change="changeTimePeriod($event)">
          <option v-for="period in customTimePeriods" :key="period.value"
                  :selected="period.value === selectedTimePeriod"
                  :value="period.value">
            {{ $t(period.label) }}
          </option>
        </select>
      </div>
    </b-card-header>
    <b-card-body class="px-0">
      <div v-if="loading" class="mt-auto mb-auto h-100 w-100 d-flex justify-content-center align-items-center"><span
          class="spinner-border "></span></div>
      <apexchart v-else class="apex-charts" height="290" dir="ltr" :series="series" :options="chartOptions"></apexchart>
    </b-card-body>
  </b-card>
</template>