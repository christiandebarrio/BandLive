class Participant < ActiveRecord::Base
  belongs_to :band

  def generate_photo_url name
    photo_file = name.downcase.strip.gsub(" ","-")
    photo_url = "participants/" + photo_file + ".jpg"
  end
end
