import {authenticated, defaultMiddlewares, noReferralRequests, unauthenticated, withUser, noInsuranceRequests} from "@/router/middlewares";

const becomeReferralMiddlewares = [...defaultMiddlewares, noReferralRequests]
const insuranceRequestMiddlewares = [...defaultMiddlewares, noInsuranceRequests]

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
    path: "/terms-conditions",
    name: "Terms Conditions",
    component: () => import("../views/account/terms-conditions.vue"),
    meta: {
      title: "Terms & Conditions",
      middleware: [],
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
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
    },
    component: () => import("../views/dashboard/index.vue"),
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
    name: "Insurances",
    meta: {
      title: "Insurances",
    },
    component: () => import("../views/insurance/index.vue"),
  },
  {
    path: "/insurance/add",
    name: "Insurance Add",
    meta: {
      title: "Add Insurance",
    },
    component: () => import("../views/insurance/add.vue"),
  },
  {
    path: "/insurance/:id",
    name: "Insurance",
    meta: {
      title: "Insurance",
    },
    component: () => import("../views/insurance/show.vue"),
  },
  {
    path: "/insurance/:id/information",
    name: "Insurance Information",
    meta: {
      title: "Insurance Information",
    },
    component: () => import("../views/insurance/information.vue"),
  },
  {
    path: "/insurance/create-own",
    name: "Create own insurance",
    meta: {
      title: "Create Own Insurance"
    },
    component: () => import("../views/insurance/create-own.vue")
  },
  {
    path: "/insurance/invoice/:id",
    name: "Insurance invoice",
    meta: {
      title: "Insurance Invoice",
    },
    component: () => import("../views/insurance/invoice.vue")
  },
  {
    path: "/insurance/option/:id/request",
    name: "Insurance request",
    meta: {
      title: "Insurance Request",
      middleware: insuranceRequestMiddlewares,
    },
    component: () => import("../views/insurance/request.vue")
  },
  {
    path: "/notification/:id",
    name: "Notification",
    meta: {
      title: "Notification"
    },
    component: () => import("../views/notification/index.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    meta: {
      title: "Not Found",
      middleware: [],
    },
    component: () => import('../views/errors/404.vue')
  },
  {
    path: "/balance",
    name: "Balance",
    meta: {
      title: "Balance",
    },
    component: () => import('../views/balance/index.vue')
  }
];