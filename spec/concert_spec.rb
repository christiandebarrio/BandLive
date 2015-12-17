require 'spec_helper'
require 'rails_helper'

describe "Concert" do
  before(:each) { @new_concert_1 = Concert.create(band_id: 1, 
                                                  venue_id: 1, 
                                                  date: Date.today, 
                                                  time: "22:00") }

  it "create concert" do
    expect(Concert.last).to eq(@new_concert_1)
  end

  it "returns time format hh:mm" do
    time = @new_concert_1.time_format

    expect(time).to eq("22:00")  
  end

  it "create 2 concerts same day with same band diferent venue" do
    new_concert_2 = Concert.create(band_id: 1, 
                                    venue_id: 2, 
                                    date: Date.today, 
                                    time: "23:00")

    expect(Concert.all.length).to eq(1)
  end

  it "create 2 concerts same day with same venue diferent band" do
    new_concert_2 = Concert.create(band_id: 2, 
                                    venue_id: 1, 
                                    date: Date.today, 
                                    time: "23:00")

    expect(Concert.all.length).to eq(1)
  end

  it "create 2 concerts same day with diferent band diferent venue" do
    new_concert_2 = Concert.create(band_id: 2, 
                                    venue_id: 2, 
                                    date: Date.today, 
                                    time: "23:00")

    expect(Concert.all.length).to eq(2)
  end

  it "date next concerts" do
    new_concert_2 = Concert.create(band_id: 2, 
                                    venue_id: 2, 
                                    date: "2015-12-20", 
                                    time: "23:00")
    expect(new_concert_2.date_next_concerts).to eq("Dec 20")
  end

  it "next concerts has to be 1 if there is 1 concert today" do
    expect(Concert.all.next_concerts.length).to eq(1)
  end

  it "next concerts has to be 2 if there are 2 concerts after today" do
    Concert.create(band_id: 2, 
                   venue_id: 2, 
                   date: Date.today + 1, 
                   time: "23:00")

    expect(Concert.all.next_concerts.length).to eq(2)
  end

  it "next concerts has to be 1 if there are 1 concerts after and 1 today" do
    Concert.create(band_id: 2, 
                   venue_id: 2, 
                   date: Date.today - 1, 
                   time: "23:00")

    expect(Concert.all.next_concerts.length).to eq(1)
  end
end