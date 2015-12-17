class CalendarController < ApplicationController

  def band_concerts
    band = Band.find_by_id(params[:id])
    @band_concerts = band.concerts.sort_by &:date

    if @band_concerts
      render :band_concerts
    else
      render status: 404, json: {error: "Concerts not found"}
    end
  end

  def venues_availables
    date = params[:date]
    @venues_availables = Venue.availables(date)

    if @venues_availables
      render :venues_availables
    else
      render status: 404, json: {error: "No venues"}
    end
  end
end