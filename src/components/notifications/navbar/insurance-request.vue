<script setup>
import {computed, defineProps} from "vue";
import getNotificationDate from "../getNotificationDate";

const props = defineProps({
  notification: Object
})
const isApproved = computed(() => props.notification.data.status === 'approved')

</script>

<template>
  <div class="avatar-xs me-3 flex-shrink-0">
    <span class="avatar-title bg-info-subtle text-success rounded-circle fs-16" v-if="isApproved">
      <i class="bx bx-badge-check"></i>
    </span>
    <span class="avatar-title bg-info-subtle text-danger rounded-circle fs-16" v-else>
      <i class="bx bx-x-circle"></i>
    </span>
  </div>
  <div class="flex-grow-1">
    <router-link :to="{name: 'Notification', params: {id: notification.id}}" class="stretched-link">
      <h6 class="mt-0 mb-2 lh-base">
        <span v-if="isApproved">{{ $t('notifications.insuranceRequestApproved') }}</span>
        <span v-else>{{ $t('notifications.insuranceRequestRejected') }}</span>
      </h6>
    </router-link>
    <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
      <span><i class="mdi mdi-clock-outline"></i> {{ getNotificationDate(notification.created_at) }}</span>
    </p>
  </div>
</template>

<style scoped>

</style>