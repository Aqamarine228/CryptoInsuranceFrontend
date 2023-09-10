<script setup>

import PageHeader from "@/components/page-header.vue";
import Layout from "@/layouts/main.vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import backend from "@/config/backend";
import axiosInstance from "@/plugins/axios";
import {useRouter} from "vue-router";

const i18n = useI18n()
const router = useRouter()

const title = i18n.t('menu.becomeReferral')
const items = [
  {
    text: i18n.t('menu.referrals'),
    href: {name: 'referrals'},
  },
  {
    text: i18n.t('menu.becomeReferral'),
    active: true,
  },
]

const telegramUsername = ref("")
const documentPhoto = ref(null)
const address = ref("")
const submitting = ref(false)

function uploadPhoto(event) {
  documentPhoto.value = event.target.files[0]
}

function submitRequest() {
  submitting.value = true
  axiosInstance.post(backend.referralRequest, {
    telegram_account: telegramUsername.value,
    document_photo: documentPhoto.value,
    address: address.value,
  }, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(() => {
    router.push({name: "referrals"})
  })
  submitting.value = false
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <b-row>
      <b-col>
        <b-card>
          <b-card-body class="p-4">
            <div class="tab-content">
              <div class="tab-pane active">
                <form @submit.prevent="submitRequest">
                  <b-row>
                    <b-col lg="6">
                      <div class="mb-3">
                        <label for="firstnameInput"
                               class="form-label">{{ $t('become-referral.telegramUsername') }} <span
                            class="text-danger">*</span></label>
                        <p class="text-muted">{{ $t('become-referral.telegramUsernameDescription') }}</p>
                        <div class="input-group">
                          <div class="input-group-text">@</div>
                          <input v-model="telegramUsername" required type="text" class="form-control"
                                 id="autoSizingInputGroup"
                                 placeholder="Username">
                        </div>
                      </div>
                    </b-col>
                    <b-col lg="6">
                      <div class="mb-3">
                        <label for="formFile" class="form-label">{{ $t('become-referral.document') }} <span
                            class="text-danger">*</span></label>
                        <p class="text-muted">{{ $t('become-referral.documentFieldDescription') }}</p>
                        <input accept="image/jpg, image/jpeg, image/png" required class="form-control" type="file"
                               @change="uploadPhoto"
                               id="formFile">
                      </div>
                    </b-col>
                    <b-col lg="12">
                      <div class="mb-3">
                        <label for="websiteInput1" class="form-label">{{ $t('become-referral.address') }} <span
                            class="text-danger">*</span></label>
                        <input v-model="address" type="text" class="form-control" id="websiteInput1"
                               placeholder="California, Santa Monica Beach 1337"/>
                      </div>
                    </b-col>
                    <b-col lg="12">
                      <div class="hstack gap-2 justify-content-end">
                        <b-button type="submit" class="w-100 btn-success" variant="primary" :disabled="submitting">
                          {{ submitting ? $t('become-referral.submitting') + "..." : $t('become-referral.submit') }}
                        </b-button>
                      </div>
                    </b-col>
                  </b-row>
                </form>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </Layout>
</template>

<style scoped>

</style>