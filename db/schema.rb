# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151216113203) do

  create_table "bands", force: :cascade do |t|
    t.string   "name"
    t.string   "gender"
    t.string   "bandtype"
    t.string   "photo"
    t.string   "city"
    t.string   "language"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "description"
  end

  create_table "concerts", force: :cascade do |t|
    t.integer  "band_id"
    t.integer  "venue_id"
    t.date     "date"
    t.time     "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "concerts", ["band_id"], name: "index_concerts_on_band_id"
  add_index "concerts", ["venue_id"], name: "index_concerts_on_venue_id"

  create_table "participants", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "instrument"
    t.string   "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "band_id"
  end

  add_index "participants", ["band_id"], name: "index_participants_on_band_id"

  create_table "venues", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "photo"
    t.float    "latitude"
    t.float    "longitude"
  end

end
