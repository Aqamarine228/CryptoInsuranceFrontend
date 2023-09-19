<script setup>

import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRoute} from "vue-router";
import laravelDateToHumanReadable from "../../common/laravelDateToHumanReadable";
import Unpaid from "@/components/insurance-invoice/unpaid.vue";
import Paid from "@/components/insurance-invoice/paid.vue";

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
const loading = ref(true)

onMounted(() => {
  getInvoice()
})

function getInvoice() {
  axiosInstance.get(backend.insuranceInvoice(route.params.id)).then((response) => {
    invoice.value = response
    loading.value = false
  })
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
              <b-col lg="3" cols="6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">{{ $t('insurance-invoice.invoiceNumber') }}</p>
                <h5 class="fs-14 mb-0 class-name placeholder-glow">
                  <span class="placeholder w-25" v-if="loading"></span>
                  <span id="invoice-no" v-else>{{ invoice.id }}</span>
                </h5>
              </b-col>
              <b-col lg="3" cols="6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">{{ $t('insurance-invoice.dateCreated') }}</p>
                <h5 class="fs-14 mb-0 placeholder-glow">
                  <span class="placeholder w-25" v-if="loading"></span>
                  <span id="invoice-date" v-else>{{ laravelDateToHumanReadable(invoice.created_at) }}</span>
                </h5>
              </b-col>
              <b-col lg="3" cols="6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">{{ $t('insurance-invoice.totalAmount') }}</p>
                <h5 class="fs-14 mb-0 placeholder-glow">
                  <span class="placeholder w-25" v-if="loading"></span>
                  <span id="total-amount" v-else>${{ invoice.amount }}</span>
                </h5>
              </b-col>
              <b-col lg="3" cols="6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">{{ $t('insurance-invoice.status') }}</p>
                <h5 class="fs-14 mb-0 placeholder-glow">
                  <span class="placeholder w-25" v-if="loading"></span>
                  <span id="total-amount" v-else>
                    {{$t(`insurance-invoice.status.${invoice.status}`) }}
                  </span>
                </h5>
              </b-col>
            </b-row>
          </b-card-body>
          <b-card-body class="p-4 d-flex align-items-center justify-content-center" v-if="loading">
            <span class="spinner-border"></span>
          </b-card-body>
          <unpaid :invoice-id="route.params.id" v-else-if="invoice.status !== 'paid'"/>
          <paid v-else/>
        </b-card>
      </b-col>
    </b-row>
  </Layout>
</template>

<style scoped>

</style>