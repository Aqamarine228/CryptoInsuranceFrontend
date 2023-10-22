<script setup>

import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import backend from "@/config/backend";
import axiosInstance from "@/plugins/axios";

const store = useStore()

const hasInsurance = computed(() => store.getters['user/hasInsurance'])

const insurance = ref({})
const loading = ref(true)

onMounted(() => {
  getInsurance()
})

function getInsurance() {
  axiosInstance.get(backend.insurances).then((response) => {
    insurance.value = response
    loading.value = false
  })
}

</script>

<template>
  <b-card class="card-height-100">
    <b-card-body v-if="hasInsurance">
      <div class="mb-4">
        <div class="avatar-lg mx-auto">
          <div class="avatar-title bg-light text-success display-5 rounded-circle">
            <i class="ri-secure-payment-line"></i>
          </div>
        </div>
      </div>

      <div class="p-2 mt-4">
        <div class="text-muted text-center mb-4 mx-lg-3 placeholder-glow">
          <h4 v-if="loading"><span class="placeholder w-25"></span></h4>
          <h4 v-else>{{ $t('dashboard.insuranceTitle') }}</h4>
          <p v-if="loading"><span class="placeholder placeholder-sm w-25"></span></p>
          <p v-else>{{ $t('insurance.coverage') }}: {{ insurance.coverage }}$</p>
        </div>

        <ul class="list-unstyled vstack gap-3 d-flex w-100 mt-5">
          <b-row v-if="loading">
            <b-col v-for="option in 20" :key="option" lg="6" class="mb-1">
              <li>
                <div class="d-flex align-items-center placeholder-glow">
                  <div class="flex-grow-1" style="font-size: 1rem"><span class="placeholder w-75 placeholder-sm"></span>
                  </div>
                </div>
              </li>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col v-for="option in insurance.options" :key="option.id" lg="6" class="mb-3">
              <li>
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 text-success me-1">
                    <i class="ri-checkbox-circle-fill align-middle" style="font-size: 1rem"></i>
                  </div>
                  <div class="flex-grow-1" style="font-size: 1rem" v-b-tooltip.hover :title="option.description">
                    {{ option.name }}
                  </div>
                </div>
              </li>
            </b-col>
          </b-row>
        </ul>

        <div class="mt-3">
          <router-link :to="{name: 'Insurances'}" class="w-100 btn btn-success" :class="loading ? 'disabled' : ''">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <span v-else>{{ $t('dashboard.createInsuranceRequest') }}</span>
          </router-link>
        </div>
      </div>
    </b-card-body>
    <b-card-body v-else>
      <div class="mb-4">
        <div class="avatar-lg mx-auto">
          <div class="avatar-title bg-light text-primary display-5 rounded-circle">
            <i class="ri-shield-line"></i>
          </div>
        </div>
      </div>

      <div class="p-2 mt-4">
        <div class="text-muted text-center mb-4 mx-lg-3">
          <h4 class="">{{ $t('dashboard.getInsuranceToday') }}</h4>
        </div>

        <div class="text-muted mb-4">
          <p>{{ $t('dashboard.getInsuranceText1') }}</p>
          <p>{{ $t('dashboard.getInsuranceText2') }}</p>
          <p>{{ $t('dashboard.getInsuranceText3') }}</p>
          <p>{{ $t('dashboard.getInsuranceText4') }}</p>
        </div>

        <div class="mt-3">
          <router-link :to="{name: 'Insurances'}" class="w-100 btn btn-primary">
            {{ $t('dashboard.getInsuranceButton') }}
          </router-link>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<style scoped>

</style>