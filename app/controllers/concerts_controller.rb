class ConcertsController < ApplicationController

  def show
    @concert = Concert.find_by_id(params[:id])
    @band = Band.find_by_id(@concert.band_id)
    @venue = Venue.find_by_id(@concert.venue_id)
  end

  def index
    @concerts = Concert.all
  end

  def create
    new_concert = Concert.create concert_params
    if new_concert
      render json: new_concert
    end
  end

  private

  def concert_params
    params.require(:concert).permit(:band_id, :venue_id, :date, :time)
  end

end
