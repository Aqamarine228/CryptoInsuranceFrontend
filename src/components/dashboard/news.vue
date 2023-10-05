<script setup>

import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import backend from "@/config/backend";
import axiosInstance from "@/plugins/axios";
import laravelDateToHumanReadable from "../../common/laravelDateToHumanReadable";

const store = useStore()

const newsFeed = ref([]);
const locale = computed(() => store.getters['locale/currentLocale']);
const loading = ref(true);

onMounted(() => {
  getNews();
})

function getNews() {
  loading.value = true;
  axiosInstance.get(backend.news).then((response) => {
    newsFeed.value = response;
    loading.value = false;
  })
}
</script>

<template>
  <b-card no-body>
    <b-card-header class="align-items-center d-flex">
      <b-card-title class="mb-0 flex-grow-1">{{ $t('dashboard.newsTitle') }}</b-card-title>
      <div>
        <a class="btn btn-soft-primary btn-sm" :href="`${backend.url}${backend.newsClient(locale)}`">
          {{ $t('dashboard.viewAll') }}
        </a>
      </div>
    </b-card-header>

    <b-card-body v-if="loading">
      <div class="d-flex align-middle mb-4 placeholder-glow" v-for="item in 5" :key="item">
        <div class="flex-shrink-0">
          <div class="placeholder" style="height: 60px; width: 60px"></div>
        </div>
        <div class="flex-grow-1 ms-3">
          <div class="placeholder w-100"></div>
          <p class="text-muted fs-12 mb-0">
            <span class="placeholder w-25"></span>
          </p>
        </div>
      </div>
    </b-card-body>

    <b-card-body v-else>
     <b-row>
       <b-col lg="4" xl="4" v-for="(item, index) of newsFeed" :key="index">
         <div class="d-flex align-middle mb-4">
           <div class="flex-shrink-0">
             <img :src="`${item.picture}`" class="rounded img-fluid" style="height: 60px" alt=""/>
           </div>
           <div class="flex-grow-1 ms-3">
             <h6 class="mb-1 lh-base">
               <b-link :href="`${backend.url}${backend.newsClientShow(locale, item.slug)}`" class="text-reset">
                 {{ item.title }}
               </b-link>
             </h6>
             <p class="text-muted fs-12 mb-0">
               {{ laravelDateToHumanReadable(item.created_at) }}
             </p>
           </div>
         </div>
       </b-col>
     </b-row>

      <div class="mt-3 text-center">
        <a :href="`${backend.url}${backend.newsClient(locale)}`" class="text-muted text-decoration-underline">
          {{ $t('dashboard.viewAll') }}
        </a>
      </div>
    </b-card-body>
  </b-card>
</template>
