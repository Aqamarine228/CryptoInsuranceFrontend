<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";

const i18n = useI18n()

const widgets = ref([
  {
    id: 1,
    icon: "ri-money-dollar-circle-fill",
    label: i18n.t('dashboard.insuranceFund'),
    counter: "2390.68",
    badge: "ri-arrow-up-s-fill",
  },
  {
    id: 2,
    icon: "ri-history-fill",
    label: i18n.t('dashboard.insurancePaidTotal'),
    counter: "19523.25",
    badge: "ri-arrow-up-s-fill",
  },
  {
    id: 3,
    icon: "ri-time-fill",
    label: i18n.t('dashboard.insurancePaidToday'),
    counter: "14799.44",
    badge: "ri-arrow-down-s-fill",
  },
])

const loading = ref(true)

onMounted(() => {
  getWidgetsData();
})

function getWidgetsData() {
  axiosInstance.get(backend.insuranceStatistics).then((response) => {
    widgets.value[0].counter = response.insurance_fund
    widgets.value[1].counter = response.total_insurance_paid
    widgets.value[2].counter = response.insurance_paid_today
    loading.value = false;
  })
}
</script>

<template>
  <b-col lg="4" md="6" v-for="(item, index) of widgets" :key="index">
    <b-card no-body>
      <b-card-body>
        <div class="d-flex align-items-center">
          <div class="avatar-sm flex-shrink-0">
                    <span class="avatar-title bg-light text-primary rounded-circle fs-3">
                      <i :class="`${item.icon} align-middle`"></i>
                    </span>
          </div>
          <div class="flex-grow-1 ms-3">
            <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">
              {{ item.label }}
            </p>
            <h4 class="mb-0" v-if="loading">
              <span class="spinner-border spinner-border-sm"></span>
            </h4>
            <h4 class="mb-0" v-else>
              $<span class="counter-value">{{ item.counter }}</span>
            </h4>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<style scoped>

</style>