class Band < ActiveRecord::Base
  has_many :participants
  has_many :concerts

  def generate_photo_url name
    photo_file = name.downcase.strip.gsub(" ","-")
    photo_url = "bands/" + photo_file + ".jpg"
  end

  def list_outstanding_concerts
    concerts.where('date >= ?', Date.today).length
  end
end
