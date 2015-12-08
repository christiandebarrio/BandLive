class WelcomeController < ApplicationController

  def index
    @concerts = Concert.all
  end
end
