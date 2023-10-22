<script setup>
import {useI18n} from "vue-i18n";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRoute} from "vue-router";

const i18n = useI18n()
const route = useRoute()

const title = i18n.t('menu.insurance')
const items = [
  {
    text: i18n.t('menu.insurance'),
    href: {name: "Insurance"},
  },
  {
    text: i18n.t('insurance.information'),
    active: true
  }
]
const types = {
  wallet: 'wallet',
  exchangeName: 'exchange_name',
  exchangeId: 'exchange_id',
}

const insurance = ref({});
const loading = ref(false)
const exchangeName = ref("")
const exchangeNameDisabled = ref(false)
const exchangeId = ref("")
const exchangeIdDisabled = ref(false)
const wallets = ref({})

onMounted(() => {
  getInsurance()
})

function getInsurance() {
  axiosInstance.get(backend.insuranceInformation(route.params.id)).then((response) => {
    insurance.value = response
    insurance.value.information.forEach((e) => {
      switch (e.type) {
        case types.exchangeName:
          exchangeName.value = e.value
          exchangeNameDisabled.value = true
          break
        case types.exchangeId:
          exchangeId.value = e.value
          exchangeIdDisabled.value = true
          break
        case types.wallet:
          wallets.value[Object.keys(wallets.value).length] = {
            value: e.value,
            disabled: true,
            network: null
          }
          break
      }
    })
    while (Object.keys(wallets.value).length <= insurance.value.max_wallets_count) {
      wallets.value[Object.keys(wallets.value).length + 1] = {
        value: "",
        disabled: false,
        network: null
      }
    }
    loading.value = false
  })
}

// function saveInformation() {
//   axiosInstance.post(backend.insuranceInformation(route.params.id), {}).then(() => {
//     router.go();
//   })
// }
//
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <b-row>
      <b-col md="9">
        <b-card>
          <b-card-body v-if="loading">
            <b-row></b-row>
          </b-card-body>
          <b-card-body v-else>
            <b-row>
              <b-col md="4">
                <label>{{ $t('insurance-information.exchangeName') }}</label>
                <input class="form-control" type="text" v-model="exchangeName" :disabled="exchangeNameDisabled">
              </b-col>
              <b-col md="8">
                <label>{{ $t('insurance-information.exchangeId') }}</label>
                <input class="form-control" type="text" v-model="exchangeId" :disabled="exchangeIdDisabled">
              </b-col>
            </b-row>
            <b-row v-if="!loading">
              <b-col md="12" v-for="id in insurance.max_wallets_count" :key="id" class="mt-3">
                <label>{{ $t('insurance-information.wallet') }} {{ id }}</label>
                <input class="form-control" type="text" v-model="wallets[id].value">
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12 mt-5">
                <button class="btn btn-primary w-100">{{ $t('insurance-information.save') }}</button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="3">
        <div class="card overflow-hidden">
          <div class="card-body bg-marketplace d-flex">
            <div class="flex-grow-1">
              <h4 class="fs-18 lh-base mb-0">Discover, Collect, Sell and Create <br> your own <span
                  class="text-success">NFTs.</span></h4>
              <p class="mb-0 mt-2 pt-1 text-muted">The world's first and largest digital marketplace.</p>
              <div class="d-flex gap-3 mt-4">
                <a href="#!" class="btn btn-secondary">Discover Now </a>
                <a href="#!" class="btn btn-success">Create Your Own</a>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </Layout>
</template>

<style scoped>

</style>