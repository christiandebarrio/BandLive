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

        $("[data-date=" + concert.date + "]").addClass("concert");
      })
    }
  }

  $("#calendar").fullCalendar({

    dayClick: function() {
      alert(this[0]);
    },

    // dayRender: function (date, cell) {
    //   var check = $.fullCalendar.moment(date,'yyyy-MM-dd');
    //   var today = $.fullCalendar.moment(Date.today).startOf('day');
    //   if (check < today) {
    //     if (cell.hasClass('concert')) {
    //         cell.addClass("past-days");
    //     }
    //   }
    // },

    viewRender: function () {
        putConcertsInCalendar();
    },

    events: [
      {
        title: 'All Day Event',
        start: '2015-12-23'
      }]
  });
});

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