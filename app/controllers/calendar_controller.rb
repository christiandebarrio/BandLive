class CalendarController < ApplicationController

  def band_concerts
    band = Band.find_by_id(params[:id])
    concerts = band.concerts
    if concerts
      render json: concerts
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
      respond_to do |format|
        # format.html { render partial: "partials/panels/panel_venue.html.erb" }
        format.json { render :venues_with_concerts }

        
      end
    else
      render status: 404, json: {error: "No venues"}
    end
  end
end