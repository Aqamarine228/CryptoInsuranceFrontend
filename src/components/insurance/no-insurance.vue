<script setup>

import {onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRouter} from "vue-router";
import moment from "@/plugins/moment";

const router = useRouter()

const insurancePacks = ref([]);
const subscriptionOptions = ref([]);
const currentOption = ref({});
const loadingOptions = ref(true)
const loadingPacks = ref(true)
const creatingInvoice = ref(false)

onMounted(() => {
  loadSubscriptionOptions().then(() => {
    loadPacks(currentOption.value.id)
  })
})

function loadSubscriptionOptions() {
  loadingOptions.value = true;
  return axiosInstance.get(backend.insuranceSubscriptionOptions).then((response) => {
    subscriptionOptions.value = response
    currentOption.value = subscriptionOptions.value[0];
    loadingOptions.value = false
  })
}

function loadPacks(optionId) {
  loadingPacks.value = true;
  axiosInstance.get(backend.insurancePacks + `?insurance_subscription_option_id=${optionId}`,)
      .then((response) => {
        insurancePacks.value = response
        loadingPacks.value = false
      })
}

function readableDuration(seconds) {
  return moment().duration(seconds, "seconds").humanize()
}

function changeSubscriptionOption(optionId) {
  currentOption.value = subscriptionOptions.value.filter((e) => e.id === optionId)[0]
  loadPacks(optionId)
}

function buy(insurancePackId) {
  axiosInstance.post(backend.createInsuranceInvoiceFromPack, {
    insurance_pack_id: insurancePackId,
    insurance_subscription_option_id: currentOption.value.id
  })
      .then(async (response) => {
        await router.push({
          name: "Insurance invoice",
          params: {
            id: response.id
          }
        })
      })
      .catch(() => creatingInvoice.value = false)
}

</script>

<template>
  <b-row class="justify-content-center mt-4">
    <b-col lg="5">
      <div class="text-center mb-4">
        <h4 class="fs-22">{{$t('insurance.plansAndPricing')}}</h4>

        <div class="d-inline-flex">
          <ul class="nav nav-pills arrow-navtabs plan-nav rounded mb-3 p-1" id="pills-tab" role="tablist"
              v-if="loadingOptions">
            <li class="nav-item" role="presentation" v-for="(_, key) in [[], [], []]" :key="key">
              <div class="spinner-border text-primary" style="margin-right: 10px" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </li>
          </ul>
          <ul class="nav nav-pills arrow-navtabs plan-nav rounded mb-3 p-1" id="pills-tab" role="tablist" v-else>
            <li class="nav-item" role="presentation" v-for="(item, key) in subscriptionOptions" :key="key">
              <b-button variant="link" class="nav-link fw-semibold"
                        :class="currentOption.id === item.id ? 'active' : ''"
                        type="button" role="tab" aria-selected="true" @click="changeSubscriptionOption(item.id)">
                {{ readableDuration(item.duration) }}
                <span class="badge bg-success" v-if="item.sale_percentage !== 0">{{ item.sale_percentage }}% {{$t('insurance.off')}}</span>
              </b-button>
            </li>
          </ul>
        </div>
      </div>
    </b-col>
  </b-row>
  <b-row v-if="loadingPacks">
    <b-col xxl="4" lg="6" v-for="(pack, key) in [[], [], []]" :key="key">
      <b-card no-body class="pricing-box">
        <b-card-body class="bg-light m-2 p-4">
          <div class="d-flex align-items-center mb-3 justify-content-center">
            <div class="flex-grow-1">
              <h5 class="mb-0 text-primary placeholder-glow">
                <span class="placeholder w-25"></span>
              </h5>
            </div>
            <div class="ms-auto mb-lg-5">
              <h2 class="month mb-0 text-primary placeholder-glow">
                <span class="placeholder w-100"></span>
              </h2>
            </div>
          </div>

          <p class="text-muted placeholder-glow mt-lg-5 mb-lg-5">
            <span class="placeholder placeholder-lg w-100"></span>
            <span class="placeholder placeholder-lg w-100"></span>
            <span class="placeholder placeholder-lg w-100"></span>
          </p>
          <div class="mt-lg-5 pt-2">
            <b-link class="month mb-0 btn btn-primary w-100 text-primary" disabled>
              <span class="spinner-border text-muted"></span>
            </b-link>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <b-row v-else>
    <b-col xxl="4" lg="6" v-for="(pack, key) in insurancePacks" :key="key">
      <b-card no-body class="pricing-box">
        <b-card-body class="bg-light m-2 p-4">
          <div class="d-flex align-items-center mb-3">
            <div class="flex-grow-1">
              <h5 class="mb-0">{{ pack.name }}</h5>
            </div>
            <div class="ms-auto">
              <h2 class="month mb-0">
                {{ pack.price }}$
              </h2>
            </div>
          </div>

          <h6>
            {{$t('insurance.coverage')}}: {{pack.coverage}}$
          </h6>

          <p class="text-muted">
            {{ pack.description }}
          </p>
          <ul class="list-unstyled vstack gap-3">
            <b-accordion>
              <b-accordion-item v-for="(option, optionKey) in pack.options" :title="option.name"
                                :key="optionKey">
                {{ option.description }}
              </b-accordion-item>
            </b-accordion>
          </ul>
          <div class="mt-3 pt-2">
            <button class="btn btn-primary w-100" @click="buy(pack.id)" :disabled="creatingInvoice">
              <span v-if="creatingInvoice" class="spinner-border spinner-border-sm"></span>
              <span v-else>{{$t('insurance.buy')}}</span>
            </button>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <b-row class="justify-content-center mt-4">
    <b-col lg="5">
      <div class="text-center mb-4">
        <h4 class="fs-22">{{$t('insurance.notSatisfied')}} ?</h4>
        <p class="text-muted mb-4 fs-15">{{$t('insurance.notSatisfiedDescription')}}</p>

        <div class="d-inline-flex">
          <router-link class="btn btn-primary w-100" :to="{name: 'Create own insurance'}">
            {{$t('insurance.createOwn')}}
          </router-link>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<style scoped>
</style>