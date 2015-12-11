function putConcertsInCalendar () {
  console.log("trying to get concerts");
  var band = $(".profile-band-name").attr("data-id");
  var request = $.get("/calendar/bands/" + band + "/concerts");
  
  function onRequestSuccess (response) {
    printConcerts(response);
    console.log("Concerts of band_id", band,": ", response);
  }

  function onRequestFailure (err) {
    console.log(err.responseJSON);
  }

  request.done(onRequestSuccess);
  request.fail(onRequestFailure);

  function printConcerts (concerts) {
    concerts.band_concerts.forEach(function (concert) {
      console.log(concert.date);

      $("[data-date=" + concert.date + "]").addClass("concert");
      $(".fc-content-skeleton [data-date=" + concert.date + "]").append(
        "<div class='event'>\
        <p class='venue-name'>" + concert.venue_name + "</p>\
        <p class='concert-time'>" + concert.time + "</p>\
        ")
    })
  }
}

function putVenuesAvailables (date) {
  console.log("Trying to get venues availables");
  var request = $.get("/calendar/venues-availables/" + date)

  function onRequestSuccess (response) {
    checkVenuesAvailables(response);
    console.log("Venues :", response);
  }

  function onRequestFailure (err) {
    console.log(err.responseJSON);
  }

  request.done(onRequestSuccess);
  request.fail(onRequestFailure);

  function checkVenuesAvailables(venuesAvailables) {
    var indexPanel = $(".calendar-venues-availables");

    indexPanel.empty();
    if(venuesAvailables.venues.length === 0) {
      indexPanel.append('<h1>No venue available</h1>');
    } else {
      indexPanel.append('<h1>Venues availables</h1>');
      venuesAvailables.venues.forEach(function (venue) {
        var htmlPanel =  '<div class="col-md-3 col-sm-6">\
        <a href="/venue/' + venue.id + '" id="panel-link">\
        <article class="panel">\
        <div class="panel-image">\
        <img src="/assets/' + venue.photo +'" alt="' + venue.name + '">\
        </div>\
        <header>\
        <h1>' + venue.name + '</h1>\
        </header>\
        <div class="panel-content">\
        <p>email: ' + venue.email + '</p>\
        <p>address: ' + venue.address + '</p>\
        </div>\
        <div class="play-here">\
        <a href="" class="btn btn-green">Play here</a>\
        </div>\
        </article>\
        </a>\
        </div>';
        indexPanel.append(htmlPanel);
      });
    };

  };
}