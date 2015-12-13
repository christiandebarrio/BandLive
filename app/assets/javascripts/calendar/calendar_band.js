function putConcerts () {
  var bandId = $('.profile-band-name').attr('data-id');
  $('.calendar-venues-availables').empty();
  console.log('trying to get concerts');

  var request = $.get('/calendar/bands/' + bandId + '/concerts');
  
  function onRequestSuccess (response) {
    printConcerts(response);
    putOutstandingConcerts(response);
    console.log('Concerts of band_id: ', bandId,': ', response);
  }

  function onRequestFailure (err) {
    console.log(err.responseJSON);
  }

  request.done(onRequestSuccess);
  request.fail(onRequestFailure);

  function putOutstandingConcerts (concerts) {
    var divOustandingConcerts = $('.calendar-outstanding-concerts');
    var today = $(".fc-today").attr('data-date');
    var outstandingConcerts = concerts.band_concerts.filter(function (concert) {
      if(concert.date >= today) {
        return concert;
      };
    });

    divOustandingConcerts.empty();

    if(outstandingConcerts.length > 0) {
      divOustandingConcerts.append('<h1>Outstanding concerts</h1>');
      divOustandingConcerts.append('<ul id="list-outstanding-concerts">');

      outstandingConcerts.forEach(function (concert) {
        var html =  '\
          <li>\
            <span class="date">' + dateFormat(concert.date) + '</span> - \
            <span class="time">' + concert.time + '</span> - \
            <span class="venue-name">' + concert.venue_name + '</span>\
          </li>';

        divOustandingConcerts.append(html);

      });

      divOustandingConcerts.append('</ul>');

    };
  }

  function printConcerts (concerts) {
    $('.fc-content-skeleton .event').empty();
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
      divVenuesAvailables.append('<h1>No venues availables in ' + htmldate + '</h1>');
    } else {
      divVenuesAvailables.append('<h1>Venues availables in ' + htmldate + '</h1>');
      venuesAvailables.venues.forEach(function (venue) {
        var htmlPanel =  '\
          <div class="col-md-3 col-sm-6">\
            <a href="/venues/' + venue.id + '" id="panel-link">\
              <article class="panel">\
                <div class="panel-image">\
                  <img src="/assets/' + venue.photo +'" alt="' + venue.name + '">\
                </div>\
                <header>\
                  <h1 id="venue-name" data-id="' + venue.id + '">' + venue.name + '</h1>\
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

        divVenuesAvailables.append(htmlPanel);

        $('html, body').animate({
          scrollTop: $(".calendar-venues-availables").offset().top
        }, 800);
      });
    };
  };
}

$(document).ready(function() {
  "use strict";

  function createConcert (event) {
    event.preventDefault();
    var new_concert = { concert: {
      venue_id: event.currentTarget.parentElement.parentElement.querySelector("#venue-name").getAttribute('data-id'),
      band_id: $(".profile-band-name").attr('data-id'),
      date: $(".date-selected").text(),
      time: "23:00"}
    }

    var request = $.post('/concerts', new_concert)

    function onRequestSuccess (response) {     
      console.log('Request sended to create concert :', response);
      putConcerts();
      $('html, body').animate({scrollTop: 0}, 800);
    }

    function onRequestFailure (err) {
      console.log(err.responseJSON);
    }

    request.done(onRequestSuccess);
    request.fail(onRequestFailure);
  }

  $(".calendar-venues-availables").on('click', '.btn-play-here', createConcert);

});