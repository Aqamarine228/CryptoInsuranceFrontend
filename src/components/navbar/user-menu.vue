<script setup>

import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

const user = computed(() => store.getters['user/user'])

async function logOut() {
  store.commit('auth/LOGOUT');
  localStorage.clear();
  sessionStorage.clear();
  router.go();
  router.push({name: 'login'});
}
</script>

<template>
  <div class="dropdown ms-sm-3 header-item topbar-user">
    <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
              <span class="d-flex align-items-center">
                <span class="text-start ms-xl-2">
                  <span class=" d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{user.first_name}} {{user.last_name}}</span>
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{{$t('user-menu.title')}}</span>
                </span>
              </span>
    </button>
    <div class="dropdown-menu dropdown-menu-end">
      <h6 class="dropdown-header">{{$t('user-menu.welcome')}} {{user.first_name}}!</h6>
      <router-link class="dropdown-item" to="#"><i
          class="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>
        <span class="align-middle">{{$t('user-menu.balance')}} : <b>${{user.balance}}</b></span>
      </router-link>
<!--      <router-link class="dropdown-item" to="#">-->
<!--        <b-badge variant="success-subtle"-->
<!--                 class="bg-success-subtle text-success mt-1 float-end">New-->
<!--        </b-badge>-->
<!--        <i-->
<!--            class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>-->
<!--        <span class="align-middle">Settings</span>-->
<!--      </router-link>-->
      <button class="dropdown-item" @click="logOut">
        <i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
        <span class="align-middle" data-key="t-logout">{{$t('user-menu.logout')}}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>