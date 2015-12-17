function fill_empty_days () {
  $('.add-event').remove();

  $('.fc-day-number').each(function (item, day_cell) {

    if(!$(day_cell).hasClass('concert') &&
       !$(day_cell).hasClass('fc-past')){
          // $(day_cell).append('<div class="plus-icon">+</div>');
          $(day_cell).append('<div class="add-event">add a concert</div>');
    };
  });
}

function putConcerts () {
  var bandName = $('.profile-band-name').text();
  var bandId = $('.profile-band-name').attr('data-id');
  
  console.log('trying to get concerts');

  var request = $.get('/calendar/bands/' + bandId + '/concerts');
  
  function onRequestSuccess (response) {
    printConcerts(response);
    putOutstandingConcerts(response, bandName);
    fill_empty_days();
    console.log('Concerts of band_id: ', bandId,': ', response);
  }

  function onRequestFailure (err) {
    console.log(err.responseJSON);
  }

  request.done(onRequestSuccess);
  request.fail(onRequestFailure);

  

// <div class="wraper-social-btn">\
//   <div class="fb-share-button" \
//     data-href="https://localhost3000/concerts/' + concert.id + '" \
//     data-layout="button">\
//   </div>\
// </div>\

  // <a href="" class="btn btn-green btn-share">Share</a>\

  function printConcerts (concerts) {
    $('.fc-day-number').removeClass('selected')
    $('.fc-content-skeleton .event').remove();
    concerts.band_concerts.forEach(function (concert) {
      console.log(concert.date);

      $('[data-date=' + concert.date + ']').addClass('concert');
      $('.fc-content-skeleton [data-date=' + concert.date + ']').append('\
        <img src="/assets/quaver-calendar.png" alt="quaver" class="event"/>\
        <div class="event">\
          <p class="event concert-time">' + concert.time + 'h</p>\
          <p class="event venue-name">' + concert.venue_name + '</p>\
        </div>')
    })
  }
}

function putOutstandingConcerts (concerts, bandName) {
  var divOustandingConcerts = $('#next-concerts');
  var outstandingConcerts = concerts.band_concerts.filter(function (concert) {
    if(concert.date >= today) {
      return concert;
    };
  });

  divOustandingConcerts.empty();

  if(outstandingConcerts.length > 0) {
    divOustandingConcerts.append('<h1>Next concerts</h1>');
    
    var html_message = '\
          <div class="message-thunder">\
            <img src="/assets/thunder-dark.png" alt="thunder"/>\
          </div>\
          <div class="message">\
            <h2>WELL DONE! You have a few concerts coming.</h2>\
            <h3>Share with friends in your social networks to get \
            the best night live.</h3>\
          </div>';     
    divOustandingConcerts.append(html_message);

    divOustandingConcerts.append('<ul class="list-next-concerts container"></ul>');

    outstandingConcerts.forEach(function (concert) { 
      var html =  '\
        <li class="item-next-concerts container">\
          <a href="/concerts/' + concert.id + '">\
            <div class="next-concert-quaver">\
              <img src="/assets/quaver-little.png" alt="quaver"/>\
            </div>\
            <div class="next-concert-data fix-data-date">\
              <span class="title">Date</span>\
              <p class="data">' + dateMonthDay(concert.date) + '</p>\
            </div>\
            <div class="next-concert-data fix-data-time">\
              <span class="title hour">Time</span>\
              <p class="data hour">' + concert.time + '</p>\
            </div>\
            <div class="next-concert-data">\
              <span class="title">Venue</span>\
              <p class="data">' + concert.venue_name + '</p>\
            </div>\
            <div class="share-social">\
              <div class="wraper-social-btn">\
                <a href="https://twitter.com/share" \
                  class="twitter-share-button" \
                  data-url="http://localhost3000/concerts/' + concert.id + '" \
                  data-text="' + bandName + ' next concert ' + dateMonthDay(concert.date) + ' in ' + concert.venue_name + '" \
                  data-hashtags="' + bandName + ', livemusic">Tweet</a>\
              </div>\
            </div>\
          </a>\
        </li>';
      $('.list-next-concerts').append(html);
    });

    twttr.widgets.load(
      document.getElementById("next-concerts")
    );

  };
}

function putVenuesAvailables (date) {
  console.log('Trying to get venues availables');

  var request = $.get('/calendar/venues-availables/' + date)

  function onRequestSuccess (response) {
    printVenuesAvailables(response);
    console.log('Venues :', response);
  }

  function onRequestFailure (err) {
    console.log(err.responseJSON);
  }

  request.done(onRequestSuccess);
  request.fail(onRequestFailure);

  function printVenuesAvailables (venuesAvailables) {
    var divVenuesAvailables = $('.calendar-venues-availables');
    var htmldate = '<span class="date-selected">' + date + '</span>'


    divVenuesAvailables.empty();

    if(venuesAvailables.venues.length === 0) {
      divVenuesAvailables.append('<h1>No venues availables</h1>');
    } else {
      divVenuesAvailables.append('<h1>- Select a venue</h1>');
      venuesAvailables.venues.forEach(function (venue) {
        var htmlPanel =  '\
            <article class="container venue-available">\
              <div class="col-md-1 col-sm-1 venue-available-thunder">\
                <img src="/assets/thunder.png" alt="thunder">\
              </div>\
              <div class="col-md-2 col-sm-2 venue-available-img">\
                <img src="/assets/' + venue.photo +'" alt="' + venue.name + '">\
              </div>\
              <header class="col-md-4 col-sm-4">\
                <span class="venue-available-title">Venue name</span>\
                <h1 class="venue-available-name" data-id="' + venue.id + '">' + venue.name + '</h1>\
                <div class="venue-available-play-here">\
                  <a href="" class="btn btn-pink btn-play-here">Play here</a>\
                </div>\
              </header>\
              <div class="col-md-5 col-sm-5 venue-available-body">\
                <span class="venue-available-title">Address</span>\
                <p class="venue-available-data">' + venue.address + '</p>\
                <span class="venue-available-title">email</span>\
                <p class="venue-available-data">' + venue.email + '</p>\
              </div>\
            </article>';

        divVenuesAvailables.append(htmlPanel);
      });
    };
  };
}

$(document).ready(function() {
  "use strict";

  function createConcert (event) {
    event.preventDefault();
    var new_concert = { concert: {
      venue_id: event.currentTarget.parentElement.parentElement.querySelector(".venue-available-name").getAttribute('data-id'),
      band_id: $(".profile-band-name").attr('data-id'),
      date: $(".selected").attr('data-date'),
      time: "23:00"}
    }

    var request = $.post('/concerts', new_concert)

    function onRequestSuccess (response) {     
      console.log('Request sended to create concert :', response);
      putConcerts();
      $('html, body').animate({
        scrollTop: $("#calendar").offset().top - 50
      }, 800);
      setTimeout(function(){
         $('.calendar-venues-availables').empty();
      }, 1000);
    }

    function onRequestFailure (err) {
      console.log(err.responseJSON);
    }

    request.done(onRequestSuccess);
    request.fail(onRequestFailure);
  }

  $(".calendar-venues-availables").on('click', '.btn-play-here', createConcert);

});