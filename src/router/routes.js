import {authenticated, unauthenticated, withUser} from "@/router/middlewares";

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
        localStorage.clear();
        sessionStorage.clear();
        next({name: 'login'});
      },
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
  }
];