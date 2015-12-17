# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

description_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt dolor in velit molestie, at finibus risus fermentum. Quisque ultrices semper purus imperdiet viverra. In at est libero. Maecenas nisi justo, iaculis a convallis non, varius vitae enim. Vestibulum vitae leo sit amet metus sagittis gravida. Morbi nunc lacus, ornare vel metus in, lacinia mattis turpis. Praesent non tempor nisl, sed dignissim nunc."

Band.create(name: "Topper Chopper", 
            gender: "rock", 
            bandtype: "covers", 
            city: "Madrid", 
            language: "english & spanish",
            photo: "bands/topper-chopper.jpg",
            description: description_text)

Band.create(name: "Cardigan", 
            gender: "pop", 
            bandtype: "original", 
            city: "Cuenca", 
            language: "english",
            photo: "bands/cardigan.jpg",
            description: description_text)

Band.create(name: "Colors", 
            gender: "jazz", 
            bandtype: "covers", 
            city: "Madrid", 
            language: "english",
            photo: "bands/colors.jpg",
            description: description_text)

topper_chopper = Band.find_by_id(1)
cardigan = Band.find_by_id(2)
colors = Band.find_by_id(3)

Participant.create(name: "Francis", 
                   email: "francisvitro@gmail.com", 
                   instrument: "drums",
                   photo: "participants/francis.jpg")

Participant.create(name: "Eric", 
                   email: "eric@email.com", 
                   instrument: "guitar & vocals",
                   photo: "participants/eric.jpg")

Participant.create(name: "Julia", 
                   email: "julia@email.com", 
                   instrument: "guitar & vocals",
                   photo: "participants/julia.jpg")

topper_chopper.participants << Participant.find_by_name("Francis")
topper_chopper.participants << Participant.find_by_name("Eric")
cardigan.participants << Participant.find_by_name("Julia")

Venue.create(name: "Moby Dick",
             email: "mobydick@email.com",
             address: "Av. de Brasil, 5, 28020 Madrid",
             photo: "venues/moby-dick.jpg",
             description: description_text)

Venue.create(name: "Honky Tonk",
             email: "honkytonk@email.com",
             address: "Calle Covarrubias, 24, 28010 Madrid",
             photo: "venues/honky-tonk.jpg",
             description: description_text)

Venue.create(name: "El Chico Feo",
             email: "elchicofeo@email.com",
             address: "Calle Covarrubias, 21, 28010 Madrid",
             photo: "venues/el-chico-feo.jpg",
             description: description_text)

Venue.create(name: "Cafe Leka Leka",
             email: "lekaleka@email.com",
             address: "Calle Barbieri, 8, 28004 Madrid",
             photo: "venues/cafe-leka-leka.jpg",
             description: description_text)

Venue.create(name: "Cafe Populart",
             email: "cafepopulart@email.com",
             address: "Calle de Las Huertas, 22, 28014 Madrid",
             photo: "venues/cafe-populart.jpg",
             description: description_text)

Venue.create(name: "Soul Station",
             email: "soulstation@email.com",
             address: "Cuesta Santo Domingo, 22, 28013 Madrid",
             photo: "venues/soul-station.jpg",
             description: description_text)

Venue.create(name: "La Boca del Lobo",
             email: "labocalobo@email.com",
             address: "Calle de Argumosa, 11, 28012 Madrid",
             photo: "venues/la-boca-del-lobo.jpg",
             description: description_text)

Venue.create(name: "La Coquette",
             email: "lacoquette@email.com",
             address: "Calle de las Hileras, 14, 28013 Madrid",
             photo: "venues/la-coquette.jpg",
             description: description_text)

moby_dick = Venue.find_by_name("Moby Dick")
honky_tonk = Venue.find_by_name("Honky Tonk")
cafe_leka_leka = Venue.find_by_name("Cafe Leka Leka")
cafe_populart = Venue.find_by_name("Cafe Populart")
# soul_station = Venue.find_by_name("Soul Station")
# la_boca_del_lobo = Venue.find_by_name("La Boca del Lobo")
# la_coquette = Venue.find_by_name("La Coquette")
# el_chico_feo = Venue.find_by_name("El Chico Feo")

# Concert.create(band_id: topper_chopper.id,
#                venue_id: honky_tonk.id,
#                date: "6/12/2015",
#                time: "20:00")

# Concert.create(band_id: cardigan.id,
#                venue_id: moby_dick.id,
#                date: "15/12/2015",
#                time: "21:00")

# Concert.create(band_id: colors.id,
#                venue_id: honky_tonk.id,
#                date: "16/12/2015",
#                time: "20:00")

# Concert.create(band_id: cardigan.id,
#                venue_id: moby_dick.id,
#                date: "16/12/2015",
#                time: "22:00")

# Concert.create(band_id: colors.id,
#                venue_id: el_chico_feo.id,
#                date: "16/12/2015",
#                time: "22:00")

# Concert.create(band_id: topper_chopper.id,
#                venue_id: honky_tonk.id,
#                date: "20/12/2015",
#                time: "20:00")

# Concert.create(band_id: cardigan.id,
#                venue_id: honky_tonk.id,
#                date: "21/12/2015",
#                time: "23:00")

