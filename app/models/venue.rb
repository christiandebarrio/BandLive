class Venue < ActiveRecord::Base
  # has_many concerts

  def generate_photo_url name
    photo_file = name.downcase.strip.gsub(" ","-")
    photo_url = "venues/" + photo_file + ".jpg"
  end
end
