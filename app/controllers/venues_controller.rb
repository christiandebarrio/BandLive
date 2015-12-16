class VenuesController < ApplicationController

  def show
    @venue = Venue.find_by_id(params[:id])

    # if params[:search].present?
    #   @locations = Location.near(params[:search], 50, :order => :distance)
    # else
    #   @locations = Location.all
    # end
  end

  def index
    @venues = Venue.all
  end
end
