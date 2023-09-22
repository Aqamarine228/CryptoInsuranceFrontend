<script setup>
import {useI18n} from "vue-i18n";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRoute} from "vue-router";
import {computed, onMounted, onUpdated, ref} from "vue";
import notificationTypes from "@/components/notifications/notificationTypes";

const i18n = useI18n()
const route = useRoute()

const title = i18n.t('menu.notifications')

const notification = ref({})
const loading = ref(true)

onMounted(() => {
  getNotification()
})

onUpdated(() => {
  getNotification()
})

const notificationComponent = computed(() => notificationTypes[notification.value.type].page)

function getNotification() {
  loading.value = true;
  axiosInstance.get(backend.notification(route.params.id)).then((response) => {
    notification.value = response;
    loading.value = false;
  })
}

</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="[]"/>
    <b-card v-if="loading" class="placeholder-glow">
      <b-card-header>
        <span class="placeholder w-50"></span>
      </b-card-header>
      <b-card-body>
        <span v-for="id in 10"  :key="id" class="placeholder placeholder-lg w-100"></span>
      </b-card-body>
    </b-card>
    <component :is="notificationComponent" :notification="notification" v-else></component>
  </Layout>
</template>

<style scoped>

</style>