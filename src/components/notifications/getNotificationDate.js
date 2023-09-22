import moment from "moment/moment";

export default function (date) {
    return moment(date).fromNow(true)
}
