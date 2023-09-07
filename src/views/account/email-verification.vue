<script setup>

import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Swal from "sweetalert2";
import {useI18n} from "vue-i18n";

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
  store.commit('auth/SET_CURRENT_USER', user);

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

const userEmail = computed(() => store.getters['auth/user'].email)

</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 1440 120">
          <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
        </svg>
      </div>
    </div>

    <div class="auth-page-content">
      <b-container>
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
      </b-container>
    </div>

    <footer class="footer">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="text-center">
              <p class="mb-0 text-muted">&copy; {{ new Date().getFullYear() }} Velzon. Crafted with <i
                  class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>