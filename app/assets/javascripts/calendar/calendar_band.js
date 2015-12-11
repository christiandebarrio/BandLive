function putConcertsInCalendar () {
  console.log('trying to get concerts');
  var band = $('.profile-band-name').attr('data-id');
  var request = $.get('/calendar/bands/' + band + '/concerts');
  
  function onRequestSuccess (response) {
    printConcerts(response);
    console.log('Concerts of band_id', band,': ', response);
  }

  function onRequestFailure (err) {
    console.log(err.responseJSON);
  }

  request.done(onRequestSuccess);
  request.fail(onRequestFailure);

  function printConcerts (concerts) {
    concerts.band_concerts.forEach(function (concert) {
      console.log(concert.date);

      $('[data-date=' + concert.date + ']').addClass('concert');
      $('.fc-content-skeleton [data-date=' + concert.date + ']').append(
        '<div class="event">\
          <p class="venue-name">' + concert.venue_name + '</p>\
          <p class="concert-time">' + concert.time + '</p>\
        </div>')
    })
  }
}

function putVenuesAvailables (date) {
  console.log('Trying to get venues availables');
  var request = $.get('/calendar/venues-availables/' + date)

  function onRequestSuccess (response) {
    checkVenuesAvailables(response);
    console.log('Venues :', response);
  }

  function onRequestFailure (err) {
    console.log(err.responseJSON);
  }

  request.done(onRequestSuccess);
  request.fail(onRequestFailure);

  function checkVenuesAvailables(venuesAvailables) {
    var indexPanel = $('.calendar-venues-availables');
    var htmldate = '<span class="date-selected">' + date + '</span>'


    indexPanel.empty();
    if(venuesAvailables.venues.length === 0) {
      indexPanel.append('<h1>No venues availables in ' + htmldate + '</h1>');
    } else {
      indexPanel.append('<h1>Venues availables in ' + htmldate + '</h1>');
      venuesAvailables.venues.forEach(function (venue) {
        var htmlPanel =  '\
          <div class="col-md-3 col-sm-6">\
            <a href="/venues/' + venue.id + '" id="panel-link">\
              <article class="panel">\
                <div class="panel-image">\
                  <img src="/assets/' + venue.photo +'" alt="' + venue.name + '">\
                </div>\
                <header>\
                  <h1 id="venue-name">' + venue.name + '</h1>\
                </header>\
                <div class="panel-content">\
                  <p>email: ' + venue.email + '</p>\
                  <p>address: ' + venue.address + '</p>\
                </div>\
                <div class="play-here">\
                  <a href="" class="btn btn-green btn-play-here">Play here</a>\
                </div>\
              </article>\
            </a>\
          </div>';

        indexPanel.append(htmlPanel);
      });
    };

  };
}

$(document).ready(function() {
  "use strict";

  function createConcert (event) {
    event.preventDefault();
    var concert = {
      venue_id: event.currentTarget.parentElement.parentElement.querySelector("#venue-name").innerHTML,
      band_id: $(".profile-band-name").attr('data-id'),
      date: $(".date-selected").text(),
      time: "23:00"
    }
    console.log('Concert data to save: ' + concert);
    debugger
    // var venue_id = event.currentTarget

    // var request = $.post('/concerts', concert)

    // function onRequestSuccess (response) {
    //   checkVenuesAvailables(response);
    //   console.log('Request sended to create concert :', response);
    // }

    // function onRequestFailure (err) {
    //   console.log(err.responseJSON);
    // }

    // request.done(onRequestSuccess);
    // request.fail(onRequestFailure);
  }

  $(".calendar-venues-availables").on('click', '.btn-play-here', createConcert);

});