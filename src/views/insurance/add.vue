<script setup>
import {useI18n} from "vue-i18n";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import BuyOptions from "@/components/insurance/buy-options.vue";

const i18n = useI18n()

const title = i18n.t('menu.insurance')
const items = [
  {
    text: i18n.t('menu.insurance'),
    href: {name: "Insurances"},
  },
  {
    text: i18n.t('menu.createOwnInsurance'),
    active: true,
  }
]
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <buy-options/>
  </Layout>
</template>

<style scoped>

</style>