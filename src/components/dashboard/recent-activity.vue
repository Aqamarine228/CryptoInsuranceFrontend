<script setup>
import {onMounted, ref} from "vue";
import ArrowUpCircleIcon from "@zhuowenli/vue-feather-icons/icons/ArrowUpCircleIcon";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import laravelDateToHumanReadable from "../../common/laravelDateToHumanReadable";

const recentActivity = ref([])
const loading = ref(true)

onMounted(() => {
  getRecentActivity();
})

function getRecentActivity() {
  axiosInstance.get(backend.insuranceRecentActivity).then((response) => {
    recentActivity.value = response;
    loading.value = false;
  })
}
</script>

<template>
  <b-card no-body class="card-height-100">
    <b-card-header class="align-items-center d-flex">
      <b-card-title class="mb-0 flex-grow-1">Recent Activity</b-card-title>
    </b-card-header>
    <b-card-body class="p-0">
      <div data-simplebar>
        <div class="p-3 placeholder-glow" v-if="loading">
          <template v-for="item in 9" :key="item">
            <div class="d-flex align-items-center mb-3">
              <div class="avatar-xs flex-shrink-0">
                <span class="avatar-title bg-light rounded-circle">
                  <span class="spinner-border spinner-border-sm"></span>
                </span>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="fs-14 mb-1"><span class="placeholder w-100"></span></h6>
                <p class="text-muted fs-12 mb-0">
                  <span class="placeholder placeholder-sm w-100"></span>
                </p>
              </div>
            </div>
          </template>
        </div>
        <div class="p-3" v-else>
          <template v-for="(item, index) of recentActivity" :key="index">
            <div class="d-flex align-items-center mb-3">
              <div class="avatar-xs flex-shrink-0">
                <span class="avatar-title bg-light rounded-circle">
                  <ArrowUpCircleIcon class="icon-dual-success icon-sm" />
                </span>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="fs-14 mb-1">{{ item.insurance_option.name }}</h6>
                <p class="text-muted fs-12 mb-0">
                  <i class="mdi mdi-circle-medium text-success fs-15 align-middle"></i>
                  {{$t('dashboard.insuranceRequestApproved')}}
                </p>
              </div>
              <div class="flex-shrink-0 text-end">
                <h6 :class="`mb-1`">
                  {{ item.coverage }}<span class="text-uppercase ms-1">USD</span>
                </h6>
                <p class="text-muted fs-13 mb-0">{{ laravelDateToHumanReadable(item.created_at) }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>