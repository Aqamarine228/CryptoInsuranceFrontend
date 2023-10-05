import moment from "@/plugins/moment";

export default (seconds) => moment().duration(seconds, "seconds").humanize();