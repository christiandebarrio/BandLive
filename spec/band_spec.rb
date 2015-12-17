require 'spec_helper'
require 'rails_helper'

describe "Band" do

  before(:each) { @new_band_1 = Band.create(name: "name 1", 
                                             gender: "gender", 
                                             bandtype: "bandtype", 
                                             photo: "bands/name-1.jpg", 
                                             description: "description",
                                             city: "city",
                                             language: "language") }

  it "generate_photo_url" do
    expect(@new_band_1.generate_photo_url(@new_band_1.name)).to eq("bands/name-1.jpg")
  end



  it "outstanding concerts has to be 1 if there is 1 concert today" do
    @new_band_1.concerts.create(venue_id: 1, 
                                date: Date.today, 
                                time: "23:00")

    expect(@new_band_1.list_outstanding_concerts.length).to eq(1)
  end

  it "outstanding concerts has to be 1 if there is 1 concert after today" do
    @new_band_1.concerts.create(venue_id: 1, 
                                date: Date.today + 1, 
                                time: "23:00")

    expect(@new_band_1.list_outstanding_concerts.length).to eq(1)
  end

  it "outstanding concerts has to be 0 if there is 1 concert before today" do
    @new_band_1.concerts.create(venue_id: 1, 
                                date: Date.today - 1, 
                                time: "23:00")

    expect(@new_band_1.list_outstanding_concerts.length).to eq(0)
  end

    # it "next concerts has to be 1 if there are 1 concerts after and 1 today" do
    #   Concert.create(band_id: 2, 
    #                  venue_id: 2, 
    #                  date: Date.today - 1, 
    #                  time: "23:00")

    #   expect(Concert.all.next_concerts.length).to eq(1)
    # end
end