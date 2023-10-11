<script setup>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {useI18n} from "vue-i18n";
import RecentActivity from "@/components/dashboard/recent-activity.vue";
import News from "@/components/dashboard/news.vue";
import Widgets from "@/components/dashboard/widgets.vue";
import Insurance from "@/components/dashboard/insurance.vue";

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
      <b-col xxl="9" class="order-xxl-0 order-first">
        <b-row>
          <widgets/>
          <b-col xl="12">
            <insurance/>
          </b-col>
          <b-col xl="12">
            <News />
          </b-col>
        </b-row>
      </b-col>
      <b-col xxl="3">
        <RecentActivity />
      </b-col>
    </b-row>
<!--    <b-row>-->
<!--      <b-col xxl="12">-->
<!--      </b-col>-->
<!--    </b-row>-->
  </Layout>
</template>