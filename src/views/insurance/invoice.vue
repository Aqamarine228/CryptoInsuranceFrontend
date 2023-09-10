<script setup>

import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRoute} from "vue-router";
import moment from "moment";

const i18n = useI18n()
const route = useRoute()

const title = i18n.t('menu.insuranceInvoice')
const items = [
  {
    text: i18n.t('menu.insurance'),
    href: {name: "Insurance"},
  },
  {
    text: i18n.t('menu.insuranceInvoice'),
    active: true,
  }
]

const invoice = ref({})
const paymentMethod = ref("")

onMounted(() => {
  getInvoice()
})

const paymentButtonDisabled = computed(() => !paymentMethod.value)

function getInvoice() {
  axiosInstance.get(backend.insuranceInvoice(route.params.id)).then((response) => {
    invoice.value = response
  })
}

function humanReadableDate(date) {
  return moment(date).format("yyyy-MM-dd HH:mm")
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <b-row class="justify-content-center">
      <b-col xxl="9">
        <b-card no-body id="demo">
          <b-card-header class="border-bottom-dashed p-4">
            <div class="d-sm-flex">
              <div class="flex-grow-1">
                <img src="@/assets/images/logo-dark.png" class="card-logo card-logo-dark"
                     alt="logo dark" height="17">
                <img src="@/assets/images/logo-light.png" class="card-logo card-logo-light"
                     alt="logo light" height="17">
              </div>
            </div>
          </b-card-header>
          <b-card-body class="p-4">
            <b-row class="g-3">
              <b-col lg="4" cols="6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Invoice No</p>
                <h5 class="fs-14 mb-0"><span id="invoice-no">{{ invoice.id }}</span></h5>
              </b-col>
              <b-col lg="4" cols="6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                <h5 class="fs-14 mb-0">
                  <span id="invoice-date">{{ humanReadableDate(invoice.created_at) }}</span>
                </h5>
              </b-col>
              <b-col lg="4" cols="6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Total Amount</p>
                <h5 class="fs-14 mb-0">$<span id="total-amount">{{ invoice.amount }}</span></h5>
              </b-col>
            </b-row>
          </b-card-body>
          <b-card-body class="p-4 border-top border-top-dashed">
            <b-row class="g-3">
              <b-col sm="12">
                <h6 class="text-muted text-uppercase fw-semibold mb-3">Payment Method</h6>
                <select class="form-control mb-3" v-model="paymentMethod">
                  <option value="ltc">LTC</option>
                  <option value="btc">BTC</option>
                  <option value="xmr">XMR</option>
                  <option value="usdt">USDT</option>
                </select>

                <button class="btn btn-primary w-100" :disabled="paymentButtonDisabled">
                  Pay
                </button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </Layout>
</template>

<style scoped>

</style>