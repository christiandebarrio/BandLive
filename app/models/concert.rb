class Concert < ActiveRecord::Base
  belongs_to :band
  belongs_to :venue

  validates :band_id, :venue_id, :date, :time, presence: true
  validates :date, uniqueness: { scope: :band_id,
    message: "This band have a concert in this day yet" }
  validates :date, uniqueness: { scope: :venue_id,
    message: "This venue have a concert in this day yet" }

  def self.order_by_date
    order('date ASC')
  end
end
