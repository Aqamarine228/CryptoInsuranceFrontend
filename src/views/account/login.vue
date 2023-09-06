<script>
import appConfig from "../../../app.config";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import store from "@/state/store";
import useVuelidate from "@vuelidate/core";


export default {
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  page: {
    title: "Login",
    meta: [{
      name: "description",
      content: appConfig.description,
    },],
  },
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      processing: false,
    };
  },
  computed: {},
  methods: {
    login() {
      this.processing = true;
      this.submitted = true;

      axiosInstance
          .post(backend.login, {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            store.commit('auth/SET_TOKEN', res)
            this.$router.push('/')
          })
          .catch((err) => {
            this.isAuthError = true;
            this.authError = err.response.data.message;
            this.processing = false;
            this.submitted = false;
          })
    }
  },
}
;
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
                  <b-alert v-model="authError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>

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
                {{$t('login.dontHaveAnAccount')}} ?
                <router-link to="/register" class="fw-semibold text-primary
                  text-decoration-underline">
                  {{$t('login.signUp')}}
                </router-link>
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
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} Velzon. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by Themesbrand
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>