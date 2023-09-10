<script setup>

</script>

<template>
  <b-row class="justify-content-center">
    <b-col col lg="10">
      <b-card no-body>
        <div class="bg-warning-subtle position-relative">
          <b-card-body class="p-5">
            <div class="text-center">
              <h3>{{ $t('referrals.programTitle') }}</h3>
            </div>
          </b-card-body>
          <div class="shape">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                 xmlns:svgjs="http://svgjs.com/svgjs" width="1440" height="60" preserveAspectRatio="none"
                 viewBox="0 0 1440 60">
              <g mask="url(&quot;#SvgjsMask1001&quot;)" fill="none">
                <path d="M 0,4 C 144,13 432,48 720,49 C 1008,50 1296,17 1440,9L1440 60L0 60z"
                      style="fill: var(--vz-secondary-bg);"></path>
              </g>
              <defs>
                <mask id="SvgjsMask1001">
                  <rect width="1440" height="60" fill="#ffffff"></rect>
                </mask>
              </defs>
            </svg>
          </div>
        </div>
        <b-card-body class="p-4">
          <div>
            <h5>{{ $t('referrals.programTitle') }}!</h5>
            <p class="text-muted">These terms and conditions outline the rules and regulations for the use of Company
              Name's Website, located at Website.com.</p>
            <p class="text-muted">By accessing this website we assume you accept these terms and conditions. Do not
              continue to use Website Name if you do not agree to take all of the terms and conditions stated on this
              page.</p>
            <p class="text-muted">Most interactive websites use cookies to let us retrieve the user's details for each
              visit. Cookies are used by our website to enable the functionality of certain areas to make it easier
              for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>
          </div>

          <div class="text-end">
            <router-link :to="{name: 'Become referral'}" class="w-100 btn btn-success me-1">
              {{ $t('referrals.becomeReferral') }}
            </router-link>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<style scoped>

</style>