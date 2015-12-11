json.venues @venues_availables do |venue|
  json.name venue.name
  json.id venue.id
  json.email venue.email
  json.address venue.address
  json.photo venue.photo
end