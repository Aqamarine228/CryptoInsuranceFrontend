import config from "../config"
import axios from "axios"
import store from "../store"
import { MutationTypes } from "../store/mutation-types.ts"
import router from "../router"
import { toast } from "vue3-toastify"

const axiosInstance = axios.create({
    baseURL: config.backend.url,
    headers: {
        Authorization: store.getters.isAuthenticated ? `Token ${store.getters.token}` : "",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
    },
})

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = store.getters.isAuthenticated ? `Token ${store.getters.token}` : ""

    return config
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            return Promise.reject(error)
        }

        if (error.response.status === 401) {
            console.log(axios.defaults.headers.common["Authorization"])
            store.commit(MutationTypes.AUTH_LOGOUT)
            return router.push({ name: "login" })
        }

        let errorMessage = error.response.status

        switch (typeof error.response.data) {
            case "object":
                errorMessage = error.response.data[Object.keys(error.response.data)[0]]
                break
            case "string":
                errorMessage = error.response.data
                break
        }

        toast(errorMessage, {
            type: "error",
        })

        return Promise.reject(error)
    }
)

export default axiosInstance