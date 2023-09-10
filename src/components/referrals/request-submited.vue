<script setup>

</script>

<template>
  <b-row class="justify-content-center">
    <b-col col lg="10">
      <b-card no-body>
        <div class="bg-transparent position-relative">
          <b-card-body class="p-5">
            <div class="text-center">
              <div class="avatar-lg mx-auto mt-2">
                <div class="avatar-title bg-light text-success display-3 rounded-circle">
                  <i class="ri-checkbox-circle-fill"></i>
                </div>
              </div>
              <h3>{{ $t('referrals.thanksForSubmission') }}</h3>
            </div>
            <div class="text-center">
              <p class="text-muted">
                {{$t('referrals.submittedText')}}
              </p>
            </div>
          </b-card-body>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<style scoped>

</style>