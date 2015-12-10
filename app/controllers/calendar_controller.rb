class CalendarController < ApplicationController

  def band_concerts
    band = Band.find_by_id(params[:id])
    @band_concerts = band.concerts

    if @band_concerts
      render :band_concerts
    else
      render status: 404, json: {error: "Concerts not found"}
    end
  end

  def venues_availables
    venues = Venue.all
    date = params[:date]
    @venues_availables = []

    venues.each do |venue|
      if venue.concerts.find { |concert| concert[:date].strftime("%F") == date } == nil
        @venues_availables << venue
      end
    end

    if @venues_availables
      render :venues_with_concerts
    else
      render status: 404, json: {error: "No venues"}
    end
  end
end