import {authenticated, defaultMiddlewares, noReferralRequests, unauthenticated, withUser} from "@/router/middlewares";
import store from "@/state/store";

const becomeReferralMiddlewares = [...defaultMiddlewares, noReferralRequests]

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
      middleware: [unauthenticated],
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/account/register.vue"),
    meta: {
      title: "Register",
      middleware: [unauthenticated],
    },
  },
  {
    path: "/email-verification",
    name: "Email verification",
    component: () => import("../views/account/email-verification.vue"),
    meta: {
      title: "Email Verification",
      middleware: [authenticated, withUser],
    }
  },
  {
    path: "/email-verified",
    name: "Email verified",
    component: () => import("../views/account/email-verified.vue"),
    meta: {
      name: "Email verified",
      middleware: []
    }
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    component: () => import("../views/account/forgot-password.vue"),
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      title: "Logout", authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.commit('auth/LOGOUT');
        localStorage.clear();
        sessionStorage.clear();
        next({name: 'login'});
      },
      middleware: [authenticated]
    },
    component: () => import("../views/auth/logout/basic")
  },
  {
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
    },
    component: () => import("../views/dashboard/ecommerce/index.vue"),
  },
  {
    path: "/referrals",
    name: "referrals",
    meta: {
      title: "Referrals",
    },
    component: () => import("../views/referrals/index.vue"),
  },
  {
    path: "/referrals/become-referral",
    name: "Become referral",
    meta: {
      title: "Become Referral",
      middleware: becomeReferralMiddlewares,
    },
    component: () => import("../views/referrals/become-referral.vue"),

  },
  {
    path: "/insurance",
    name: "Insurance",
    meta: {
      title: "Insurance",
    },
    component: () => import("../views/insurance/index.vue"),
  }
];