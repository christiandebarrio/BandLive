class BandsController < ApplicationController

  def show
    @band = Band.find_by_id(params[:id])
  end

  def index
    @bands = Band.all
  end

  def add_photo_url
    photo_url = generate_photo_url (name)
  end
end
