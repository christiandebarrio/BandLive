json.band_concerts @band_concerts do |concert|
  json.venue_id concert.venue_id
  json.band_id concert.band_id
  json.date concert.date
  json.time concert.time.strftime("%R")
  json.id concert.id

  json.venue_name Venue.find_by_id(concert.venue_id).name
  json.venue_email Venue.find_by_id(concert.venue_id).email
  json.venue_address Venue.find_by_id(concert.venue_id).address
  json.venue_photo Venue.find_by_id(concert.venue_id).photo

end