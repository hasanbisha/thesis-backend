import * as moment from "moment";

export const getFormattedDate = (input: moment.MomentInput) => {
  return moment(input).format("YYYY-MM-DD");
}
