class Concert < ActiveRecord::Base
  belongs_to :band
  belongs_to :venue

  validates :band_id, :venue_id, :date, :time, presence: true

  def self.order_by_date
    order('date ASC')
  end
end
