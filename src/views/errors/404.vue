<script>
import project from "@/config/project";

export default {
  computed: {
    project() {
      return project
    }
  }

};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120">
          <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
        </svg>
      </div>
    </div>

    <div class="auth-page-content">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="text-center pt-4">
              <div class="">
                <img src="@/assets/images/error.svg" alt="" class="error-basic-img move-animation">
              </div>
              <div class="mt-n4">
                <h1 class="display-1 fw-medium">404</h1>
                <h3 class="text-uppercase">{{$t('404.title')}} 😭</h3>
                <p class="text-muted mb-4">{{$t('404.description')}}!</p>
                <router-link :to="{name: 'default'}" class="btn btn-success">
                  <i class="mdi mdi-home me-1"></i>{{$t('404.backToHome')}}
                </router-link>
              </div>
            </div>
          </b-col>
        </b-row>

      </b-container>
    </div>

    <footer class="footer">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="text-center">
              <p class="mb-0 text-muted">&copy; {{ new Date().getFullYear() }} {{project.title}}.
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>

  </div>
</template>