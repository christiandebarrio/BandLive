$(document).ready(function() {
  "use strict";
    // page is now ready, initialize the calendar...


  $("#calendar").fullCalendar({

    height: 765,

    dayClick: function() {
      var date = this.attr('data-date');
      $('[class*="fc-day"]').removeClass('selected');
      if(!$('[data-date=' + date + ']').hasClass('fc-past') &
        !$('[data-date=' + date + ']').hasClass('concert')) {
        $('[class*="fc-day"][data-date=' + date + ']').addClass('selected');
        console.log('Date selected: ' + date);
      
        putVenuesAvailables(date);
        $('html, body').animate({
            scrollTop: $(".calendar-venues-availables").offset().top
          }, 800);
      };
    },

    viewRender: function () {
        putConcerts();
    },

 
  });
});