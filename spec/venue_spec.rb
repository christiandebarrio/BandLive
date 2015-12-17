require 'spec_helper'
require 'rails_helper'

describe "Venue" do
  before(:each) { @new_venue_1 = Venue.create(name: "name 1", 
                                              email: "email@email.com", 
                                              address: "Av. de Brasil, 5, 28020 Madrid", 
                                              photo: "venues/name-1.jpg", 
                                              description: "description") }

  it "create venue" do
    expect(Venue.last).to eq(@new_venue_1)
  end

  it "generate_photo_url" do
    expect(@new_venue_1.generate_photo_url(@new_venue_1.name)).to eq("venues/name-1.jpg")
  end

  it "available venue if date doesn't have a concert" do
    expect(Venue.availables("2015-12-20").size).to eq(1)
  end

  it "not available venue if date have a concert" do
    @new_venue_1.concerts.create(band_id: 1, 
                                 date: "2015-12-20", 
                                 time: "22:00")
    expect(Venue.availables("2015-12-20").size).to eq(0)
  end
end