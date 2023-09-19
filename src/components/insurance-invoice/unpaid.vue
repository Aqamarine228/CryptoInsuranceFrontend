<script setup>
import {ref, defineProps} from "vue";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";

const props = defineProps({
  invoiceId: String,
})

const loading = ref(false)
const invoiceHref = ref("")

function createCoinbaseInvoice() {
  const win = window.open('', '_blank')
  win.document.write('Loading invoice...');

  if (invoiceHref.value) {
    win.location.href = invoiceHref.value
    return
  }

  loading.value = true;
  axiosInstance.post(backend.createInsuranceCoinbaseInvoice(props.invoiceId)).then((response) => {
    invoiceHref.value = response
    win.location.href = invoiceHref.value
  }).finally(() => {
    loading.value = false;
  })
}
</script>

<template>
  <b-card-body class="p-4 border-top border-top-dashed">
    <b-row class="g-3">
      <b-col sm="12">
        <button class="btn btn-primary w-100" @click="createCoinbaseInvoice" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          <span v-else>{{$t("insurance-invoice.pay")}}</span>
        </button>
      </b-col>
    </b-row>
  </b-card-body>
</template>

<style scoped>

</style>