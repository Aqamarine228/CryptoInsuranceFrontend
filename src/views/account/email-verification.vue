<script setup>

import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Swal from "sweetalert2";
import {useI18n} from "vue-i18n";
import Layout from "@/layouts/unauthorized.vue"

const router = useRouter();
const store = useStore();
const {t} = useI18n();

const loading = ref(false);
let loaded = false;

onMounted(async () => {
  await getUser();
  loaded = true;
})

const getUser = async () => {
  loading.value = true;
  const user = await axiosInstance.get(backend.user);
  store.commit('user/SET_CURRENT_USER', user);

  if (user.email_verified) {
    await router.push({
      name: "default"
    });
    return
  }
  loading.value = false;
  if (loaded) {
    await Swal.fire({
      title: t('verify-email.notVerified'),
      icon: "error",
      position: "top-end",
      showConfirmButton: false,
      width: '300px',
      timer: 1500,
    })
  }
}

const resendEmail = async () => {
  await axiosInstance.post(backend.resendVerificationEmail);
  await Swal.fire({
    title: t('verify-email.resentedSuccessfully'),
    icon: "success",
    position: "top-end",
    showConfirmButton: false,
    width: '300px',
    timer: 1500,
  })
}

const userEmail = computed(() => store.getters['user/user'].email)

function logout() {
  store.commit('auth/LOGOUT');
  localStorage.clear();
  sessionStorage.clear();
  router.go();

}

</script>

<template>
  <Layout>
    <b-row>
      <b-col lg="12">
        <div class="text-center mt-sm-5 mb-4 text-white-50">
          <div>
            <router-link to="/" class="d-inline-block auth-logo">
              <img src="@/assets/images/logo-light.png" alt="" height="20">
            </router-link>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col md="8" lg="6" xl="5">
        <b-card no-body class="mt-4">

          <b-card-body class="p-4">
            <div class="mb-4">
              <div class="avatar-lg mx-auto">
                <div class="avatar-title bg-light text-primary display-5 rounded-circle">
                  <i class="ri-mail-line"></i>
                </div>
              </div>
            </div>

            <div class="p-2 mt-4">
              <div class="text-muted text-center mb-4 mx-lg-3">
                <h4 class="">{{ $t('verify-email.verifyYourEmail') }}</h4>
                <p>{{ $t('verify-email.weHaveSentYouTheLinkTo') }} <span
                    class="fw-semibold">{{ userEmail }}</span></p>
              </div>

              <div class="mt-3">
                <b-button type="button" variant="success" class="w-100" :disabled="loading" @click="getUser">
                  {{ $t('verify-email.confirm') }}
                </b-button>
              </div>
              <div class="text-center mt-1">
                <a @click.prevent="logout" href="#" class="text-decoration-underline">
                  {{$t('login.logout')}}
                </a>
              </div>
            </div>
          </b-card-body>
        </b-card>

        <div class="mt-4 text-center">
          <p class="mb-0">{{ $t('verify-email.haventRecivedEmail') }} ?
            <button @click="resendEmail"
                    class="fw-semibold text-primary text-decoration-underline">{{ $t('verify-email.resend') }}
            </button>
          </p>
        </div>

      </b-col>
    </b-row>
  </Layout>
</template>