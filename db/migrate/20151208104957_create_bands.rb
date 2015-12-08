class CreateBands < ActiveRecord::Migration
  def change
    create_table :bands do |t|
      t.string :name
      t.string :gender
      t.string :band_type
      t.string :photo
      t.string :city
      t.string :language

      t.timestamps null: false
    end
  end
end
