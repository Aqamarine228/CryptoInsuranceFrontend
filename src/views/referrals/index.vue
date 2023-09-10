<script setup>

import PageHeader from "@/components/page-header.vue";
import Layout from "@/layouts/main.vue";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useStore} from "vuex";
import NoRequests from "@/components/referrals/no-requests.vue";
import RequestSubmited from "@/components/referrals/request-submited.vue";
import Analytics from "@/components/referrals/analytics.vue";

const i18n = useI18n()
const store = useStore()

const title = i18n.t('menu.referrals')
const items = [
  {
    text: i18n.t('menu.referrals'),
    active: true,
  },
]

const isReferral = computed(() => store.getters['user/isReferral'])
const hasReferralRequest = computed(() => store.getters['user/hasReferralRequest'])
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <no-requests v-if="!isReferral && !hasReferralRequest"/>
    <request-submited v-else-if="!isReferral && hasReferralRequest"/>
    <analytics v-else-if="isReferral"/>
  </Layout>
</template>

<style scoped>

</style>