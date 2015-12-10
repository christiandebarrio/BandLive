$(document).ready(function() {
  "use strict";
    // page is now ready, initialize the calendar...
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
      concerts.forEach(function (concert) {
        console.log(concert.date);

        $("[data-date=" + concert.date + "]").addClass("concert");
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
      var htmlTitle = '<h1>Venues availables</h1>'
                      
      indexPanel.empty();
      indexPanel.append(htmlTitle);

      venuesAvailables.venues.forEach(function (venue) {
        var htmlPanel =  '<div class="col-md-3 col-sm-6">\
                            <a href="<%= venue_path(venue) %>" id="panel-link">\
                            <article class="panel">\
                              <div class="panel-image">\
                                <%= image_tag venue.generate_photo_url(venue.name) %>\
                              </div>\
                              <header>\
                                <h1><%= venue.name %></h1>\
                              </header>\
                              <div class="panel-content">\
                                <p>email: <%= venue.email %></p>\
                                <p>address: <%= venue.address %></p>\
                              </div>\
                            </article>\
                            </a>\
                          </div>'
        indexPanel.append(htmlPanel);
      })

    }
  }

  // $(".calendar-venues-availables")

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

// events: [
//   {
//     title: 'All Day Event',
//     start: '2015-12-23'
//   }]

// $('#calendar').fullCalendar({
//     defaultView: 'basicWeek',
//     dayRender: function(date, cell) {
//         if (cell.hasClass('fc-today')) { // looking for today's cell
//             var index = cell.index(); // get the td offset
//             // find the corresponding item in header table
//             var header = $('#calendar thead.fc-head th').eq(index);
//             header.addClass('fc-today'); // update it with a class
//         }
//     }
// });

// dayRender: function (date, cell) {
//   var check = $.fullCalendar.moment(date,'yyyy-MM-dd');
//   var today = $.fullCalendar.moment(Date.today).startOf('day');
//   if (check < today) {
//     if (cell.hasClass('concert')) {
//         cell.addClass("past-days");
//     }
//   }
// },

// $('#calendar').fullCalendar({
//   dayRender: function(date, cell) {
//     var check = $.fullCalendar.moment(date,'yyyy-MM-dd');
//     if (check = concert.date) {
//       cell.addClass("color-concert");
//       var index = cell.index();
//       var header = $('#calendar thead.fc-head th').eq(index);
//       header.addClass('color-concert');
//     }
//   }
// });

// function requestArtistInfo (event) {
//     event.preventDefault();
//     var artist_id = $('.js-artist').attr('data-id');
//     var artist_url = '/v1/artists/' + artist_id;
    

//     var request = $.get(base_url + artist_url);

//     function onSaveSuccess (response) {
//       printArtistInfo(response);
//       console.debug('Artist searched', response);
//     }

//     function onSaveFailure (err) {
//       console.error(err.responseJSON);
//     }

//     request.done(onSaveSuccess);
//     request.fail(onSaveFailure);
//   }

//   function printArtistInfo (artist) {
//     var name = artist.name;
//     var image_url = artist.images[1].url;
//     var followers = 'Followers: ' + artist.followers.total;
//     var popularity = 'Popularity: ' + artist.popularity;

//     $('.js-photo-artist').attr('src', image_url);
//     $('.js-artist-name').text(name);
//     $('.js-artist-socialdata').html(popularity + '&nbsp&nbsp&nbsp-&nbsp&nbsp&nbsp' + followers);

//     console.log('name: ' + name);
//     console.log('image_url: ' + image_url);
//     console.log('followers: ' + followers);
//     console.log('popularity: ' + popularity);


//     $('.modal').modal('show');
//   }