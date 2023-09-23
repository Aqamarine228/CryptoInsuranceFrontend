<script setup>
import {computed, onMounted, ref} from "vue";
import Layout from "@/layouts/unauthorized.vue"
import {useRouter} from "vue-router";
import axiosInstance from "@/plugins/axios";

const router = useRouter();

const success = ref(false);
const error = ref("");

onMounted(async () => {
  await verifyEmail()
})

const hasError = computed(() => !!error.value);

function verifyEmail() {
  const link = router.currentRoute.value.query.verification_link
  if (!link) {
    success.value = false
    return
  }

  axiosInstance.post(link).then(() => success.value = true).catch((errorMessage) => {
    error.value = errorMessage.response.data.message
    success.value = false
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
              <div class="avatar-lg mx-auto mt-2">
                <div class="avatar-title bg-light text-primary display-3 rounded-circle"
                     :class="success ? 'text-success' : 'text-danger'">
                  <i :class=" success ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'"></i>
                </div>
              </div>
            </div>

            <div class="p-2 mt-4">
              <div class="text-muted text-center mb-4 mx-lg-3">
                <h4 v-if="success">{{ $t('verify-email.verifiedSuccessfully') }}</h4>
                <h4 v-else>{{ $t('verify-email.verificationError') }}</h4>
                <b-alert v-if="!success" v-model="hasError" variant="danger" class="mt-3">{{ error }}</b-alert>
              </div>
            </div>
          </b-card-body>
        </b-card>

      </b-col>
    </b-row>
  </Layout>
</template>