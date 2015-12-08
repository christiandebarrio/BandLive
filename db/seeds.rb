# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Participant.create(name: "Francis", 
                   email: "francisvitro@gmail.com", 
                   instrument: "drums")

Participant.create(name: "Eric", 
                   email: "eric@email.com", 
                   instrument: "guitar and vocals")

Band.create(name: "Topper Chopper", 
            gender: "rock", 
            band_type: "versions", 
            city: "Madrid", 
            language: "english and spanish")

francis = Participant.find_by_id(1)
eric = Participant.find_by_id(2)
topper_chopper = Band.find_by_id(1)

topper_chopper.participants << francis
topper_chopper.participants << eric