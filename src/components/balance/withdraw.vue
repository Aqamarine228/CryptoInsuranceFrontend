<script setup>
import {computed, ref, defineEmits} from "vue";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import axios from "axios";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import Swal from "sweetalert2";

const i18n = useI18n()
const store = useStore()
const emit = defineEmits(['withdrawalRequestCreated'])

const currencies = ['USDT', 'BTC', 'USDC', 'LTC', 'TRX'];

const currency = ref(currencies[0])
const amount = ref(0)
const address = ref("")
const currencyAmountLoading = ref(false)
const currencyPrice = ref(1)

const balance = computed(() => store.getters['user/user'].balance)
const amountError = computed(() => amount.value > balance.value)
const withdrawalDisabled = computed(() => amountError.value || amount.value <= 0 || !address.value)
const currencyAmount = computed(() => amount.value / currencyPrice.value)

async function changeCurrency() {
  currencyAmountLoading.value = true;
  if (currency.value === 'USDT' || currency.value === 'USDC') {
    currencyPrice.value = 1
    currencyAmountLoading.value = false;
    return
  }

  const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${currency.value}USDT`)
  currencyPrice.value = response.data.price
  currencyAmountLoading.value = false;
}

function createWithdrawalRequest() {
  axiosInstance.post(backend.withdrawalRequest, {
    amount: amount.value,
    address: address.value,
    cryptocurrency: currency.value,
  }).then(() => {
    store.commit('user/WITHDRAWAL_REQUEST_CREATED', amount.value)
    emit('withdrawalRequestCreated')
    Swal.fire({
      title: i18n.t('balance.withdrawalRequestCreatedSuccessfully'),
      icon: "success",
      position: "top-end",
      showConfirmButton: false,
      width: '300px',
      timer: 1500,
    })
  })
}
</script>

<template>
  <b-card class="w-100">
    <b-card-header>
      <b-card-title>
        {{$t('balance.balance')}}: {{balance}}$
      </b-card-title>
    </b-card-header>
    <form @submit.prevent="createWithdrawalRequest">
      <b-card-body class="w-100">
        <div class="mb-3">
          <label  class="form-label">{{$t('balance.cryptocurrency')}}</label>
          <select class="form-select" v-model="currency" @change="changeCurrency">
            <option v-for="(currency, key) in currencies" :key="key">{{ currency }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label  class="form-label">{{$t('balance.amountInUsd')}} <span class="text-danger">*</span> </label>
          <input
              class="form-control"
              :placeholder="$t('balance.amountInUsd')"
              required
              type="number"
              min="10"
              :max="balance"
              v-model="amount"
              :class="{'is-invalid': amountError}"
          >
          <div v-if="amountError" class="invalid-feedback">
            <span>{{ $t('balance.insufficientBalance') }}</span>
          </div>
        </div>
        <div>
          <label  class="form-label">{{$t('balance.addressOfWallet')}} <span class="text-danger">*</span> </label>
          <input class="form-control" :placeholder="$t('balance.addressOfWallet')" required v-model="address">
        </div>
      </b-card-body>
      <b-card-footer>
        <b-card-subtitle class="mb-1 d-flex align-items-center">
          {{$t('balance.amount')}}:
          <span v-if="currencyAmountLoading" class="spinner-border spinner-border-sm mx-1"></span>
          <span v-else class="mx-1">{{currencyAmount}} {{currency}}</span>
        </b-card-subtitle>
        <button class="btn-primary btn w-100" type="submit" :disabled="withdrawalDisabled">
          {{$t("balance.withdraw")}}
        </button>
      </b-card-footer>
    </form>
  </b-card>
</template>

<style scoped>

</style>