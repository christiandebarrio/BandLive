class CreateConcerts < ActiveRecord::Migration
  def change
    create_table :concerts do |t|
      t.references :band, index: true, foreign_key: true
      t.references :venue, index: true, foreign_key: true
      t.date :date
      t.time :time

      t.timestamps null: false
    end
  end
end
