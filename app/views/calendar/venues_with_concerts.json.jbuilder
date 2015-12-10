json.venues @venues_availables do |venue|
  json.name venue.name
  json.id venue.id
  json.email venue.email
  json.address venue.address

  json.concerts venue.concerts do |concert|
    json.venue_id concert.venue_id
    json.band_id concert.band_id
    json.date concert.date
    json.time concert.time
  end
end