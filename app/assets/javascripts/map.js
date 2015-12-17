$(document).ready(function() {
  var map;

  var itemPosition = {
    lat: parseFloat($('#venue-address').attr('data-latitude')),// position.coords.latitude,
    lng: parseFloat($('#venue-address').attr('data-longitude'))// position.coords.longitude
  };

  $("#venue-address").text();

  function createMap(position){
    var mapOptions = {
      center: position,
      zoom: 17
    };
    map = new google.maps.Map($('#map')[0], mapOptions);
    createMarker(position);
    // loadPositions();
  }

  function createMarker(position) {
    var market = new google.maps.Marker({
      position: position,
      map: map
    });  
  }

  function setupAutocomplete() {
    var input = $('#get-places')[0];
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function(){
      var place = autocomplete.getPlace();
      if (place.geometry.location) {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      } else {
        alert("The place has no location...?");
      }
      createMarker(place.geometry.location);
      savePositions(place.geometry.location);
    });
  }

  createMap(itemPosition);

});