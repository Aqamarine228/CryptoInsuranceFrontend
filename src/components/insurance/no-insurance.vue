<script setup>

</script>

<template>
  <b-row>
    <b-card class="card-height-100">
      <b-card-body>
        <div class="mb-4">
          <div class="avatar-lg mx-auto">
            <div class="avatar-title bg-light text-primary display-5 rounded-circle">
              <i class="ri-shield-line"></i>
            </div>
          </div>
        </div>

        <div class="p-2 mt-4">
          <div class="text-muted text-center mb-4 mx-lg-3">
            <h4 class="">{{ $t('dashboard.getInsuranceToday') }}</h4>
          </div>

          <div class="text-muted mb-4 text-center">
            <p v-for="index in 4" :key="index" class="mb-0">{{ $t(`dashboard.getInsuranceText${index}`) }}</p>
          </div>

          <div class="mt-3">
            <router-link :to="{name: 'default'}" class="w-100 btn btn-primary">
              {{ $t('dashboard.getInsuranceButton') }}
            </router-link>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </b-row>
</template>

<style scoped>
</style>