<script setup>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import {useRoute, useRouter} from "vue-router";
import Swal from "sweetalert2";
import {useStore} from "vuex";

const i18n = useI18n()
const route = useRoute()
const router = useRouter()
const store = useStore()

const title = i18n.t('menu.insuranceRequest')
const items = [
  {
    text: i18n.t('menu.insurance'),
    href: {name: "Insurance"},
  },
  {
    text: i18n.t('menu.insuranceRequest'),
    active: true,
  }
]

const insuranceOption = ref({})
const fieldValues = ref({})

onMounted(() => {
  getInsuranceOption()
})

function getInsuranceOption() {
  axiosInstance.get(backend.insuranceOption(route.params.id)).then((response) => {
    insuranceOption.value = response
    response.fields.forEach((el) => {
      fieldValues.value[el.slug] = ""
    })
  })
}

function submit() {
  axiosInstance.post(backend.createInsuranceRequest(route.params.id), fieldValues.value).then(() => {
    store.commit('user/INSURANCE_REQUEST_CREATED')
    router.push({name: "Insurance"})
    Swal.fire({
      title: i18n.t('insurance-request.submittedSuccessfully'),
      icon: "success",
      position: "top-end",
      showConfirmButton: false,
      width: '300px',
      timer: 1500
    })
  });
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header class="align-items-center d-flex">
            <b-card-title class="mb-0 flex-grow-1">{{ $t('insurance-request.title') }}</b-card-title>
          </b-card-header>
          <form @submit.prevent="submit">
            <b-card-body>
              <div class="live-preview">
                <b-row class="align-items-center" v-for="(item, key) in insuranceOption.fields" :key="key">
                  <b-col lg="12" class="mb-3">
                    <div>
                      <label class="form-label">{{ item.name }} <span v-if="item.required"
                                                                      class="text-danger">*</span></label>
                      <input class="form-control" v-model="fieldValues[item.slug]" :type="item.type"
                             :required="item.required">
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
            <b-card-footer>
              <button class="btn btn-primary w-100" type="submit">
                {{$t('insurance-request.submit')}}
              </button>
            </b-card-footer>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </Layout>
</template>

<style scoped>

</style>