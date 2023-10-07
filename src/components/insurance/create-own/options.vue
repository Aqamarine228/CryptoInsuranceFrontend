<script setup>

import {computed, onMounted, ref} from "vue";
import backend from "@/config/backend";
import axiosInstance from "@/plugins/axios";
import {useRouter} from "vue-router";
import durationToReadable from "../../../common/durationToReadable";


const router = useRouter()

const colors = ['primary', 'secondary', 'success', 'danger'];

const options = ref([]);
const selectedOptions = ref({});
const subscriptionOptions = ref([]);
const coverageOptions = ref([]);
const selectedSubscriptionOption = ref({});
const loadingSubscriptionOptions = ref(true)
const loadingCoverageOptions = ref(true)
const loadingOptions = ref(true);
const overallPrice = ref(0)
const creatingInvoice = ref(false)

onMounted(() => {
  loadCoverageOptions()
  loadSubscriptionOptions().then(() => {
    loadOptions(selectedSubscriptionOption.value.id);
  })
})

const buyButtonDisabled = computed(() => selectedOptions.value.length === 0 || overallPrice.value <= 0)

function loadSubscriptionOptions() {
  loadingSubscriptionOptions.value = true;
  return axiosInstance.get(backend.insuranceSubscriptionOptions).then((response) => {
    subscriptionOptions.value = response
    selectedSubscriptionOption.value = subscriptionOptions.value[0];
    loadingSubscriptionOptions.value = false
  })
}

function loadCoverageOptions() {
  loadingCoverageOptions.value = true;
  return axiosInstance.get(backend.insuranceCoverageOptions).then((response) => {
    coverageOptions.value = response
    loadingCoverageOptions.value = false;
  })
}

function loadOptions(subscriptionOptionId) {
  loadingOptions.value = true;
  selectedOptions.value = []
  overallPrice.value = 0
  axiosInstance.get(backend.insuranceOptions, {
    params: {
      insurance_subscription_option_id: subscriptionOptionId,
    }
  }).then((response) => {
    options.value = response
    loadingOptions.value = false;
  })
}

function changeSubscriptionOption(optionId) {
  selectedSubscriptionOption.value = subscriptionOptions.value.filter((e) => e.id === optionId)[0]
  loadOptions(optionId)
}

function selectOption(optionId, price) {
  selectedOptions.value[optionId] = !selectedOptions.value[optionId]
  if (selectedOptions.value[optionId]) {
    overallPrice.value += price
  } else {
    overallPrice.value -= price
  }

  overallPrice.value = parseFloat(overallPrice.value.toFixed(2))
}

function buy(selectedCoverageOptionId) {
  const options = [];
  creatingInvoice.value = true
  Object.keys(selectedOptions.value).forEach((optionId) => selectedOptions.value[optionId] && options.push(optionId))
  axiosInstance.post(backend.createInsuranceInvoiceFromOptions, {
    insurance_options: options,
    insurance_subscription_option_id: selectedSubscriptionOption.value.id,
    insurance_coverage_option_id: selectedCoverageOptionId,
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

function getPrice(price, percent) {
  return (price + (price * (percent / 100))).toFixed(2);
}

</script>

<template>
  <b-row class="justify-content-center mt-4">
    <b-col lg="5">
      <div class="text-center mb-4">
        <h4 class="fs-22">{{ $t('insurance.selectNeededOptions') }}</h4>

        <div class="d-inline-flex">
          <ul class="nav nav-pills arrow-navtabs plan-nav rounded mb-3 p-1" id="pills-tab" role="tablist"
              v-if="loadingSubscriptionOptions">
            <li class="nav-item" role="presentation" v-for="(_, key) in [[], [], []]" :key="key">
              <div class="spinner-border text-primary" style="margin-right: 10px" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </li>
          </ul>
          <ul class="nav nav-pills arrow-navtabs plan-nav rounded mb-3 p-1" id="pills-tab" role="tablist" v-else>
            <li class="nav-item" role="presentation" v-for="(item, key) in subscriptionOptions" :key="key">
              <b-button variant="link" class="nav-link fw-semibold text-capitalize"
                        :class="selectedSubscriptionOption.id === item.id ? 'active' : ''"
                        type="button" role="tab" aria-selected="true" @click="changeSubscriptionOption(item.id)">
                {{ durationToReadable(item.duration) }}
                <span class="badge bg-success" v-if="item.sale_percentage !== 0">{{
                    item.sale_percentage
                  }}% {{ $t('insurance.off') }}</span>
              </b-button>
            </li>
          </ul>
        </div>
      </div>
    </b-col>
  </b-row>
  <b-row class="justify-content-center">
    <b-col xl="12">
      <b-row v-if="loadingOptions">
        <b-col lg="4" v-for="(option, key) in [[],[],[],[],[],[],[],[],[]]" :key="key">
          <b-card no-body class="pricing-box">
            <b-card-body class="p-4 m-2">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="mb-1 spinner-border text-primary"></h6>
                </div>
                <h2>
                  <sup><small>$</small></sup>
                </h2>
              </div>
              <div class="text-center">
                <div class="placeholder-glow">
                  <span class="placeholder placeholder-lg w-100"></span>
                </div>
                <button class="mt-4 w-100 btn btn-soft-success">
                  <span class="spinner-border spinner-grow-sm"></span>
                </button>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col lg="4" v-for="(option, key) in options" :key="key">
          <b-card no-body class="pricing-box">
            <b-card-body class="p-4 m-2">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="mb-1">{{ option.name }}</h6>
                </div>
                <h2>
                  <sup><small>$</small></sup>{{ option.price }}
                </h2>
              </div>
              <div>
                <b-accordion>
                  <b-accordion-item title="More...">
                    {{ option.description }}
                  </b-accordion-item>
                </b-accordion>
                <div class="mt-4">
                  <b-button
                      class="btn w-100 waves-effect"
                      :class="selectedOptions[option.id] ? 'btn-success' : 'btn-soft-success waves-light'"
                      @click="selectOption(option.id, option.price)"
                  >
                    {{ selectedOptions[option.id] ? $t('insurance.selected') : $t('insurance.select') }}
                  </b-button>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  <b-row>
    <b-col xxl="3" v-for="(option, key) in coverageOptions" :key="option.id">
      <div class="card" :class="`card-${colors[key]}`">
<!--        <div class="card-body">-->
<!--          <div class="d-flex align-items-center">-->
<!--            <div class="flex-grow-1 text-center">-->
<!--              <p class="card-text fs-5">Coverage: {{option.coverage}}$</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="card-footer">
          <button class="btn w-100 btn" :class="`btn-${colors[key]}`" v-if="creatingInvoice">
            <span class="spinner-border spinner-grow-sm text-white"></span>
          </button>
          <button class="w-100 btn" :class="`btn-${colors[key]}`" v-else :disabled="buyButtonDisabled" @click="buy(option.id)">
            {{buyButtonDisabled
              ? $t('insurance.pleaseSelectOptionsFirst')
              : $t('insurance.buyWithPrice', {price: getPrice(overallPrice, option.price_percentage), coverage: option.coverage}) }}
          </button>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<style scoped>

</style>