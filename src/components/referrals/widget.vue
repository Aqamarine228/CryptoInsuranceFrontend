<script setup>
import {CountTo} from "vue3-count-to";
import {onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";

onMounted(() => {
  getWidgetData()
})

const loading = ref(true);

const crmWidgets = ref([
  {
    id: 1,
    label: "referrals.referralsCount",
    icon: "ri-space-ship-line",
    counter: 197,
    decimals: 0,
    suffix: "",
    prefix: "",
  },
  {
    id: 2,
    label: "referrals.totalProfit",
    icon: "ri-exchange-dollar-line",
    counter: 489.4,
    decimals: 1,
    prefix: "$",
    separator: ",",
  },
  {
    id: 3,
    label: "referrals.todayReferralsCount",
    icon: "ri-pulse-line",
    counter: 32.89,
    decimals: 2,
    suffix: "",
    prefix: "",
  },
  {
    id: 4,
    label: "referrals.todayProfit",
    icon: "ri-trophy-line",
    counter: 1596.5,
    decimals: 1,
    prefix: "$",
    separator: ",",
    suffix: "",
  },
])

function getWidgetData() {
  axiosInstance.get(backend.referralWidgetsData).then(response => {
    crmWidgets.value[0].counter = response.count;
    crmWidgets.value[1].counter = response.income_overall;
    crmWidgets.value[2].counter = response.count_new_today;
    crmWidgets.value[3].counter = response.income_today;
    loading.value = false;
  })
}

</script>

<template>
  <b-card no-body class="crm-widget">
    <b-card-body class="p-0">
      <b-row class="row-cols-xxl-4 row-cols-md-4 row-cols-1 g-0">
        <b-col v-for="(item, index) of crmWidgets" :key="index">
          <div class="py-4 px-3">
            <h5 class="text-muted text-uppercase fs-13">
              {{ $t(item.label) }}
            </h5>
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <i :class="`${item.icon} display-6 text-muted`"></i>
              </div>
              <div class="flex-grow-1 ms-3">
                <h2 class="mb-0" v-if="!loading">
                  {{ item.prefix }}
                  <count-to :startVal='0' :endVal='item.counter' :duration='5000'></count-to>
                  {{ item.suffix }}
                </h2>
                <div class="spinner-border text-primary" role="status" v-else>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
