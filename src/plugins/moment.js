import moment from "moment";
import store from "@/state/store";

export default function () {
    const mmnt = moment
    mmnt.locale(store.getters['locale/currentLocale'])
    return mmnt
}