<script setup>
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const i18n = useI18n()
const store = useStore()
const router = useRouter()

const text = ref(null)

const languages = ref([
  {
    flag: require("@/assets/images/flags/us.svg"),
    language: "en",
    title: "English",
  },
  {
    flag: require("@/assets/images/flags/russia.svg"),
    language: "ru",
    title: "Русский",
  },
])

const currentLocale = computed(() => store.getters['locale/currentLocale'])
const currentFlag = computed(() => languages.value.filter(value => value.language === currentLocale.value)[0].flag)

function setLanguage(locale, country, flag) {
  // lan.value = locale;
  text.value = country;
  document.getElementById("header-lang-img").setAttribute("src", flag);
  i18n.locale.value = locale;
  store.commit('locale/SET_LOCALE', locale)
  router.go()
}
</script>

<template>
  <div class="dropdown ms-1 topbar-head-dropdown header-item">
    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img id="header-lang-img" :src="currentFlag" alt="Header Language" height="20"
           class="rounded"/>
    </button>
    <div class="dropdown-menu dropdown-menu-end">
      <b-link href="javascript:void(0);" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
              @click="setLanguage(entry.language, entry.title, entry.flag)"
              :class="{ active: i18n === entry.language }" class="dropdown-item notify-item language py-2"
              data-lang="en" title="English">
        <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18"/>
        <span class="align-middle">{{ entry.title }}</span>
      </b-link>
    </div>
  </div>
</template>

<style scoped>

</style>