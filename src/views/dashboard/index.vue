<script setup>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {useI18n} from "vue-i18n";
import RecentActivity from "@/components/dashboard/recent-activity.vue";
import News from "@/components/dashboard/news.vue";
import Widgets from "@/components/dashboard/widgets.vue";
import BuyOptions from "@/components/insurance/buy-options.vue";

const i18n = useI18n()

const title = i18n.t('menu.dashboard')
const items = [
  {
    text: title,
    active: true,
  },
]
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <b-row>
      <b-card class="card-height-100 bg-transparent shadow-none" no-body>
        <b-card-body>
          <div class="mb-4">
            <div class="avatar-lg mx-auto">
              <div class="avatar-title bg-light text-primary display-5 rounded-circle">
                <i class="ri-shield-line"></i>
              </div>
            </div>
          </div>

          <div class="p-2 mt-4">
            <div class="text-muted text-center mb-4 mx-lg-3">
              <h4 class="">{{ $t('dashboard.getInsuranceToday') }}</h4>
            </div>

            <div class="text-muted mb-4 text-center">
              <p v-for="index in 4" :key="index" class="mb-0">{{ $t(`dashboard.getInsuranceText${index}`) }}</p>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-row>
    <buy-options/>
    <b-row>
      <Widgets/>
      <b-col md="12">
        <News/>
      </b-col>
      <b-col md="12">
        <RecentActivity/>
      </b-col>
    </b-row>
  </Layout>
</template>