class BandsController < ApplicationController

  def show
    @band = Band.find_by_id(params[:id])
  end

  def index
    @bands = Band.all
  end
end
