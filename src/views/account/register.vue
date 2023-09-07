<script>
import appConfig from "../../../app.config";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";

export default {
  page: {
    title: "Register",
    meta: [{
      name: "description",
      content: appConfig.description,
    },],
  },
  components: {},
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
      processing: false,
      validationErrors: {},
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    hasPasswordErrors() {
      return "password" in this.validationErrors
    },
    hasEmailErrors() {
      return "email" in this.validationErrors
    },
    hasPasswordConfirmationErrors() {
      return this.user.password && this.user.confirmPassword && this.user.password !== this.user.confirmPassword
    },
    signUpDisabled() {
      return !this.user.firstName
          || !this.user.lastName
          || !this.user.email
          || !this.user.password
          || !this.user.confirmPassword
          || this.hasPasswordConfirmationErrors
          || this.processing
    }
  },
  methods: {
    register() {
      this.submitted = true;
      this.processing = true;

      const data = {
        email: this.user.email,
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        password: this.user.password,
        password_confirmation: this.user.confirmPassword
      }

      console.log(this.$route.query);

      if (this.$route.query.inviter_id) {
        console.log(this.$route.query.inviter_id);
        data.inviter_id = this.$route.query.inviter_id
      }

      axiosInstance.post(backend.register, data).then((response) => {
        this.$store.commit('SET_TOKEN', response)
        this.$router.push({
          path: '/'
        });
      }).catch((error) => {
        this.validationErrors = error.response.data.errors
        this.processing = false;
      });

    },
  },
};
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
                <div class="text-center mt-2">
                  <h5 class="text-primary">{{ $t('register.createNewAccount') }}</h5>
                </div>
                <div class="p-2 mt-4">
                  <form class="needs-validation" @submit.prevent="register">

                    <div v-if="notification.message" :class="'alert ' + notification.type">
                      {{ notification.message }}
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">{{ $t('register.email') }} <span
                          class="text-danger">*</span></label>
                      <input type="email" class="form-control" v-model="user.email"
                             :placeholder="$t('register.enterEmail')"
                             required :class="{'is-invalid': hasEmailErrors}">
                      <div v-for="(message, index) in this.validationErrors.email" :key="index"
                           class="invalid-feedback">
                        <span>{{ message }}</span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="first_name" class="form-label">{{ $t('register.firstName') }} <span
                          class="text-danger">*</span></label>
                      <input type="text" class="form-control" v-model="user.firstName"
                             :placeholder="$t('register.enterFirstName')"
                             required>
                    </div>
                    <div class="mb-3">
                      <label for="last_name" class="form-label">{{ $t('register.lastName') }} <span
                          class="text-danger">*</span></label>
                      <input type="text" class="form-control" v-model="user.lastName"
                             :placeholder="$t('register.enterLastName')"
                             required>
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">{{ $t('register.password') }} <span
                          class="text-danger">*</span></label>
                      <input type="password" class="form-control" v-model="user.password"
                             :placeholder="$t('register.enterPassword')"
                             required :class="{'is-invalid': hasPasswordErrors}">
                      <div v-for="(message, index) in this.validationErrors.password" :key="index"
                           class="invalid-feedback">
                        <span>{{ message }}</span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="password_confirmation" class="form-label">{{$t('register.passwordConfirmation')}} <span
                          class="text-danger">*</span></label>
                      <input type="password" class="form-control" v-model="user.confirmPassword"
                             :placeholder="$t('register.enterPasswordConfirmation')"
                             required :class="{'is-invalid': hasPasswordConfirmationErrors}">
                    </div>
                    <div class="mb-4">
                      <p class="mb-0 fs-12 text-muted fst-italic">{{$t('register.byRegistrationYouAgree')}}
                        <b-link
                            href="#" class="text-primary text-decoration-underline fst-normal fw-medium">
                          {{ $t('register.termsOfUse')}}
                        </b-link>
                      </p>
                    </div>

                    <div class="mt-4">
                      <b-button variant="success" class="w-100" type="submit" :disabled="signUpDisabled">
                        {{ processing ? $t('register.pleaseWait') + '...' : $t('register.signIn') }}
                      </b-button>
                    </div>
                  </form>

                </div>
              </b-card-body>
            </b-card>

            <div class="mt-4 text-center">
              <p class="mb-0">{{$t('register.alreadyHaveAnAccount')}} ?
                <router-link to="/login"
                             class="fw-semibold text-primary text-decoration-underline">{{$t('register.signIn')}}
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
              <p class="mb-0 text-muted">&copy; {{ new Date().getFullYear() }} Velzon. Crafted with <i
                  class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>