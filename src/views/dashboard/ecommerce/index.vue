<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";

export default {
  page: {
    title: "Ecommerce",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader
  },
  data() {
    return {
      title: "Dashboard",
      items: [{
        text: "Dashboards",
        href: "/",
      },
      {
        text: "Dashboard",
        active: true,
      },
      ],
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
  </Layout>
</template>