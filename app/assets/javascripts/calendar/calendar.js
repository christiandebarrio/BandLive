$(document).ready(function() {
  "use strict";
    // page is now ready, initialize the calendar...


  $("#calendar").fullCalendar({

    dayClick: function() {
      var date = this.attr("data-date");
      console.log("Date selected: " + date);
      putVenuesAvailables(date);
      $('html, body').animate({
        scrollTop: $(".calendar-venues-availables").offset().top
      }, 800);
    },

    viewRender: function () {
        putConcertsInCalendar();
    },

 
  });
});