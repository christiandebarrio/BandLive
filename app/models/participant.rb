class Participant < ActiveRecord::Base
  belongs_to :band

  validates :name, :email, :instrument, presence: true

  def generate_photo_url name
    photo_file = name.downcase.strip.gsub(" ","-")
    photo_url = "participants/" + photo_file + ".jpg"
  end
end
