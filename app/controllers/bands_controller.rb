class BandsController < ApplicationController

  def show
    @band = Band.find_by_id(params[:id])
    @concerts = @band.concerts.next_concerts.order_by_date
  end

  def index
    @bands = Band.all
  end

  def add_photo_url
    photo_url = generate_photo_url (name)
  end

  def profile
    @band = Band.find_by_id(params[:band_id])
  end
end