import {defineAsyncComponent} from "vue";

export default {
    'Modules\\Admin\\Notifications\\InsuranceRequestNotification': {
        navbar: defineAsyncComponent(() => import('@/components/notifications/navbar/insurance-request.vue')),
        page: defineAsyncComponent(() => import('@/components/notifications/page/insurance-request.vue')),
    },
    'Modules\\Admin\\Notifications\\ReferralRequestNotification': {
        navbar: defineAsyncComponent(() => import('@/components/notifications/navbar/referral-request.vue')),
        page: defineAsyncComponent(() => import('@/components/notifications/page/referral-request.vue')),
    },
}