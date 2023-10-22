<script setup>
import {useI18n} from "vue-i18n";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import Details from "@/components/insurance/details.vue";

const i18n = useI18n()

const title = i18n.t('menu.insurance')
const items = [
  {
    text: i18n.t('menu.insurance'),
    href: {name: "Insurance"},
  },
  {
    text: i18n.t('insurance.details'),
    active: true
  }
]
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <Details/>
  </Layout>
</template>

<style scoped>

</style>