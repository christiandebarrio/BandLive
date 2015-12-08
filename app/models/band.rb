class Band < ActiveRecord::Base
  has_many :participants

  def generate_photo_url name
    photo_file = name.downcase.strip.gsub(" ","-")
    photo_url = "bands/" + photo_file + ".jpg"
  end
end
