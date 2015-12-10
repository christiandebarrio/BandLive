class CalendarController < ApplicationController

  def concerts
    band = Band.find_by_id(params[:id])
    concerts = band.concerts
    if concerts
      render json: concerts
    else
      render status: 404, json: {error: "Concerts not found"}
    end
  end

  def venue
    venue = Venue.find_by_id(params[:id])
    if venue
      render json: venue
    else
      render status: 404, json: {error: "Venue not found"}
    end
  end
end