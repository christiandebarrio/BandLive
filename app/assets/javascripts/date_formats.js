var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

function dateFormat (date) {
  var dateformat = new Date(date)
  var year_number = dateformat.getFullYear();
  // var year_number = date.split("-")[0];
  var month_number = dateformat.getMonth();
  var month = months[month_number];
  var day_number = dateformat.getDate();
  var day = days[dateformat.getDay()];

  return month + "-" + day + " " + day_number + "-" + year_number;

}

function dateMonthDay (date) {
  var dateformat = new Date(date)
  var month_number = dateformat.getMonth();
  var month = months[month_number];
  var day_number = dateformat.getDate();

  return month + " " + day_number;
}
