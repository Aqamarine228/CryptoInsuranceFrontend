<script setup>
import {ref, defineProps, computed} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useI18n} from "vue-i18n";

const i18n = useI18n()

const props = defineProps({
  invoiceId: String,
  invoiceMaxWalletsCount: Number,
})

const loading = ref(false)
const invoiceHref = ref("")
const exchangeName = ref("")
const exchangeId = ref("")
const walletCurrencies = ref({})
const walletValues = ref({})

const payButtonDisabled = computed(() => loading.value
    || !exchangeName.value
    || !exchangeId.value
    || (Object.keys(walletCurrencies.value).length === 0 || !walletCurrencies.value[Object.keys(walletCurrencies.value)[0]])
    || (Object.keys(walletValues.value).length === 0 || !walletValues.value[Object.keys(walletValues.value)[0]])
)

function createCoinbaseInvoice() {
  const win = window.open('', '_blank')
  win.document.write('Loading invoice...');

  if (invoiceHref.value) {
    win.location.href = invoiceHref.value
    return
  }

  const wallets = []
  Object.keys(walletCurrencies.value).forEach((e) => {
    wallets.push({cryptocurrency: walletCurrencies.value[e], value: walletValues.value[e]})
  })

  console.log(wallets);

  loading.value = true;
  axiosInstance.post(backend.createInsuranceCoinbaseInvoice(props.invoiceId), {
    wallets: wallets,
    exchange_name: exchangeName.value,
    exchange_id: exchangeId.value,
  }).then((response) => {
    invoiceHref.value = response
    win.location.href = invoiceHref.value
  }).finally(() => {
    loading.value = false;
  })
}
</script>

<template>
  <b-card-body class="p-4 border-top border-top-dashed">
    <b-row>
      <b-col md="4">
        <label>{{ $t('insurance.exchangeName') }} <span
            class="text-danger">*</span></label>
        <input class="form-control" type="text" v-model="exchangeName">
      </b-col>
      <b-col md="8">
        <label>{{ $t('insurance.exchangeId') }} <span
            class="text-danger">*</span></label>
        <input class="form-control" type="text" v-model="exchangeId">
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" v-for="id in props.invoiceMaxWalletsCount" :key="id" class="mt-3">
        <label>{{ $t('insurance.wallet') }} {{ id }} <span
            class="text-danger" v-if="id === 1">*</span></label>
        <b-row>
          <b-col md="2" style="max-width: 130px">
            <input
                class="form-control"
                type="text" v-model="walletCurrencies[id]"
                :placeholder="i18n.t('insurance.network')"
            >
          </b-col>
          <b-col>
            <input
                class="form-control"
                type="text"
                v-model="walletValues[id]" :disabled="!walletCurrencies[id]"
                :placeholder="i18n.t('insurance.value')"
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="g-3 mt-3">
      <b-col sm="12">
        <button class="btn btn-primary w-100" @click="createCoinbaseInvoice" :disabled="payButtonDisabled">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          <span v-else>{{ $t("insurance-invoice.pay") }}</span>
        </button>
      </b-col>
    </b-row>
  </b-card-body>
</template>

<style scoped>

</style>