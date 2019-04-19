export default class DateFormatter {
  monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  format = date => {
    var day = date.getDate();
    var monthIndex = date.getMonth();

    return this.monthNames[monthIndex] + " " + day;
  };
}
