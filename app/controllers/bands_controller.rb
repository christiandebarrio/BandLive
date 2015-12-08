class BandsController < ApplicationController

  def show
    @band = Band.find_by_id(params[:id])
  end
end
