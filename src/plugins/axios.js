import axios from "axios"
import router from "../router"
import backend from "@/config/backend";
import store from "@/state/store";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
    baseURL: backend.url,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
    },
})

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = store.getters['auth/isLoggedIn'] ? `Bearer ${store.getters['auth/token']}` : ""
    config.headers["Accept-Language"] = store.getters['locale/currentLocale']

    return config
})

axiosInstance.interceptors.response.use(
    (response) => response.data.response,
    (error) => {
        if (!error.response) {
            return Promise.reject(error)
        }

        if (error.response.status === 401) {
            store.commit('auth/LOGOUT')
            return router.push({ name: "login" })
        }

        let errorMessage = error.response.data.message

        Swal.fire({
            position: "top-end",
            icon: "error",
            title: errorMessage,
            showConfirmButton: false,
            width: '300px',
            timer: 1500,
        })


        // toast(errorMessage, {
        //     type: "error",
        // })

        return Promise.reject(error)
    }
)

export default axiosInstance