<script setup>
import Layout from "@/layouts/unauthorized.vue"
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

const email = ref("")
const password = ref("")
const authError = ref(null)
const isAuthError = ref(false)
const processing = ref(false)
const submitted = ref(false)

function login() {
  processing.value = true;
  submitted.value = true;

  axiosInstance
      .post(backend.login, {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        store.commit('auth/SET_TOKEN', res)
        router.push('/')
      })
      .catch((err) => {
        isAuthError.value = true;
        authError.value = err.response.data.message;
        processing.value = false;
        submitted.value = false;
      })
}
</script>

<template>
  <Layout>
    <b-row>
      <b-col lg="12">
        <div class="text-center mt-sm-5 mb-4 text-white-50">
          <div>
            <router-link to="/" class="d-inline-block auth-logo">
              <img src="@/assets/images/logo-light.png" alt="" height="20"/>
            </router-link>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col md="8" lg="6" xl="5">
        <b-card no-body class="mt-4">
          <b-card-body class="p-4">
            <div class="text-center mt-2">
              <h5 class="text-primary">{{ $t('login.welcomeBack') }} !</h5>
              <p class="text-muted">{{ $t('login.signInToContinue') }}.</p>
            </div>
            <div class="p-2 mt-4">
              <b-alert v-model="isAuthError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>

              <div>

              </div>

              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">{{ $t('login.email') }}</label>
                  <input type="email" class="form-control" id="email" :placeholder="$t('login.enterEmail')"
                         v-model="email"/>
                  <div class="invalid-feedback">
                    <span></span>
                  </div>
                </div>

                <div class="mb-3">
                  <!--                      Maybe will be added later-->
                  <!--                      <div class="float-end">-->
                  <!--                        <router-link to="/forgot-password" class="text-muted">Forgot-->
                  <!--                          password?-->
                  <!--                        </router-link>-->
                  <!--                      </div>-->
                  <label class="form-label" for="password-input">{{ $t('login.password') }}</label>
                  <div class="position-relative auth-pass-inputgroup mb-3">
                    <input type="password" v-model="password" class="form-control pe-5"
                           :placeholder="$t('login.enterPassword')"
                           id="password-input" required/>
                    <b-button variant="link" class="position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button" id="password-addon">
                    </b-button>
                    <div class="invalid-feedback">
                      <span></span>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <b-button variant="success" class="w-100" type="submit" :disabled="processing">
                    {{ processing ? $t('login.pleaseWait') + '...' : $t('login.signIn') }}
                  </b-button>
                </div>
              </form>
            </div>
          </b-card-body>
        </b-card>

        <div class="mt-4 text-center">
          <p class="mb-0">
            {{ $t('login.dontHaveAnAccount') }} ?
            <router-link to="/register" class="fw-semibold text-primary
                  text-decoration-underline">
              {{ $t('login.signUp') }}
            </router-link>
          </p>
        </div>
      </b-col>
    </b-row>
  </Layout>
</template>