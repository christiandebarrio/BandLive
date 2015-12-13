$(document).ready(function() {
  "use strict";
    // page is now ready, initialize the calendar...


  $("#calendar").fullCalendar({

    height: 700,

    dayClick: function() {
      var date = this.attr("data-date");
      console.log("Date selected: " + date);
      putVenuesAvailables(date);  
    },

    viewRender: function () {
        putConcerts();
    },

 
  });
});