<script setup>

import SimpleBar from "simplebar-vue";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";
import notificationTypes from "../notifications/notificationTypes";

const store = useStore()

const notifications = ref([])
const loading = ref(true)
const selectedNotifications = ref([])
const unreadNotificationsCount = ref(store.getters['user/user'].unread_notifications_count)

const buttonsDisabled = computed(() => !selectedNotifications.value.length)

function getNotifications() {
  axiosInstance.get(backend.notifications).then((response) => {
    notifications.value = response;
    loading.value = false;
  })
  markNotificationsAsRead()
}

function deleteNotifications() {
  loading.value = true;
  axiosInstance.delete(backend.notifications, {params: {notifications: selectedNotifications.value}})
      .then(() => getNotifications())
  selectedNotifications.value = [];
}

function markNotificationsAsRead() {
  unreadNotificationsCount.value = 0;
  axiosInstance.post(backend.notificationsMarkAsRead, {notifications: selectedNotifications.value}).then(() => {
    store.commit('user/NOTIFICATIONS_READ')
  });
}

function selectAllNotifications() {
  if (selectedNotifications.value.length === notifications.value.length) {
    selectedNotifications.value = [];
    return;
  }

  selectedNotifications.value = [];
  notifications.value.forEach((el) => selectedNotifications.value.push(el.id))
}
</script>

<template>
  <div class="dropdown topbar-head-dropdown ms-1 header-item">
    <button type="button"
            class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
            id="page-header-notifications-dropdown"
            @click="getNotifications"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
    >
      <i class="bx bx-bell fs-22"></i>
      <span
          v-if="unreadNotificationsCount > 0"
          class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger"
      >
                {{ unreadNotificationsCount }}<span
          class="visually-hidden">{{ $t('notifications.unreadMessages') }}</span>
      </span>
    </button>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
         aria-labelledby="page-header-notifications-dropdown">
      <div class="dropdown-head bg-primary bg-pattern rounded-top">
        <div class="p-3">
          <b-row class="align-items-center">
            <b-col>
              <h6 class="m-0 fs-13 fw-semibold text-white">
                {{ $t('notifications.title') }}
              </h6>
            </b-col>
            <b-col cols="auto">
              <button class="btn btn-primary btn-sm mx-1" @click.stop="selectAllNotifications">
                {{$t('notifications.selectAll')}}
              </button>
              <button class="btn btn-danger btn-sm" @click.stop="deleteNotifications" :disabled="buttonsDisabled">
                {{$t('notifications.delete')}}
              </button>
            </b-col>
          </b-row>
        </div>
      </div>

      <div class="tab-content" id="notificationItemsTabContent">

        <div class="m-lg-5 d-flex align-items-center justify-content-center" v-if="loading"><span
            class="spinner-border"></span></div>

        <div class="tab-pane fade py-2 ps-2 show active" v-else>
          <SimpleBar data-simplebar style="max-height: 300px" class="pe-2" v-if="notifications.length > 0">
            <div
                v-for="notification in notifications"
                class="text-reset notification-item d-block dropdown-item position-relative"
                :key="notification.id"
            >
              <div class="d-flex">
                <component :is="notificationTypes[notification.type].navbar" :notification="notification" />

                <div class="px-2 fs-15">
                  <input
                      class="form-check-input"
                      :value="notification.id"
                      v-model="selectedNotifications"
                      type="checkbox"
                  />
                </div>
              </div>
            </div>
          </SimpleBar>
          <div class="text-muted text-center" v-else>
            {{$t('notifications.noNotifications')}}
          </div>
        </div>

        <div class="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab">
          <div class="w-25 w-sm-50 pt-3 mx-auto">
            <img src="@/assets/images/svg/bell.svg" class="img-fluid" alt="user-pic"/>
          </div>
          <div class="text-center pb-5 mt-2">
            <h6 class="fs-18 fw-semibold lh-base">
              {{ $t('notifications.noNotifications') }}
            </h6>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>