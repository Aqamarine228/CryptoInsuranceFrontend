export default {
    url: process.env.VUE_APP_BACKEND_URL,
    login: '/v1/login',
    register: '/v1/register',
    user: '/v1/user',
    resendVerificationEmail: '/v1/email/resend-verification',
    referralRequest: '/v1/referral-request',
    referralWidgetsData: '/v1/referrals/widgets-data',
    insuranceSubscriptionOptions: '/v1/insurance-subscription-option',
    insurancePacks: '/v1/insurance-pack',
    insuranceOptions: '/v1/insurance-option',
    createInsuranceInvoiceFromOptions: '/v1/insurance-invoice/custom',
    createInsuranceInvoiceFromPack: '/v1/insurance-invoice/from-pack',
    insurance: '/v1/insurance',
    referralIncome: '/v1/referral-income',
    insuranceInvoice: (id) => `/v1/insurance-invoice/${id}`,
    insuranceOption: (id) => `/v1/insurance-option/${id}`,
    createInsuranceRequest: (id) => `/v1/insurance-request/${id}`,
}