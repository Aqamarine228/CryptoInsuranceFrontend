<script setup>
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import Layout from "@/layouts/unauthorized.vue"

const route = useRoute()
const router = useRoute()
const store = useStore()

const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
})

const submitted = ref(false)
const processing = ref(false)
const validationErrors = ref({})

const hasPasswordErrors = computed(() => "password" in validationErrors.value)
const hasEmailErrors = computed(() => "email" in validationErrors.value)
const hasPasswordConfirmationErrors = computed(() => user.value.password && user.value.confirmPassword && user.value.password !== user.value.confirmPassword)
const signUpDisabled = computed(() => !user.value.firstName
    || !user.value.lastName
    || !user.value.email
    || !user.value.password
    || !user.value.confirmPassword
    || hasPasswordConfirmationErrors.value
    || processing.value)

function register() {
  submitted.value = true;
  processing.value = true;

  const data = {
    email: user.value.email,
    first_name: user.value.firstName,
    last_name: user.value.lastName,
    password: user.value.password,
    password_confirmation: user.value.confirmPassword
  }

  if (route.query.inviter_id) {
    data.inviter_id = route.query.inviter_id
  }

  axiosInstance.post(backend.register, data).then((response) => {
    store.commit('auth/SET_TOKEN', response)
    router.push({
      path: '/'
    });
  }).catch((error) => {
    processing.value = false;
    validationErrors.value = error.response.data.errors
  });
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
            <div class="text-center mt-2">
              <h5 class="text-primary">{{ $t('register.createNewAccount') }}</h5>
            </div>
            <div class="p-2 mt-4">
              <form class="needs-validation" @submit.prevent="register">

                <div class="mb-3">
                  <label for="email" class="form-label">{{ $t('register.email') }} <span
                      class="text-danger">*</span></label>
                  <input type="email" class="form-control" v-model="user.email"
                         :placeholder="$t('register.enterEmail')"
                         required :class="{'is-invalid': hasEmailErrors}">
                  <div v-for="(message, index) in validationErrors?.email" :key="index"
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
                  <p class="mb-0 fs-12 text-muted mt-1">{{ $t('register.strongPassword') }}</p>
                  <div v-for="(message, index) in validationErrors?.password" :key="index"
                       class="invalid-feedback">
                    <span>{{ message }}</span>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password_confirmation" class="form-label">{{ $t('register.passwordConfirmation') }}
                    <span
                        class="text-danger">*</span></label>
                  <input type="password" class="form-control" v-model="user.confirmPassword"
                         :placeholder="$t('register.enterPasswordConfirmation')"
                         required :class="{'is-invalid': hasPasswordConfirmationErrors}">
                </div>
                <div class="mb-4">
                  <p class="mb-0 fs-12 text-muted fst-italic">{{ $t('register.byRegistrationYouAgree') }}
                    <router-link
                        :to="{name: 'Terms Conditions'}"
                        class="text-primary text-decoration-underline fst-normal fw-medium">
                      {{ $t('register.termsOfUse') }}
                    </router-link>
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
          <p class="mb-0">{{ $t('register.alreadyHaveAnAccount') }} ?
            <router-link :to="{name: 'login'}"
                         class="fw-semibold text-primary text-decoration-underline">{{ $t('register.signIn') }}
            </router-link>
          </p>
        </div>
      </b-col>
    </b-row>
  </Layout>
</template>