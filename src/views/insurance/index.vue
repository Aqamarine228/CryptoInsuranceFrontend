<script setup>

import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {useI18n} from "vue-i18n";
import NoInsurance from "@/components/insurance/no-insurance.vue";
import {computed} from "vue";
import {useStore} from "vuex";
import Details from "@/components/insurance/details.vue";

const i18n = useI18n()
const store = useStore()

const title = i18n.t('menu.insurance')
const items = [
  {
    text: i18n.t('menu.insurance'),
    active: true,
  },
]

const hasInsurance = computed(() => store.getters['user/hasInsurance'])
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <Details v-if="hasInsurance"/>
    <NoInsurance v-else/>
  </Layout>
</template>
<style scoped>

</style>