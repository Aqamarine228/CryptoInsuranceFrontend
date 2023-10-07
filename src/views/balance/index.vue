<script setup>
import {useI18n} from "vue-i18n";
import PageHeader from "@/components/page-header.vue";
import Layout from "@/layouts/main.vue";
import Withdraw from "@/components/balance/withdraw.vue";
import Requests from "@/components/balance/requests.vue";
import {ref} from "vue";

const i18n = useI18n()

const title = i18n.t('menu.balance')
const items = [
  {
    text: title,
    active: true,
  },
]

const refreshRequestsKey = ref(0)
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <b-row class="d-flex justify-content-center">
      <b-col lg="12">
        <withdraw @withdrawal-request-created="refreshRequestsKey+=1"/>
        <requests :key="refreshRequestsKey"/>
      </b-col>
    </b-row>
  </Layout>
</template>

<style scoped>

</style>