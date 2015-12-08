class CreateParticipants < ActiveRecord::Migration
  def change
    create_table :participants do |t|
      t.string :name
      t.string :email
      t.string :instrument
      t.string :photo

      t.timestamps null: false
    end
  end
end
