<script setup>

import Widget from "@/components/referrals/widget.vue";
import BalanceOverview from "@/components/referrals/balance-overview.vue";
import DealsStatus from "@/components/referrals/referrals-table.vue";
import ClosingDeals from "@/components/referrals/referral-income.vue";
import ReferralLink from "@/components/referrals/referral-link.vue";
</script>

<template>
  <b-row>
    <b-col xl="12">
      <Widget />
    </b-col>
  </b-row>
  <b-row>
    <b-col xl="12">
      <referral-link/>
    </b-col>
  </b-row>
  <b-row>
    <b-col xxl="6">
      <BalanceOverview />
    </b-col>
    <b-col xxl="6">
      <DealsStatus />
    </b-col>
  </b-row>
  <b-row>
    <b-col xxl="12">
      <ClosingDeals />
    </b-col>
  </b-row>
</template>

<style scoped>

</style>