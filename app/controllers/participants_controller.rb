class ParticipantsController < ApplicationController

  def show
    @participant = Participant.find_by_id(params[:id])
    @band = Band.find_by_id(@participant.band_id)
  end

  private

  def participant_params
    params.require(:participant).permit(:name, :email, :instrument)
  end
end
