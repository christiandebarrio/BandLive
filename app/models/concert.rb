class Concert < ActiveRecord::Base
  belongs_to :band
  belongs_to :venue

  def self.order_by_date
    order('date ASC')
  end
end
