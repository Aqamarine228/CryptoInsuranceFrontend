<script setup>

import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {useI18n} from "vue-i18n";
import Options from "@/components/insurance/create-own/options.vue";

const i18n = useI18n()

const title = i18n.t('menu.createOwnInsurance')
const items = [
  {
    text: i18n.t('menu.insurance'),
    href: {name: "Insurance"},
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
    <options />
  </Layout>
</template>
<style scoped>

</style>