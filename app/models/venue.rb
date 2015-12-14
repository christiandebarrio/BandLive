class Venue < ActiveRecord::Base
  has_many :concerts

  validates :name, :email, :address, presence: true

  def generate_photo_url name
    photo_file = name.downcase.strip.gsub(" ","-")
    photo_url = "venues/" + photo_file + ".jpg"
  end

  def self.availables date_to_check
    Venue.where("id NOT IN (SELECT DISTINCT(venue_id) FROM concerts WHERE date = ?)",date_to_check)
  end
end
