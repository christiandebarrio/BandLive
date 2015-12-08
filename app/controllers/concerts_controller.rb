class ConcertsController < ApplicationController

  def show
    @concert = Concert.find_by_id(params[:id])
    @band = Band.find_by_id(@concert.band_id)
    @venue = Venue.find_by_id(@concert.venue_id)
  end

  def index
    @concerts = Concert.all
  end
end
