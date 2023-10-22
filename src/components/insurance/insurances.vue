<script setup>

import {computed, onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import laravelDateToHumanReadable from "../../common/laravelDateToHumanReadable";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";

const store = useStore()
const i18n = useI18n()

const loading = ref(true)
const insurances = ref([])
const modalShow = ref(false)
const selectedInsurance = ref(null)
const selectedOption = ref(null)

const hasInsuranceRequest = computed(() => store.getters['user/user'].has_insurance_request)
const makeRequestButtonDisabled = computed(() => !hasInsuranceRequest.value)

onMounted(() => {
  getInsurances()
})

function getInsurances() {
  axiosInstance.get(backend.insurances).then((response) => {
    loading.value = false
    insurances.value = response
  })
}

function openRequestTab(insurance) {
  selectedInsurance.value = insurance
  selectedOption.value = null
  modalShow.value = true
}

</script>

<template>
  <b-row>
    <b-col md="12">
      <b-alert variant="warning" v-model="hasInsuranceRequest" dismissible>
        {{ $t('insurance.notAbleToSubmitInsuranceRequest') }}
      </b-alert>
    </b-col>
  </b-row>
  <b-row v-for="insurance in insurances" :key="insurance.id">
    <b-col>
      <b-card>
        <div class="text-muted">
          <h6 class="mb-3 text-uppercase">{{$t('insurance.summary')}}</h6>

          <ul class="ps-4 vstack gap-2">
            <li v-for="option in insurance.options" :key="option.id">{{ option.name }}</li>
          </ul>

          <b-col class="pt-3 border-top border-top-dashed mt-4">
            <b-row class="row d-flex justify-content-between">
              <b-col lg="3">
                <div>
                  <p class="mb-2 text-uppercase fw-medium">{{$t('insurance.boughtAt')}}:</p>
                  <h5 class="fs-14 mb-0">{{ laravelDateToHumanReadable(insurance.created_at) }}</h5>
                </div>
              </b-col>
              <b-col lg="3">
                <div>
                  <p class="mb-2 text-uppercase fw-medium">{{$t('insurance.expiresAt')}}:</p>
                  <h5 class="fs-14 mb-0">{{ laravelDateToHumanReadable(insurance.expires_at) }}</h5>
                </div>
              </b-col>
              <b-col lg="3">
                <div>
                  <p class="mb-2 text-uppercase fw-medium">{{$t('insurance.coverage')}}:</p>
                  <h5 class="fs-14 mb-0">{{ insurance.coverage }}$</h5>
                </div>
              </b-col>
              <b-col lg="3">
                <div>
                  <p class="mb-2 text-uppercase fw-medium">{{$t('insurance.status')}}:</p>
                  <div class="badge bg-success fs-11">{{$t('insurance.active')}}</div>
                </div>
              </b-col>
            </b-row>
          </b-col>

          <div class="pt-3 border-top border-top-dashed mt-4">
            <h6 class="mb-3 fw-semibold text-uppercase">{{$t('insurance.information')}}</h6>

            <b-row>
              <b-col>
                <div class="border rounded border-dashed p-2">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                      <h5 class="fs-13 mb-1 text-body text-truncate d-block">{{$t('insurance.exchangeName')}}:</h5>
                      <div>{{ insurance.exchange_name }}</div>
                    </div>
                  </div>
                </div>
              </b-col>

              <b-col>
                <div class="border rounded border-dashed p-2">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                      <h5 class="fs-13 mb-1 text-body text-truncate d-block">{{$t('insurance.exchangeId')}}:</h5>
                      <div>{{ insurance.exchange_id }}</div>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col md="4" v-for="wallet in insurance.wallets" :key="wallet.id" class="mb-1">
                <div class="border rounded border-dashed p-2">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1 overflow-hidden">
                      <h5 class="fs-13 mb-1 text-body text-truncate d-block">{{$t('insurance.wallet')}} {{ wallet.cryptocurrency }}:</h5>
                      <div>{{ wallet.value }}</div>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>

        <button
            v-if="makeRequestButtonDisabled"
            class="w-100 mt-3 btn btn-primary"
            @click="openRequestTab(insurance)"
        >
          {{$t('insurance.submitInsuranceRequest')}}
        </button>
      </b-card>
    </b-col>
  </b-row>

  <b-modal v-model="modalShow" body-class="p-0 w-100" header-class="p-3" title-class="text-uppercase" hide-footer
           :title="i18n.t('insurance.submitInsuranceRequest')" class="v-modal-custom" size="xl" centered>
    <div class="modal-body">
      <b-row class="g-3" v-if="selectedInsurance">
        <b-col lg="4" v-for="option in selectedInsurance.options" :key="option.id">
          <b-card no-body class="pricing-box shadow-none">
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
                      class="btn btn-primary w-100"
                      :to="{name: 'Insurance request', params: {
                        id: option.id
                      }}"
                  >
                    {{$t('insurance.chose')}}
                  </router-link>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<style scoped>

</style>