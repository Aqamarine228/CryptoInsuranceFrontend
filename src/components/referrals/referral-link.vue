<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

const tooltip = ref("copy")

const registerUrl = computed(() => {
  return location.host + router.resolve({name: "Register"}).fullPath + "?inviter_id=" + store.getters['user/referralId']
})

async function copyText() {
  tooltip.value = "copied!"
  await navigator.clipboard.writeText(document.getElementById('toClone').innerText)
}

function focusLeft() {
  tooltip.value = "copy"
}
</script>

<template>
  <b-card no-body class="crm-widget">
    <b-card-body class="p-0">
      <b-row class="row-cols-xxl-1 row-cols-md-1 row-cols-1 g-0">
        <b-col>
          <div class="py-4 px-3">
            <h5 class="text-muted text-uppercase fs-13">
              {{ this.$t('referrals.referralLink')}}
            </h5>
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <b-link class="btn btn-lg" href="#" v-b-tooltip.hover='{title: tooltip}'
                        @click="copyText" @mouseout="focusLeft">
                  <i class="bx bx-copy display-6 text-muted"></i>
                </b-link>
              </div>
              <div class="flex-grow-1">
                <h3 class="mb-0" id="toClone">
                  {{ registerUrl }}
                </h3>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<style scoped>

</style>