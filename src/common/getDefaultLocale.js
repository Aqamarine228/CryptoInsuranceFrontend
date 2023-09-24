import locale from "@/config/locale";

export default function () {
    const browserLocale = `${window.navigator.language[0]}${window.navigator.language[1]}`
    if (locale.available.includes(browserLocale)) {
        return browserLocale
    }

    return process.env.VUE_APP_I18N_LOCALE
}