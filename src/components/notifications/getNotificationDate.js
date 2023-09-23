import moment from "@/plugins/moment";

export default function (date) {
    return moment()(date).fromNow(true)
}
