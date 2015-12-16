$(document).ready(function() {
  'use strict';
    // page is now ready, initialize the calendar...
    
  $('#calendar').fullCalendar({

    height: 765,

    dayClick: function() {
      var date = this.attr('data-date');
      

      if($('[data-date=' + date + ']').hasClass('selected')) {

        $('[class*="fc-day"][data-date=' + date + ']').removeClass('selected');
        $('.calendar-venues-availables').empty();

      } else if(!$('[data-date=' + date + ']').hasClass('fc-past') &&
        !$('[data-date=' + date + ']').hasClass('concert')) {

        $('[class*="fc-day"]').removeClass('selected');
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

// <div class="plus-icon">+</div>