<script setup>

</script>

<template>
  <b-card-body class="p-4 border-top border-top-dashed">
    <b-row class="g-3">
      <b-col sm="12">
        <div class="avatar-lg mx-auto mt-2">
          <div class="avatar-title bg-light text-success display-3 rounded-circle">
            <i class="ri-checkbox-circle-fill"></i>
          </div>
        </div>
        <div class="mt-4 pt-2 d-flex justify-content-center flex-column align-items-center">
          <h4>{{$t('insurance-invoice.paid')}} !</h4>
          <p class="text-muted mx-4">{{$t('insurance-invoice.paidMessage')}}</p>
          <div class="mt-4 w-100">
            <router-link :to="{name: 'Insurance'}" class="btn btn-success w-100">{{ $t('insurance-invoice.backToInsuranceButton')}}</router-link>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-card-body>
</template>

<style scoped>

</style>