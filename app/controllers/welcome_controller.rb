class WelcomeController < ApplicationController

  def index
    @concerts = Concert.next_concerts.order_by_date
  end
end
