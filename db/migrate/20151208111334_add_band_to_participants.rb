class AddBandToParticipants < ActiveRecord::Migration
  def change
    add_reference :participants, :band, index: true, foreign_key: true
  end
end
