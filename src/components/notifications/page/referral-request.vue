<script setup>
import {computed, defineProps} from "vue";
import {useStore} from "vuex";

const store = useStore()

const props = defineProps({
  notification: Object
})

const approved = computed(() => props.notification.data.status === 'approved')
const rejectionReason = computed(() => props.notification.data['rejection_reason_' + store.getters['locale/currentLocale']])

</script>

<template>
  <b-card>
    <b-card-body>
      <div class="avatar-lg mx-auto mt-2">
        <div class="avatar-title bg-light text-success display-3 rounded-circle" v-if="approved">
          <i class="ri-checkbox-circle-fill"></i>
        </div>
        <div class="avatar-title bg-light text-danger display-3 rounded-circle" v-else>
          <i class="ri-close-circle-fill"></i>
        </div>
      </div>
      <div class="mt-4 pt-2 d-flex align-items-center justify-content-center flex-column">
        <h4>{{ $t(approved ? 'notifications.referralRequestApproved' : 'notifications.referralRequestRejected') }}</h4>
        <router-link class="btn btn-success w-50 mt-1" :to="{name: 'referrals'}" v-if="approved">
          {{ $t('notifications.referralRequestToReferralsPage') }}
        </router-link>
        <p class="text-muted mx-4" v-else>
          {{ rejectionReason }}
        </p>
      </div>
    </b-card-body>
  </b-card>
</template>

<style scoped>

</style>