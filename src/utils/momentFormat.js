import moment from "moment";

export const momentFormat = (date) => {
    return moment(date).format('YYYY-MM-DD');
}