<script setup>

import {computed, onMounted, ref} from "vue";
import backend from "@/config/backend";
import axiosInstance from "@/plugins/axios";
import laravelDateToHumanReadable from "../../common/laravelDateToHumanReadable";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";

const store = useStore()
const i18n = useI18n()

const insurance = ref({});

onMounted(() => {
  getInsurance()
})

const hasInsuranceRequest = computed(() => store.getters['user/user'].has_insurance_request)

function getInsurance() {
  axiosInstance.get(backend.insurance).then((response) => {
    insurance.value = response
  })
}
</script>

<template>
  <b-row>
    <b-col md="6">
      <b-card no-body class="card-animate">
        <b-card-body>
          <div class="d-flex justify-content-between">
            <div>
              <p class="fw-medium text-muted mb-0">{{$t('insurance.expiresAt')}}</p>
              <h2 class="mt-4 ff-secondary fw-semibold">
                {{ laravelDateToHumanReadable(insurance.expires_at) }}
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-info rounded-circle fs-2">
                  <i class="bx bx-calendar"></i>
                </span>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col md="6">
      <b-card no-body class="card-animate">
        <b-card-body>
          <div class="d-flex justify-content-between">
            <div>
              <p class="fw-medium text-muted mb-0">{{$t('insurance.boughtAt')}}</p>
              <h2 class="mt-4 ff-secondary fw-semibold">
                {{ laravelDateToHumanReadable(insurance.created_at) }}
              </h2>
            </div>
            <div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-success rounded-circle fs-2">
                  <i class="bx bx-calendar-check"></i>
                </span>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col md="12">
      <b-alert variant="warning" v-model="hasInsuranceRequest" dismissible>
        {{ $t('insurance.notAbleToSubmitInsuranceRequest')}}
      </b-alert>
    </b-col>
  </b-row>
  <b-row class="justify-content-center">
    <b-col xl="12">
      <b-row>
        <b-col lg="4" v-for="(option, key) in insurance.options" :key="key">
          <b-card no-body class="pricing-box">
            <b-card-body class="p-4 m-2">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="mb-3">{{ option.name }}</h6>
                </div>
              </div>
              <div>
                <b-accordion>
                  <b-accordion-item :title="i18n.t('insurance.more') + '...'">
                    {{ option.description }}
                  </b-accordion-item>
                </b-accordion>
                <div class="mt-4">
                  <router-link
                      v-if="!hasInsuranceRequest"
                      class="btn btn-primary w-100"
                      :to="{name: 'Insurance request', params: {
                        id: option.id
                      }}"
                  >
                    {{$t('insurance.submitInsuranceRequest')}}
                  </router-link>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<style scoped>

</style>